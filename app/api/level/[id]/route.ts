// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const level = await prisma.level.findUnique({
//       where: {
//         id: params.id,
//       },
//       include: {
//         lessons: {
//           include: {
//             grammar: true,
//             vocabulary: true,
//           },
//           orderBy: {
//             number: 'asc',
//           },
//         },
//       },
//     });

//     if (!level) {
//       return NextResponse.json(
//         { error: "Level not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(level);
//   } catch (error) {
//     console.error("Error fetching level data:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
