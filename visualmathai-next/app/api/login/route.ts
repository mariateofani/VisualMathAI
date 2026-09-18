import { NextRequest, NextResponse } from "next/server";
import {
  LoginSchema,
} from "@/schemas/authSchema";

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    const validation = LoginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message:
            "Data login tidak valid.",
          errors: validation.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const {
      email,
      password,
      role,
    } = validation.data;

    if (
      email !== "mahasiswa@visualmath.ai" &&
      email !== "dosen@visualmath.ai" &&
      email !== "admin@visualmath.ai"
    ) {
      return NextResponse.json(
        {
          message:
            "Email demo tidak terdaftar.",
        },
        {
          status: 401,
        },
      );
    }

    if (password !== "12345678") {
      return NextResponse.json(
        {
          message:
            "Password demo tidak valid.",
        },
        {
          status: 401,
        },
      );
    }

    const response = NextResponse.json({
      message: "Login berhasil.",
      role,
    });

    response.cookies.set(
      "visualmath_session",
      "authenticated",
      {
        httpOnly: true,
        sameSite: "lax",
        secure:
          process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
      },
    );

    response.cookies.set(
      "visualmath_role",
      role,
      {
        httpOnly: true,
        sameSite: "lax",
        secure:
          process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
      },
    );

    return response;
  } catch {
    return NextResponse.json(
      {
        message: "Request tidak valid.",
      },
      {
        status: 400,
      },
    );
  }
}