import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");
  const apiKey = process.env.API_KEY_SUGGESTION;

  if (!text) return NextResponse.json({ suggestions: [] });

  const res = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${apiKey}`
  );

  const data = await res.json();
  return NextResponse.json(data);
}
