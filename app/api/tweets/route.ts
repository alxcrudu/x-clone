import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function GET(req: NextRequest, res: NextResponse) {
  const params = req.nextUrl.searchParams
  const page = params.get("page")
  const limit = params.get("limit")

  if(!page || !limit) {
    return NextResponse.json({ message: "Invalid query parameters" }, { status: 400 });
  }

  try {
    const tweets = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: parseInt(page) * parseInt(limit),
      take: parseInt(limit),
    });

    return NextResponse.json(tweets, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
