import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

// 1. Especificar rutas protegidas y publicas
const protectedRoutes = new Set([
  "/dashboard",
  "/dashboard/clients",
  "/dashboard/services",
  "/dashboard/products",
  "/dashboard/products/create",
  "/dashboard/products/edit",
  "/dashboard/products/list",
  "/dashboard/products/detail",

]);
const publicRoutes = new Set(["/auth/sign-in"]);

export default async function middleware(req: NextRequest) {
  // 2. verificar si la ruta actual es protegida o publica
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.has(path);
  const isPublicRoute = publicRoutes.has(path);

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.nextUrl));
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
