
/**
 * TAARA Round 3
 * Demo seeding is disabled in production.
 */

export async function POST() {
  return Response.json(
    { error: "Demo seeding is disabled" },
    { status: 403 }
  );
}
