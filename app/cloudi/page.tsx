"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: reader.result }),
      });

      const data = await res.json();
      setImageUrl(data.url);
    };
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
//wana check something
      <button onClick={uploadImage}>Upload</button>
      <button onClick={()=>alert(imageUrl)} ></button>

      {imageUrl && <img src={imageUrl} alt="Uploaded" width={300} />}
    </div>
  );
}
