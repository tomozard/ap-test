const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.get(`/api`, async (req, res) => {
  res.json({ up: true });
});

app.get(`/api/product/:id`, async (req, res) => {
  const { id } = req.params;
  const result = await prisma.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(result);
});

app.get(`/api/products/:skip?/:take?/:keyword?`, async (req, res) => {
  const { skip, take, keyword } = req.params;
  const opt = {};
  if (skip && parseInt(skip) > 0) {
    opt.skip = parseInt(skip);
  }
  if (take && parseInt(take) > 0) {
    opt.take = parseInt(take);
  }
  if (keyword) {
    opt.where = {
      OR: [
        {
          title: {
            contains: keyword,
          },
        },
        {
          description: {
            contains: keyword,
          },
        },
      ],
    };
  }
  const result = await prisma.product.findMany(opt);
  res.json(result);
});

app.post(`/api/product`, async (req, res) => {
  const result = await prisma.product.create({
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

app.patch("/api/product/:id", async (req, res) => {
  const { id } = req.params;
  const result = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

app.delete(`/api/product/:id`, async (req, res) => {
  const { id } = req.params;
  const result = await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json(result);
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(
    `🚀 Server ready at: http://localhost:${PORT}\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`
  )
);
