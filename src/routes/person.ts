import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function personRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    return prisma.person.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updateAt: true,
      },
    });
  });

  app.post("/", async (req, res) => {
    const { name, email, password } = req.body as {
      name: string;
      email: string;
      password: string;
    };

    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ error: "Campos obrigatórios: name, email e password" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const person = await prisma.person.create({
      data: { name, email, password: hashedPassword },
    });

    return res.status(201).send({
      id: person.id,
      name: person.name,
      email: person.email,
      createdAt: person.createdAt,
      updateAt: person.updateAt,
    });
  });

  app.patch("/:id", async (req, res) => {
    const { id } = req.params as { id: string };
    const { name, email, password } = req.body as {
      name?: string;
      email?: string;
      password?: string;
    };

    let data: any = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 10);

    const updated = await prisma.person.update({
      where: { id },
      data,
    });

    return res.send({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      createdAt: updated.createdAt,
      updateAt: updated.updateAt,
    });
  });

  app.delete("/:id", async (req, res) => {
    const { id } = req.params as { id: string };
    await prisma.person.delete({ where: { id } });
    return res.status(204).send();
  });
}
