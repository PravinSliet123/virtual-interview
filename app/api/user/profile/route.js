import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const GET = async (req) => {
  const user = await currentUser();
  try {
    const email = user.primaryEmailAddress.emailAddress;
    let dbUser = await prisma.user.findUnique({
      where: { email },
    });
    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email,
          // other fields will use defaults
        },
      });
    }
    return Response.json({
      message: "User found or created",
      data: dbUser,
      success: true,
    }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error.message }, { status: 403 });
  }
};
