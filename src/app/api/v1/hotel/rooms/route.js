import { NextRequest, NextResponse } from "next/server";
import { generatePrismaClient } from '@/app/lib/utils'

export async function GET(request) {
    try {

        const prisma = generatePrismaClient()

        const roomsRecords = await prisma.rooms.findMany({
            include: {
                roomtypes: {
                    select: {
                        desc: true
                    }
                }
            }
        })

        const response = roomsRecords

        prisma.$disconnect()

        return new NextResponse(JSON.stringify({ response, status: 200 }));
    } catch (error) {
        console.error("Database query failed:", error);
        return new NextResponse(JSON.stringify({ status: 500, message: "Internal Server Error" }), { status: 500 });
    }
}

// export async function PUT(request) {

//     try {
//         const { data } = await request.json();
//         //console.log(data.Label)
//         const newRecord = await prisma.rooms.create({
//             data: {
//                 label: data.Label,
//                 roomType: parseInt(data.RoomType),
//                 description: data.Description,
//             }
//         });

//         return new NextResponse(JSON.stringify({ newRecord, status: 200 }));

//     } catch (error) {
//         return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
//     } finally {
//         await prisma.$disconnect();
//     }
// }
