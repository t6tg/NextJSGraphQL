import User from "../models/user";
import bcrypt from "bcryptjs";
import Product from "../models/product";

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
  createProduct: async (parent, args, context, info) => {
    const userId = "5e92ef5e1bcd8e230fa8bccf";

    const { description, price, imageUrl } = args;
    if (!description || !price || !imageUrl)
      throw new Error("Please provide all requires fields");
    const product = await Product.create({ ...args, user: userId });
    const user = await User.findById(userId);
    if (!user.products) {
      user.products = [product];
    } else {
      user.products.push(product);
    }
    await user.save();

    return Product.findById(product.id).populate({
      path: "user",
      populate: { path: "products" },
    });
  },
};

export default Mutation;
