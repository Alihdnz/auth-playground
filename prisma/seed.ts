import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";


const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const users = [
    {
      name: "Admin User",
      email: "admin@demo.com",
      password: "admin1234",
      role: Role.ADMIN,
    },
    {
      name: "Demo User",
      email: "demo@demo.com",
      password: "demo1234",
      role: Role.USER,
    },
  ] as const;

  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10);

    await prisma.user.upsert({
      where: { email: u.email },
      update: { password: hashed, role: u.role, name: u.name },
      create: { email: u.email, name: u.name, password: hashed, role: u.role },
    });
  }

  console.log("Seed ok:");
  console.log("ADMIN:", "admin@demo.com / admin1234");
  console.log("USER :", "demo@demo.com / demo1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
