import User from "../models/user";
import Mutation from "./mutation";

const Query = {
  user: (parent, args, context, info) => {
    const id = args.id;
    const user = User.findById(id);
    return user;
  },
  users: (parent, args, context, info) => User.find(),
};

const resolvers = {
  Query: Query,
  Mutation: Mutation,
};

export default resolvers;
