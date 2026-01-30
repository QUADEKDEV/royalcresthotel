import { NextRequest,ProxyConfig,NextResponse } from "next/server";
import { auth } from "./app/utils/session";

export default async function proxy(req: NextRequest) {

  const { success } = await auth();
  if (!success) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
  return NextResponse.next();
}
export const config: ProxyConfig = {
  matcher: ["/admindashboard","/userdashboard"],

};

