import { connectDB } from "@/lib/db/mongoose";
import User from "@/models/User";

export class UserService {
  static async findByEmail(email: string) {
    await connectDB();

    return User.findOne({ email });
  }

  static async create(data: {
    name: string;
    email: string;
    password: string;
  }) {
    await connectDB();

    return User.create(data);
  }

  static async findById(id: string) {
    await connectDB();

    return User.findById(id);
  }
}