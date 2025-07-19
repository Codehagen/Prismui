"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // You can pass client configuration here if needed
});

export const { signIn, signUp, signOut, useSession, getSession } = authClient;