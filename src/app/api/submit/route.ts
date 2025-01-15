const { invitationId, questionId, responseValue, q24 = [], q25 = [] } = await req.json();

if (!invitationId) {
  return NextResponse.json(
    { success: false, message: "Missing invitation ID" },
    { status: 400 }
  );
}

if (questionId && typeof responseValue === 'undefined') {
  return NextResponse.json(
    { success: false, message: "Missing question ID or response value" },
    { status: 400 }
  );
}
