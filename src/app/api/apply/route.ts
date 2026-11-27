export function POST() {
  return Response.json(
    { error: "Applications are closed. See the careers page for role status." },
    { status: 410 },
  );
}
