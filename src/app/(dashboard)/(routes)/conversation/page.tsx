// "use client";
// import * as z from "zod";
// import axios from "axios";
// import Heading from "@/components/heading";
// import { MessageSquare } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { formSchema } from "./constants";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { ChatCompletionMessageParam } from "openai/resources";

// import { useAuth } from "@clerk/nextjs";
// import configuration from "@/app/api/conversation/route";

// const ConversationPage = () => {
//   const router = useRouter();
//   const { isSignedIn } = useAuth(); // Clerk authentication check
//   const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   interface ChatCompletionMessage {
//     role: any; // allows any type, no type-checking on `role`
//     content: string;
//   }
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       prompt: "",
//     },
//   });

//   const isLoading = form.formState.isSubmitting;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     if (!isSignedIn) {
//       setError("You must be signed in to send a message.");
//       return;
//     }

//     try {
//       setError(null); // Clear any previous errors

//       const userMessage: ChatCompletionMessage = {
//         role: "user",
//         content: values.prompt,
//       };

//       const newMessages = [...messages, userMessage];
//       const response = await axios.post("/api/conversation", {
//         messages: newMessages,
//       });

//       setMessages((current) => [...current, userMessage, response.data]);
//       form.reset();
//     } catch (error: any) {
//       setError("Failed to send message. Please try again.");
//       console.error(error);
//     } finally {
//       router.refresh();
//     }
//   };

//   return (
//     <div>
//       <Heading
//         title="Conversation"
//         description="Our most advanced conversation model."
//         icon={MessageSquare}
//         iconColor="text-violet-500"
//         bgColor="text-violet-500/10"
//       />
//       <div className="px-4 lg:px-8">
//         <div>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
//             >
//               <FormField
//                 name="prompt"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-10">
//                     <FormControl className="m-0 p-0">
//                       <Input
//                         className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
//                         disabled={isLoading}
//                         placeholder="How do I calculate the radius of a circle?"
//                         {...field}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <Button
//                 className="col-span-12 lg:col-span-2 w-full"
//                 disabled={isLoading}
//               >
//                 Generate
//               </Button>
//             </form>
//           </Form>
//         </div>
//         {error && <div className="text-red-500 mt-2">{error}</div>}
//         <div className="space-y-4 mt-4">
//           <div className="flex flex-col-reverse gap-y-4">
//             {messages.map((message, index) => (
//               <div key={index}>{message.content}</div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConversationPage;
"use client";
import React, { useState } from "react";
import * as z from "zod";
import axios from "axios";
import Heading from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources";
import { useAuth } from "@clerk/nextjs";

const ConversationPage = () => {
  const router = useRouter();
  const { isSignedIn, getToken } = useAuth(); // Clerk authentication check with token
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isSignedIn) {
      setError("You must be signed in to send a message.");
      return;
    }

    try {
      setError(null); // Clear any previous errors

      const userMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];

      // Get the authentication token
      const token = await getToken();

      const response = await axios.post(
        "/api/conversation",
        { messages: newMessages },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );

      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      setError("Failed to send message. Please try again.");
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="text-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle?"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <div className="space-y-4 mt-4">
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div key={index}>{message.content}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
