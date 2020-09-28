import { MiddlewareFn } from "type-graphql";
import { ApolloError } from "apollo-server-core";
import { HelixContext } from "../graphql-types/HelixContext";

//intercepts non authorized requests
export const isAuth: MiddlewareFn<HelixContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new ApolloError("not authenticated");
  }

  return next();
};
