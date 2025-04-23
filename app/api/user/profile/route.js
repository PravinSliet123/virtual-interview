import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const saltRounds = 10;
export const GET = async (req) => {
  const user = await currentUser();
  try {
    const email = user.primaryEmailAddress.emailAddress;

    const isExist = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log("isExist: ", isExist);
    if (isExist) {
      return Response.json(
        {
          message: "user already exist",
          data: isExist?.email,
          success: true,
        },
        { status: 200 }
      );
    } else {
      return Response.json({ data: null });
    }
  } catch (error) {
    return Response.json({ message: error.message }, { status: 403 });
  }
};
