import { NextRequest, NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function GET(req: NextRequest) {

  try {
    const elon = await prisma.user.findUnique({
      where: {
        username: "elonmusk",
      },
      select: {
        id: true,
        name: true,
        username: true,
        profileImage: true,
        verified: true,
      }
    });
    const mat = await prisma.user.findUnique({
      where: {
        username: "matarmstrong",
      },
      select: {
        id: true,
        name: true,
        username: true,
        profileImage: true,
        verified: true,
      }
    });
    const theweeknd = await prisma.user.findUnique({
      where: {
        username: "theweeknd",
      },
      select: {
        id: true,
        name: true,
        username: true,
        profileImage: true,
        verified: true,
      }
    });

    return NextResponse.json([elon, mat, theweeknd], { status: 200 });
  } catch (err) {
    return NextResponse.json("Failed to fetch user data.", { status: 400 });
  }
}
