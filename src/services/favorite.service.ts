import { connectDB } from "@/lib/db/mongoose";
import Favorite from "@/models/Favorite";

export class FavoriteService {
  static async addFavorite(
    userId: string,
    recipeId: string
  ) {
    await connectDB();

    const exists =
      await Favorite.findOne({
        userId,
        recipeId,
      });

    if (exists) {
      return exists;
    }

    return Favorite.create({
      userId,
      recipeId,
    });
  }

  static async removeFavorite(
    userId: string,
    recipeId: string
  ) {
    await connectDB();

    return Favorite.deleteOne({
      userId,
      recipeId,
    });
  }

  static async getFavorites(
    userId: string
  ) {
    await connectDB();

    return Favorite.find({
      userId,
    }).populate("recipeId");
  }
}