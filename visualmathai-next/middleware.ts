import {
  NextRequest,
  NextResponse,
} from "next/server";

const ROLE_ROUTES = {
  "/dashboard": "MAHASISWA",
  "/dosen": "DOSEN",
  "/admin": "ADMIN",
} as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session =
    request.cookies.get("visualmath_session")?.value;

  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/dosen") ||
    pathname.startsWith("/admin")
  ) {
    if (!session) {
      return NextResponse.redirect(
        new URL("/login", request.url),
      );
    }
  }

  for (const [prefix, requiredRole] of Object.entries(
    ROLE_ROUTES,
  )) {
    if (pathname.startsWith(prefix)) {
      const role =
        request.cookies.get("visualmath_role")?.value;

      if (role !== requiredRole) {
        return NextResponse.redirect(
          new URL("/login", request.url),
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dosen/:path*",
    "/admin/:path*",
  ],
};