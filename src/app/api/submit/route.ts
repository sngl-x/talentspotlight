import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { invitationId, questionId, responseValue, q24 = [], q25 = [] } = await req.json();

    if (!invitationId) {
      return NextResponse.json(
        { success: false, message: "Missing invitation ID" },
        { status: 400 }
      );
    }

    if (questionId && typeof responseValue !== "undefined") {
      console.log(
        `Saving single-choice response: Invitation ID=${invitationId}, Question ID=${questionId}, Value=${responseValue}`
      );
      return NextResponse.json({ success: true });
    }

    if (q24.length > 0) {
      console.log(
        `Saving multi-choice response for q24: Invitation ID=${invitationId}, Selected Options=${q24}`
      );
      return NextResponse.json({ success: true });
    }

    if (q25.length > 0) {
      console.log(
        `Saving multi-choice response for q25: Invitation ID=${invitationId}, Selected Options=${q25}`
      );
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "No valid response data provided" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in submit endpoint:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
