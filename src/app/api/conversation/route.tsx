// import React from "react";
// import OpenAI from "openai";
// import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";

// const openai = new OpenAI({
//   apiKey: process.env["OPEN_AI_KEY"],
// });

// export async function POST(req: Request) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { messages } = body;

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     if (!openai.apiKey) {
//       return new NextResponse("OpenAI Key not configured", { status: 500 });
//     }

//     if (!messages) {
//       return new NextResponse("Messages are required", { status: 400 });
//     }

//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages,
//     });

//     // Access the first choice message in the response
//     const message = response.choices[0]?.message;

//     return NextResponse.json(message);
//   } catch (error) {
//     console.log("[CONVERSATION_ERROR]", error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// }

// export default openai;

import OpenAI from "openai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

// Initialize OpenAI with the API key
const openai = new OpenAI({
  apiKey: process.env["OPEN_AI_KEY"],
});

// Function to handle POST requests
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    // Check if user is authenticated
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if OpenAI API key is configured
    if (!openai.apiKey) {
      return new NextResponse("OpenAI Key not configured", { status: 500 });
    }

    // Validate the messages input
    if (!messages || !Array.isArray(messages)) {
      return new NextResponse("Invalid messages format", { status: 400 });
    }

    // Generate a completion with OpenAI's API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    // Check if there is a valid response message
    const message = response.choices[0]?.message;
    if (!message) {
      return new NextResponse("No response from OpenAI", { status: 500 });
    }

    return NextResponse.json(message);
  } catch (error) {
    console.error("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export default openai;
