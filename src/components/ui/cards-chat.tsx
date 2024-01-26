import * as React from "react";
import { Send } from "lucide-react";

import { cn, run } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function CardsChat() {
  const [messages, setMessages] = React.useState<
    { role: string; content: string }[]
  >([]);
  const [input, setInput] = React.useState("");
  const inputLength = input.trim().length;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>G</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Gemini</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 w-64 overflow h-screen">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (inputLength === 0) return;
              const tmpMessages = [
                ...messages,
                {
                  role: "user",
                  content: input,
                },
              ];
              setMessages(tmpMessages);
              setInput("");
              run(input, "AIzaSyA70TGBfn47Z9Jczc6V3ocB3WRa9ylVoC8")
                .then((text) =>
                  setMessages([
                    ...tmpMessages,
                    {
                      role: "agent",
                      content: text,
                    },
                  ])
                )
                .catch(() =>
                  setMessages([
                    ...tmpMessages,
                    {
                      role: "agent",
                      content: "not answer",
                    },
                  ])
                );
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
