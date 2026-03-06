import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const headersList = await headers();
  const result: Record<string, string> = {};
  headersList.forEach((value, key) => {
    result[key] = value;
  });
  return NextResponse.json(result);
}
