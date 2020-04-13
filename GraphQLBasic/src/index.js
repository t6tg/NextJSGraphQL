import dotenv from "dotenv";
import express from "express";
import server from "./server";
import mongoose from "mongoose";
dotenv.config();

const { PORT, DB_NAME, DB_Password, DB_USER } = process.env;
const createServer = async () => {
  try {
    const app = express();
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_Password}@graphql-basic-nn8mg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
      { useUnifiedTopology: true }
    );
    server.applyMiddleware({ app });

    app.listen({ port: PORT }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
      )
    );
  } catch (error) {
    console.error(error);
  }
};

createServer();
