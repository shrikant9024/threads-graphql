import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlerver from "./graphql";
import bodyParser from "body-parser";
//create graphql server

async function init() {
  const app = express();

  const PORT = Number(process.env.PORT) || 8000;

  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.json({ message: "Sever is up and running" });
  });
  //adas
  app.use("/graphql", expressMiddleware(await createApolloGraphqlerver()));

  app.listen(PORT, () => console.log(`Server is running on port : ${PORT} `));
}

init();
