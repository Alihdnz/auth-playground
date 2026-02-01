import type {NextAuthOptions} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    session: {strategy: 'jwt'},
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                const email = credentials?.email.toLowerCase().trim();
                const password = credentials?.password;

                if(!email || !password) return null;

                const user = await prisma.user.findUnique({ where: { email }});
                if(!user) return null;

                const ok = await bcrypt.compare(password, user.password);
                if(!ok) return null;

                return { id: user.id, name: user.name ?? null, email: user.email}; 
            },
        }),
    ],
    pages: {
        signIn: "/login",
    }
}