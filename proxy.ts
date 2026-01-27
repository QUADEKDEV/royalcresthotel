import { NextRequest,ProxyConfig,NextResponse } from "next/server";
import { auth } from "./app/utils/session";

// const publicRoutes=["/","/signin","/signup","/about","/ts","/users"]
export default async function proxy (req:NextRequest){
  // const path =req.nextUrl.pathname
  // const isPublicRoute=publicRoutes.includes(path);
  // if(isPublicRoute){
  //   return NextResponse.next();
  // }
    const {success}=await auth();
    if(!success){
        return NextResponse.redirect( new URL("/signin",req.nextUrl))
    }
    return NextResponse.next()
}
export const config: ProxyConfig = {
  matcher:["/admin"]
  // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"]
};