import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
import { CompanyResolver } from "./resolvers/CompanyResolver";
import { createCompaniesLoader } from "./utils/companyLoader";
import { EmployeeEmployerResolver } from "./resolvers/EmployeeEmployerResolver";
import { UserResolver } from "./resolvers/UserResolver";

(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({ ...options, name: "default" });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloWorldResolver,
        CompanyResolver,
        EmployeeEmployerResolver,
        UserResolver,
      ],
      validate: true,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      companyLoader: createCompaniesLoader(),
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
