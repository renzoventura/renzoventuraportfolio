import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/_mw-debug") {
    return NextResponse.json({
      host: request.headers.get("host"),
      xForwardedHost: request.headers.get("x-forwarded-host"),
      nextUrlHostname: request.nextUrl.hostname,
      nextUrlHref: request.nextUrl.href,
    });
  }

  const hostname =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    request.nextUrl.hostname;

  if (hostname === "photo.renzoventura.com") {
    const pathname = request.nextUrl.pathname;
    if (!pathname.startsWith("/photo")) {
      const url = request.nextUrl.clone();
      url.pathname = `/photo${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
