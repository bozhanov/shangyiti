// src/app/api/download/route.js

import { NextResponse } from "next/server";

export async function GET(request) {

  try {

    const { searchParams } = new URL(request.url);

    const file = searchParams.get("file");

    if (!file) {

      return new NextResponse("Missing file", {
        status: 400,
      });

    }

    // URL encode 文件名
    const pdfUrl =
      `https://pub-0b28e1264b2449f69eef1adcf2260bc7.r2.dev/${encodeURIComponent(file)}`;

    const response = await fetch(pdfUrl);

    if (!response.ok) {

      return new NextResponse(
        `Failed to fetch file: ${response.status}`,
        {
          status: response.status,
        }
      );

    }

    // 读取完整文件（微信更容易识别下载进度）
    const data = await response.arrayBuffer();

    return new NextResponse(data, {

      headers: {

        "Content-Type": "application/pdf",

        "Content-Disposition":
          `attachment; filename="${file}"`,

        "Content-Length":
          data.byteLength.toString(),

        "Cache-Control":
          "public, max-age=3600",

      },

    });

  } catch (err) {

    console.error("Download error:", err);

    return new NextResponse(
      "Server error fetching file",
      {
        status: 500,
      }
    );

  }

}
