
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  return NextResponse.json(
    { message: "custom message" },
    { status: 200, statusText: "Success" }
  );
};
