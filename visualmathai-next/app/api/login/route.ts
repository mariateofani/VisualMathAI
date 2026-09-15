import { NextResponse } from "next/server";
import { LoginSchema } from "@/schemas/authSchema";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = LoginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Email dan password tidak valid.",
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Demo authentication
    if (
      email !== "mahasiswa@visualmath.ai" ||
      password !== "12345678"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Email atau password salah.",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Login berhasil.",
    });

    response.cookies.set("visualmath_session", "authenticated", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server.",
      },
      { status: 500 }
    );
  }
}