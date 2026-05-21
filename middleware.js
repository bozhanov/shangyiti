import { NextResponse } from "next/server";

export function middleware(request) {
  const auth = request.cookies.get("piano721-auth");

  if (
    !auth &&
    request.nextUrl.pathname !== "/enter"
  ) {
    return NextResponse.redirect(new URL("/enter", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
