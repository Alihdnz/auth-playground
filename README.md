##Auth Playground

Authentication and authorization playground built with Next.js (App Router), Auth.js (NextAuth), Prisma 7 and PostgreSQL.

Demonstrates a clean implementation of:

Credentials authentication

JWT session strategy

Role-Based Access Control (RBAC)

Middleware route protection

Typed session extension

Tech Stack

Next.js 16

TypeScript

Auth.js (Credentials Provider)

Prisma 7 + PostgreSQL

Tailwind CSS

shadcn/ui

RBAC Implementation

Role is stored directly on the User model:

enum Role {
  ADMIN
  USER
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}


Authorization flow:

Role injected into JWT on login

Role exposed in session

Middleware protects routes:

/dashboard → authenticated users

/admin → ADMIN only

Unauthorized access redirects to /forbidden

Seed Users
ADMIN: admin@demo.com / admin1234
USER : demo@demo.com  / demo1234


Run:

npx prisma db seed

Run Locally
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev


Environment variables required:

DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

Notes

This project focuses on clean authentication architecture and scalable authorization patterns using modern web tooling.    
