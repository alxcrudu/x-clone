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



// import { NextRequest, NextResponse } from "next/server";
// import { useSWRInfinite } from "swr";
// import prisma from "@/libs/prismadb";

// export const revalidate = 0;

// export async function GET(req: NextRequest, res: NextResponse) {
//   try {
//     const PAGE_SIZE = 10; // Number of tweets per page

//     // Define a fetcher function to fetch the tweets for a specific page
//     const fetcher = async (pageIndex: number) => {
//       const tweets = await prisma.post.findMany({
//         include: {
//           user: true,
//           comments: true,
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//         skip: pageIndex * PAGE_SIZE, // Skip the tweets from previous pages
//         take: PAGE_SIZE, // Fetch only the tweets for the current page
//       });

//       return tweets;
//     };

//     // Use useSWRInfinite to handle pagination
//     const { data, error, size, setSize } = useSWRInfinite(
//       (pageIndex, previousPageData) => {
//         // If there is no previous page data, it means we have reached the end
//         if (previousPageData && previousPageData.length === 0) return null;

//         // If it's the first page, fetch it directly
//         if (pageIndex === 0) return ["/api/tweets", PAGE_SIZE];

//         // For subsequent pages, pass the pageIndex and previousPageData to the fetcher
//         return ["/api/tweets", pageIndex];
//       },
//       fetcher
//     );

//     // Check for errors
//     if (error) {
//       return NextResponse.json(error, { status: 500 });
//     }

//     // Check if the data is still loading
//     if (!data) {
//       return NextResponse.json({ message: "Loading..." }, { status: 200 });
//     }

//     // Flatten the data from all pages into a single array
//     const tweets = data.flat();

//     return NextResponse.json(tweets, { status: 200 });
//   } catch (err) {
//     return NextResponse.json(err, { status: 500 });
//   }
// }
