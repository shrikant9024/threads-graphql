import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
const app = express();
import bodyParser from "body-parser";
const PORT = Number(process.env.PORT) || 8000;

//create graphql server

async function init() {
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query{
        hello:String
        say(name:String):String
    }`,
    resolvers: {
      Query: {
        hello: () => `Hey there it is a graphql server`,
        say: (_, { name }: { name: String }) =>
          `Hey ${name}, hello from graphql Server`,
      },
    },
  });

  app.use(bodyParser.json());

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Sever is up and running" });
  });
  //adas
  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => console.log(`Server is running on port : ${PORT} `));
}

init();
