"use server";

import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

const someAuthenticatedAction = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
};
