import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Reusable user selection
const userSelect = {
  id: true,
  name: true,
  email: true,
  image: true,
  phone: true,
  createdAt: true,
};

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: userSelect,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      user 
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();
    const { name, email, phone, password } = data;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    // Use transaction for atomic operations
    const updatedUser = await prisma.$transaction(async (tx) => {
      // Check email uniqueness only if email is changing
      if (trimmedEmail !== session.user.email) {
        const existingUser = await tx.user.findUnique({
          where: { email: trimmedEmail },
          select: { id: true },
        });
        
        if (existingUser && existingUser.id !== session.user.id) {
          throw new Error("Email already in use");
        }
      }

      // Prepare update data
      const updateData: any = { 
        name: trimmedName,
        email: trimmedEmail,
        phone: phone?.trim() || null,
        updatedAt: new Date(),
      };

      // Only hash password if provided and valid
      if (password && password.trim() !== "") {
        const trimmedPassword = password.trim();
        if (trimmedPassword.length < 6) {
          throw new Error("Password must be at least 6 characters");
        }
        updateData.password = await bcrypt.hash(trimmedPassword, 12);
      }

      // Perform update
      return tx.user.update({
        where: { id: session.user.id },
        data: updateData,
        select: userSelect,
      });
    });

    return NextResponse.json({ 
      success: true, 
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating user:", error);
    
    if (error instanceof Error) {
      if (error.message === "Email already in use") {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      if (error.message.includes("Password")) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }
    
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}
