"use server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";
import { ServerSessionUser } from "@repo/interfaces/interfaces";

import bcrypt from "bcrypt";

export const ConfirmWithDrawl = async (password: string) => {
  try {
    const session: {
      user: ServerSessionUser;
    } | null = await getServerSession(authOptions);

    if (!session?.user || !session.user?.id) {
      return {
        message: "Unauthenticated Request",
      };
    }

    const passwordDB = await prisma.user.findUnique({
      where: {
        id: Number(session.user.id),
      },
      select: {
        password: true,
      },
    });
    if (!passwordDB) {
      return { message: "User record not found." };
    }
    const validation = await bcrypt.compare(
      password,
      passwordDB?.password as string
    );
    if (validation) {
      return { message: "success" };
    }
    return { message: "Password is not valid" };
  } catch (error) {
    if (error instanceof Error) {
      return { message: `An error occurred: ${error.message}` };
    } else {
      return { message: "An unknown error occurred in creating Off Ramp" };
    }
  }
};
