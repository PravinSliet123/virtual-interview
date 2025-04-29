import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { interviewId } = params;
  console.log('interviewId: ', interviewId);

  try {
    const interviews = await prisma.interviews.findFirst({
        where: {
            interviewId: interviewId,
        },
    });
    console.log('interviews: ', interviews);

    return NextResponse.json({
      data: interviews,
      messsage: "Interviews fetched successfully",
    });
  } catch (error) {
    console.log('error: ', error);
    return NextResponse.json({ messsage: error }, { status: 500 });
  }
};
