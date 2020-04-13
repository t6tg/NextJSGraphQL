import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: { type: String, required: true, unique: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  createdAt: { type: Date, required: true, default: () => Date.now() },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
