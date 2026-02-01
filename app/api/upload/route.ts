import cloudinary from "@/app/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { image } = await req.json(); // base64 image

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "nextjs_uploads",
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Upload failed" },
      { status: 500 },
    );
  }
}
