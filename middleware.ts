import {NextRequest, NextResponse} from "next/server";
import {
  DEFAULT_MODE,
  MODE_COOKIE,
  MODE_COOKIE_MAX_AGE,
  isMode,
  isModePath,
} from "./app/lib/mode";

/**
 * Both modes serve the same public URLs (/, /browse, /search, /saved, /[id]).
 * Each request is rewritten to the internal /reel/... or /simple/... route for
 * the visitor's mode, so both stay statically cacheable.
 *
 * Visiting /reel/... or /simple/... directly (the mode toggle links) stores
 * that choice in a cookie and redirects to the clean URL.
 */
export function middleware(request: NextRequest) {
  const {pathname, search} = request.nextUrl;
  const [, first, ...rest] = pathname.split("/");

  if (isMode(first)) {
    const target = `/${rest.join("/")}`;
    const url = request.nextUrl.clone();
    url.pathname = isModePath(target) ? target : "/";
    url.search = search;
    const response = NextResponse.redirect(url);
    response.cookies.set(MODE_COOKIE, first, {
      path: "/",
      maxAge: MODE_COOKIE_MAX_AGE,
      sameSite: "lax",
    });
    return response;
  }

  if (!isModePath(pathname)) return NextResponse.next();

  const cookie = request.cookies.get(MODE_COOKIE)?.value;
  const mode = isMode(cookie) ? cookie : DEFAULT_MODE;
  const url = request.nextUrl.clone();
  url.pathname = `/${mode}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/|api/|.*\\.[a-z0-9]+$).*)"],
};
