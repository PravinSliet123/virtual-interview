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
        email: user.primaryEmailAddress.emailAddress 
      },
    });
    
    //console.log('loggedInUser: ', loggedInUser);
    
    const interviews = await prisma.interviews.create({
      data: { ...payload, userId: loggedInUser.id },
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
