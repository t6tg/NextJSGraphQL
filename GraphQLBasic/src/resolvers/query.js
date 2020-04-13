import User from "../models/user";
import Product from "../models/product";

const Query = {
  user: (parent, args, context, info) => {
    const id = args.id;
    const user = User.findById(id).populate({
      path: "products",
      populate: { path: "user" },
    });
    return user;
  },
  users: (parent, args, context, info) =>
    User.find({}).populate({ path: "products", populate: { path: "user" } }),
  product: (parent, args, context, info) =>
    Product.findById(args.id).populate({
      path: "user",
      populate: { path: "products" },
    }),
  products: (parent, args, context, info) =>
    Product.find().populate({ path: "user", populate: { path: "products" } }),
};

export default Query;
