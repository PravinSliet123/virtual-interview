import { currentUser } from "@clerk/nextjs/dis/server";
export const GET = async (req) => {
    const user = await currentUser();
    console.log('req: ', req);
    const interviewId = await req.nextUrl.searchParams.get("ID")
  
    try {  
      const interviews = await prisma.interviews.findUnique({
        where: {
          interviewId:interviewId
        },
      });
  
      return NextResponse.json({
        data: interviews,
        messsage: "Interviews fetched successfully",
      });
    } catch (error) {
      return NextResponse.json({ messsage: error }, { status: 500 });
    }
  };