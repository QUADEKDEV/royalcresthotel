import "server-only";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import UserModel from "@/models/user";
import { cookies } from "next/headers";
import { dbConnect } from "./dbConnect";



const encodedkey = new TextEncoder().encode(process.env.JWT_SECRET);


export const encrypt = (payload: { _id: string }) => {
  const token = new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2d")
    .sign(encodedkey);
  return token;
};


interface MyPayload extends JWTPayload {
  _id?: string;
}
export const decrypt = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, encodedkey, {
      algorithms: ["HS256"],
    });
    return { ...(payload as MyPayload), success: true };
  } catch (error) {
    return { success: false };
  }
};


export const auth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return {
      sucess: false,
    };
  }
  const { _id, success } = await decrypt(token);
  if (!success) {
    return { success: false };
  }
  return { _id, success: true };
};

export const verifyUser = async () => {
  const { success, _id } = await auth();
  await dbConnect();
  const user = await UserModel.findById(_id);
  if (!user) {
    return {
      success: false,
    };
  }
  return { success: true, user };
};
