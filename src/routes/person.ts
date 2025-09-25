import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function personRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return prisma.person.findMany();
  });

  app.post("/", async (req, res) => {
    const { name, email } = req.body as { name: string; email: string };
    const person = await prisma.person.create({ data: { name, email } });
    return res.status(200).send(person);
  });

  app.put("/:id", async (req, res) => {
    const { id } = req.params as { id: string };
    const { name, email } = req.body as { name: string; email: string };
    const updated = await prisma.person.update({
      where: { id },
      data: { name, email },
    });
    return res.send(updated);
  });

  app.delete("/:id", async (req, res) => {
    const { id } = req.params as { id: string };
    await prisma.person.delete({ where: { id } });
    return res.status(204).send();
  });
}
