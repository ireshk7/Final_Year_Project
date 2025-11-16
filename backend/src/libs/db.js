import {PrismaClient} from "../generated/prisma/index.js";

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient();


db.$connect()
  .then(() => console.log('Prisma connected to the database'))
  .catch((error) => console.error('Prisma connection error:', error));

if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = db