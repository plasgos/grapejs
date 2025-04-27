import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ollama from "ollama";
import { useState } from "react";

const TestPage = () => {
  const [prompt, setPrompt] = useState("");
  const [isStream, setIsStream] = useState(false);

  const [stramedMessage, setStramedMessage] = useState("");
  console.log("🚀 ~ TestPage ~ stramedMessage:", stramedMessage);

  const generateAi = async () => {
    const response = await ollama.generate({
      model: "tinyllama",
      prompt: prompt,
      stream: isStream,
    });

    if (isStream) {
      for await (const part of response) {
        console.log("🚀 ~ forawait ~ part:", part);
        const message = part.response;
        console.log("🚀 ~ forawait ~ message:", message);
        setStramedMessage((prevMessage) => (prevMessage += message));
      }
    } else {
      const result = response.response;
      console.log("🚀 ~ generateAi ~ result:", result);

      return result;
    }
  };

  const generateAiChat = async () => {
    const response = await ollama.chat({
      model: "tinyllama",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: isStream,
    });

    if (isStream) {
      for await (const part of response) {
        console.log("🚀 ~ forawait ~ part:", part);
        const message = part.message.content;
        console.log("🚀 ~ forawait ~ message:", message);
        setStramedMessage((prevMessage) => (prevMessage += message));
      }
    } else {
      const result = response.message.content;
      setStramedMessage(result);
      console.log("🚀 ~ generateAi ~ result:", result);

      return result;
    }
  };

  return (
    <div className="flex flex-col gap-y-5 text-center  max-w-md justify-center h-screen mx-auto">
      AI Ollama Test
      <div className="w-full border rounded-lg p-2">
        {stramedMessage && <p>{stramedMessage}</p>}
      </div>
      <div className="">
        <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </div>
      <div className="flex justify-between">
        <p>Streaming</p>
        <Switch
          checked={isStream}
          onCheckedChange={(checked) => setIsStream(checked)}
        />
      </div>
      <Button onClick={generateAiChat}>Generate Ai</Button>
    </div>
  );
};

export default TestPage;
