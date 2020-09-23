import { MiddlewareFn } from "type-graphql";
import { ApolloError } from "apollo-server-core";
import { MyContext } from "../graphql-types/MyContext";

//intercepts non authorized requests
export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new ApolloError("not authenticated");
  }

  return next();
};
