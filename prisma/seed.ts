import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";


const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main(){
    const email = "demo@demo.com";
    const plainPassword = "demo1234";
    const password = await bcrypt.hash(plainPassword, 10);

    await prisma.user.upsert({
        where: { email },
        update: { password },
        create: {
            email, 
            name: "Demo User",
            password,
        },
    });

    console.log("seed ok", {email, password: plainPassword});

}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})
