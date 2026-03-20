import { NextRequest, NextResponse } from "next/server";

const PHOTO_HOSTNAMES = new Set(["photo.renzoventura.com", "photo.localhost"]);

function isPhotoHost(host: string): boolean {
  return PHOTO_HOSTNAMES.has(host.split(":")[0]);
}

function isMainHost(host: string): boolean {
  const hostname = host.split(":")[0];
  return hostname === "localhost" || hostname === "www.renzoventura.com";
}

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname } = request.nextUrl;

  if (isPhotoHost(host)) {
    // Strip /photo prefix — redirect to clean URL
    if (pathname === "/photo" || pathname.startsWith("/photo/")) {
      const url = request.nextUrl.clone();
      url.pathname = pathname === "/photo" ? "/" : pathname.slice("/photo".length);
      return NextResponse.redirect(url);
    }
    // Rewrite clean URLs to internal /photo paths
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/photo" : "/photo" + pathname;
    return NextResponse.rewrite(url);
  }

  if (isMainHost(host) && (pathname === "/photo" || pathname.startsWith("/photo/"))) {
    const hostname = host.split(":")[0];
    const port = host.includes(":") ? ":" + host.split(":")[1] : "";
    const photoHost =
      hostname === "localhost" ? `photo.localhost${port}` : "photo.renzoventura.com";
    const cleanPath = pathname === "/photo" ? "/" : pathname.slice("/photo".length);
    return NextResponse.redirect(
      new URL(`${request.nextUrl.protocol}//${photoHost}${cleanPath}`)
    );
  }

  return NextResponse.next();
}

export const config = {
  // Skip static assets and files with extensions (images, fonts, etc.)
  matcher: ["/((?!_next/static|_next/image|api|.*\\.\\w+).*)"],
};
