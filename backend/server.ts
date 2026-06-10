import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { userTypeDefs } from "./schema/userSchema.js";
import { userResolver } from "./resolvers/userResolver.js";
import { Query } from "mongoose";
import { departmentTypeDefs } from "./schema/departmentSchema.js";
import { departmentResolver } from "./resolvers/departmentResolver.js";
import { verifyToken } from "./utils/verifyToken.js";

const app = express();
const PORT = process.env.PORT || 8080;

const server = new ApolloServer({
  typeDefs: [userTypeDefs, departmentTypeDefs],

  resolvers: {
    Query: {
      ...userResolver.Query,
      ...departmentResolver.Query,
    },
    Mutation: {
      ...userResolver.Mutation,
      ...departmentResolver.Mutation,
    },
  },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },

  context: async ({ req }) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return { user: null };
    }

    const token = authHeader.replace("Bearer ", "");

    const user = verifyToken(token);

    return {
      user,
    };
  },
});

console.log(`GraphQL server running at port: ${url}`);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
