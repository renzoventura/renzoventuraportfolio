import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest): NextResponse {
  const hostname = request.headers.get("host") ?? "";

  if (hostname.startsWith("photo.")) {
    const url = request.nextUrl.clone();
    const path = url.pathname === "/" ? "" : url.pathname;
    url.pathname = `/photo${path}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
