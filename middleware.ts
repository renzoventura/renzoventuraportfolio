import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse {
  const hostname = request.headers.get("host") ?? "";

  if (hostname.startsWith("photo.")) {
    const url = request.nextUrl.clone();
    // Skip paths already starting with /photo to avoid double-rewriting
    if (!url.pathname.startsWith("/photo")) {
      url.pathname = `/photo${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
