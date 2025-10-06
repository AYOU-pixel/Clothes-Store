import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                mainImage: true,
                currentPrice: true,
                originalPrice: true,
                sizes: true,
                colors: true,
                quantity: true,
                inStock: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(cart || { items: [] });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  // Debug logging
  console.log("=== Cart POST Debug ===");
  console.log("Session exists:", !!session);
  console.log("Session user:", session?.user);
  console.log("User ID:", session?.user?.id);
  console.log("=====================");
  
  if (!session?.user?.id) {
    return NextResponse.json({ 
      error: "Unauthorized",
      debug: {
        hasSession: !!session,
        hasUser: !!session?.user,
        hasUserId: !!session?.user?.id
      }
    }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { productId, quantity = 1, selectedSize, selectedColor } = body;

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Find or create a cart for the user
    let cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: session.user.id },
      });
    }

    // Validate product exists and is in stock
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (!product.inStock || product.quantity < quantity) {
      return NextResponse.json({ error: "Product not available" }, { status: 400 });
    }

    // Validate size and color
    if (selectedSize && !product.sizes.includes(selectedSize)) {
      return NextResponse.json({ error: "Invalid size selected" }, { status: 400 });
    }
    if (selectedColor && !product.colors.includes(selectedColor)) {
      return NextResponse.json({ error: "Invalid color selected" }, { status: 400 });
    }

    // Check if the item already exists in the cart
    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        selectedSize: selectedSize || null,
        selectedColor: selectedColor || null,
      },
    });

    if (existingItem) {
      // Update quantity if item exists
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.quantity) {
        return NextResponse.json({ error: "Not enough stock available" }, { status: 400 });
      }
      
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      // Add new item to cart
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
          selectedSize: selectedSize || null,
          selectedColor: selectedColor || null,
        },
      });
    }

    // Fetch updated cart
    const updatedCart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                mainImage: true,
                currentPrice: true,
                originalPrice: true,
                sizes: true,
                colors: true,
                quantity: true,
                inStock: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json({ 
      error: "Failed to add to cart",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { cartItemId, quantity } = await request.json();

    const cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { items: { where: { id: cartItemId } } },
    });

    if (!cart || !cart.items.length) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    const product = await prisma.product.findUnique({
      where: { id: cart.items[0].productId },
    });

    if (!product || !product.inStock || product.quantity < quantity) {
      return NextResponse.json({ error: "Product not available" }, { status: 400 });
    }

    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    const updatedCart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                mainImage: true,
                currentPrice: true,
                originalPrice: true,
                sizes: true,
                colors: true,
                quantity: true,
                inStock: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { cartItemId } = await request.json();

    const cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { items: { where: { id: cartItemId } } },
    });

    if (!cart || !cart.items.length) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    const updatedCart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                mainImage: true,
                currentPrice: true,
                originalPrice: true,
                sizes: true,
                colors: true,
                quantity: true,
                inStock: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(updatedCart);
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 });
  }
}