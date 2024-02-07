import { PrismaClient } from "@prisma/client";
import app from "./app";

const prisma = new PrismaClient();

async function main() {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
