import cloudinary from "@/app/cloudi/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { image } = await req.json();

  const result = await cloudinary.uploader.upload(image, {
    folder: "nextjs_uploads",
  });

  return NextResponse.json({
    success: true,
    url: result.secure_url,
  });
}
