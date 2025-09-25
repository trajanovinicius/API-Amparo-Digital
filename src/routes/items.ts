import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function itemRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return prisma.item.findMany();
  });

  app.post("/", async (req, res) => {
    const { name, quantity } = req.body as {
      name: string;
      quantity: number;
    };

    const item = await prisma.item.create({
      data: { name, quantity },
    });

    return res.status(200).send(item);
  });

  app.patch("/:id", async (req, res) => {
    const { id } = req.params as { id: string };
    const { name, quantity } = req.body as {
      name?: string;
      quantity?: number;
    };

    const updated = await prisma.item.update({
      where: { id },
      data: { name, quantity },
    });

    return res.send(updated);
  });

  app.delete("/:id", async (req, res) => {
    const { id } = req.params as { id: string };
    await prisma.item.delete({ where: { id } });
    return res.status(204).send();
  });
}
