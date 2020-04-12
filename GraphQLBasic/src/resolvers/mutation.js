import User from "../models/user";
import bcrypt from "bcryptjs";

const Mutation = {
  signup: async (parent, args, context, info) => {
    // Trim and toLowerCase email
    const email = args.email.trim().toLowerCase();
    // check if email is already exist in database
    const currentUser = await User.findOne({ email: email });
    if (currentUser) throw new Error("This Email is already exist.");
    //validate Password
    if (args.password.trim().length < 6)
      throw new Error("Password must be at least 6 characters.");
    // Encrypt Password
    const password = await bcrypt.hash(args.password, 10);
    return User.create({ ...args, email, password });
  },
};

export default Mutation;
