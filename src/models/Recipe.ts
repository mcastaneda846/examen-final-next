import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    name: String,
    imageUrl: String,
    prepTime: Number,
    difficulty: String,
    ingredients: [String],
    steps: [String],
    servings: Number,
  },
  { timestamps: true },
);

export default mongoose.models.Recipe || mongoose.model("Recipe", RecipeSchema);
