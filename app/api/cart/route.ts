import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Cache cart structure to avoid repeated queries
const cartInclude = {
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
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ items: [] }); // Return empty cart instead of error
  }

  try {
    // Use findUnique with include instead of separate queries
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: cartInclude,
    });

    return NextResponse.json(cart || { items: [] });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ items: [] }); // Graceful fallback
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { productId, quantity = 1, selectedSize, selectedColor } = body;

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Single transaction for all operations
    const result = await prisma.$transaction(async (tx) => {
      // Find or create cart in one operation
      let cart = await tx.cart.findUnique({
        where: { userId: session.user.id },
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: { userId: session.user.id },
        });
      }

      // Validate product and check stock in one query
      const product = await tx.product.findUnique({
        where: { id: productId },
        select: {
          id: true,
          inStock: true,
          quantity: true,
          sizes: true,
          colors: true,
        },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      if (!product.inStock || product.quantity < quantity) {
        throw new Error("Product not available");
      }

      // Validate size and color
      if (selectedSize && !product.sizes.includes(selectedSize)) {
        throw new Error("Invalid size selected");
      }
      if (selectedColor && !product.colors.includes(selectedColor)) {
        throw new Error("Invalid color selected");
      }

      // Upsert cart item (create or update)
      const existingItem = await tx.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId,
          selectedSize: selectedSize || null,
          selectedColor: selectedColor || null,
        },
      });

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.quantity) {
          throw new Error("Not enough stock available");
        }
        
        await tx.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: newQuantity },
        });
      } else {
        await tx.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity,
            selectedSize: selectedSize || null,
            selectedColor: selectedColor || null,
          },
        });
      }

      // Return updated cart
      return tx.cart.findUnique({
        where: { userId: session.user.id },
        include: cartInclude,
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error adding to cart:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ 
      error: "Failed to add to cart",
      details: errorMessage
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

    const result = await prisma.$transaction(async (tx) => {
      // Get cart item with product info in one query
      const cartItem = await tx.cartItem.findFirst({
        where: {
          id: cartItemId,
          cart: { userId: session.user.id }
        },
        include: {
          product: {
            select: {
              quantity: true,
              inStock: true,
            },
          },
        },
      });

      if (!cartItem) {
        throw new Error("Cart item not found");
      }

      if (!cartItem.product.inStock || cartItem.product.quantity < quantity) {
        throw new Error("Product not available");
      }

      await tx.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
      });

      return tx.cart.findUnique({
        where: { userId: session.user.id },
        include: cartInclude,
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating cart:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { cartItemId } = await request.json();

    const result = await prisma.$transaction(async (tx) => {
      // Verify ownership and delete in one operation
      const cart = await tx.cart.findUnique({
        where: { userId: session.user.id },
        select: { id: true },
      });

      if (!cart) {
        throw new Error("Cart not found");
      }

      await tx.cartItem.deleteMany({
        where: {
          id: cartItemId,
          cartId: cart.id,
        },
      });

      return tx.cart.findUnique({
        where: { userId: session.user.id },
        include: cartInclude,
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error removing from cart:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}