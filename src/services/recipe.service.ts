import { connectDB } from "@/lib/db/mongoose";
import Recipe from "@/models/Recipe";

export class RecipeService {
  static async getAll() {
    await connectDB();

    return Recipe.find().sort({
      createdAt: -1,
    });
  }

  static async getById(id: string) {
    await connectDB();

    return Recipe.findById(id);
  }

  static async create(data: any) {
    await connectDB();

    return Recipe.create(data);
  }
}