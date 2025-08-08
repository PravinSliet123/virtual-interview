import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const user = await currentUser();

  try {
    const loggedInUser = await prisma.user.findUnique({
      where: {
        email: user.primaryEmailAddress.emailAddress,
      },
    });

    const interviews = await prisma.interviews.findMany({
      where: {
        userId: loggedInUser.id,
      },
    });

    return NextResponse.json({
      data: interviews,
      messsage: "Interviews fetched successfully",
    });
  } catch (error) {
    //console.log('error: ', error);
    return NextResponse.json({ messsage: error }, { status: 500 });
  }
};
export const POST = async (req) => {
  try {
    const user = await currentUser();
    const payload = await req.json();
    const loggedInUser = await prisma.user.findUnique({
      where: {
        email: user.primaryEmailAddress.emailAddress,
      },
    });

    if (loggedInUser.credits === 0) {
      return NextResponse.json(
        { message: "Insufficient credits" },
        { status: 400 }
      );
    }
    //console.log('loggedInUser: ', loggedInUser);

    const interview = await prisma.$transaction(async (tx) => {
      // Step 1: Decrement user's credit
      const updatedUser = await tx.user.update({
        where: { id: loggedInUser.id },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });

      // Optional: Check if user had enough credits
      if (updatedUser.credits < 0) {
        throw new Error(
          "Insufficient credits please buy more credits to continue"
        );
      }

      // Step 2: Create the interview
      const createdInterview = await tx.interviews.create({
        data: {
          ...payload,
          userId: loggedInUser.id,
        },
      });

      return createdInterview;
    });

    console.log("interview: ", interview);
    return NextResponse.json({
      data: interview,
      message: "Interviews fetched successfully",
    });
  } catch (error) {
    //console.log('error: ', error);

    return NextResponse.json({ message: error }, { status: 500 });
  }
};
