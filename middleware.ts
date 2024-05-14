import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs';
import { type NextRequest } from "next/server";
import {NextResponse} from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({req, res})
  const {data: {user}} = await supabase.auth.getUser();

  // If the user is not logged in and tries to access the /profile route
  if (!user && req.nextUrl.pathname === '/profile') {
    // Redirect to the login page or any other desired route
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If the user is logged in and tries to access the login page
  if (user && req.nextUrl.pathname === '/login') {
    // Redirect to the profile page or any other desired route
    const profileUrl = new URL('/profile', req.url);
    return NextResponse.redirect(profileUrl);
  }

  // If the user is not logged in and not accessing protected routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    '/profile', 
    '/login'
  ],
};


// future middleware example.

/*
export async function middleware(req: NextRequest) {
  // Get the user from the request
  const user = await getUserFromRequest(req);

  // Get the URL pathname
  const url = getURL(req);

  // If the user is not logged in and tries to access the /profile route
  if (!user && url.pathname === '/profile') {
    // Redirect to the login page or any other desired route
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // If the user is logged in and tries to access the login page
  if (user && url.pathname === '/login') {
    // Redirect to the profile page or any other desired route
    const profileUrl = new URL('/profile', req.url);
    return NextResponse.redirect(profileUrl);
  }

  // If the user is logged in and not accessing protected routes
  if (user) {
    // Attach the user to the request object
    const requestWithUser = req.clone();
    requestWithUser.user = user;
    return NextResponse.next(requestWithUser);
  }

  // If the user is not logged in and not accessing protected routes
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/login'],
};
*/