import Fastify from "fastify";
import cors from "@fastify/cors";
import { personRoutes } from "./routes/person";
import { itemRoutes } from "./routes/items";

const app = Fastify({ logger: true });

// Plugins
app.register(cors, { origin: "*" });

// Rotas
app.register(personRoutes, { prefix: "/persons" });
app.register(itemRoutes, { prefix: "/items" });

const start = async () => {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🚀 Server running at http://localhost:3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
