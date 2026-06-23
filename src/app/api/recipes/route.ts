import { NextResponse } from "next/server";
import { RecipeService } from "@/services/recipe.service";

export async function GET() {
  const products = await RecipeService.getAll();
  return NextResponse.json(products);
}