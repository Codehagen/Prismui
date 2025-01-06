"use server";

import { getTweet } from "react-tweet/api";

export async function fetchTweet(id: string) {
  try {
    const tweet = await getTweet(id);
    if (!tweet) {
      throw new Error("Tweet not found");
    }
    return { tweet };
  } catch (error) {
    console.error("Error fetching tweet:", error);
    return { error: "Failed to fetch tweet" };
  }
}
