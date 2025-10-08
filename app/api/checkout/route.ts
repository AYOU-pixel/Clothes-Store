import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function POST() {
  let session = null;
  try {
    // Verify Stripe configuration
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not set in environment variables");
      return NextResponse.json({ error: "Server configuration error: Missing Stripe key" }, { status: 500 });
    }

    // Validate NEXT_PUBLIC_URL
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    const url = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;
    if (!url.match(/^https?:\/\//)) {
      console.error(`Invalid NEXT_PUBLIC_URL: ${baseUrl}`);
      return NextResponse.json({ error: "Server configuration error: Invalid URL format" }, { status: 500 });
    }

    // Check user session
    session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      console.error("No user session found");
      return NextResponse.json({ error: "Please sign in to proceed with checkout" }, { status: 401 });
    }

    // Fetch the user's cart with items and associated products
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                currentPrice: true,
                quantity: true,
                inStock: true,
                mainImage: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      console.error(`Cart not found for user ID: ${session.user.id}`);
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    if (cart.items.length === 0) {
      console.error("Cart is empty for user ID:", session.user.id);
      return NextResponse.json({ error: "Your shopping bag is empty" }, { status: 400 });
    }

    // Validate stock for all items
    for (const item of cart.items) {
      if (!item.product.inStock || item.quantity > item.product.quantity) {
        console.error(`Stock issue for product: ${item.product.name}, requested: ${item.quantity}, available: ${item.product.quantity}`);
        return NextResponse.json(
          { error: `Product ${item.product.name} is out of stock or insufficient quantity` },
          { status: 400 }
        );
      }
    }

    // Calculate subtotal and shipping
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.product.currentPrice * item.quantity,
      0
    );
    const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100

    // Create line items for Stripe Checkout
    const lineItems = cart.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          images: [`https://res.cloudinary.com/dpj5r6jrg/image/upload/${item.product.mainImage}.jpg`],
        },
        unit_amount: Math.round(item.product.currentPrice * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item if applicable
    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping",
            images: [], // Required by Stripe's type definition
          },
          unit_amount: Math.round(shipping * 100), // Convert to cents
        },
        quantity: 1,
      });
    }

    // Create Stripe Checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${url}/cart?success=true`,
      cancel_url: `${url}/cart?canceled=true`,
      metadata: {
        userId: session.user.id,
        cartId: cart.id,
      },
    });

    return NextResponse.json({ url: checkoutSession.url }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating checkout session:", {
      message: error.message,
      stack: error.stack,
      userId: session?.user?.id || "unknown",
    });
    return NextResponse.json(
      { error: `Checkout failed: ${error.message || "Internal server error"}` },
      { status: 500 }
    );
  }
}