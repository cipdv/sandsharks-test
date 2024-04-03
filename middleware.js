import { NextResponse } from "next/server";
import { getSession, updateSession, decrypt } from "@/app/(lib)/auth";
// import { decrypt } from "./lib";

export async function middleware(request) {
  console.log("middleware ran successfully");

  const currentUser = request.cookies.get("session")?.value;

  console.log("current", currentUser);

  let currentUserObj = null;
  if (currentUser) {
    currentUserObj = await decrypt(currentUser);
  }

  const memberType = currentUserObj?.resultObj?.memberType;
  //   // let memberType = currentUserObj?.resultObj?.memberType

  if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    currentUser &&
    memberType === "ultrashark" &&
    !request.nextUrl.pathname.startsWith("/dashboard/ultrashark")
  ) {
    return NextResponse.redirect(new URL("/dashboard/ultrashark", request.url));
  }

  if (
    currentUser &&
    memberType === "member" &&
    !request.nextUrl.pathname.startsWith("/dashboard/member")
  ) {
    return NextResponse.redirect(new URL("/dashboard/member", request.url));
  }

  if (
    currentUser &&
    memberType === "pending" &&
    !request.nextUrl.pathname.startsWith("/dashboard/member")
  ) {
    return NextResponse.redirect(new URL("/dashboard/member", request.url));
  }

  //   if (
  //     !currentUser &&
  //     request.nextUrl.pathname !== "/" &&
  //     !request.nextUrl.pathname.startsWith("/signin") &&
  //     !request.nextUrl.pathname.startsWith("/signup") &&
  //     !request.nextUrl.pathname.startsWith("/api/signin") // Allow the sign-in API route
  //   ) {
  //     return NextResponse.redirect(new URL("/signin", request.url));
  //   }

  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
