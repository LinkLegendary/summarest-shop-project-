// import type { User } from "@prisma/client";
export type User = {
  id: string;
  email: string;
  firebaseUid: string;
  subscription: "basic" | "premium";
  createdAt: Date;
};