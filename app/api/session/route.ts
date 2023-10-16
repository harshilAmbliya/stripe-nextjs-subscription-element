import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession(authOptions);
  return NextResponse.json(session, { status: 200 });
};
