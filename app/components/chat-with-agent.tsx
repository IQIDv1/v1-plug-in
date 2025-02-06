"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Search, FileText } from "lucide-react"

type Message = {
  role: "user" | "agent"
  content: string
}

type RAGSearch = {
  query: string
  result: string
  type: "text" | "pdf"
  source?: string
}

export function ChatWithAgent() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "agent", content: "Hey there! 👋 How can I help with your email today?" },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [ragSearches, setRagSearches] = useState<RAGSearch[]>([
    {
      query: "Missouri disbursement of funds guidelines",
      result:
        "Found this: Section 3.4 of Missouri State Financial Aid Handbook says funds must be sent out within 3 business days of getting them from the state.",
      type: "text",
    },
    {
      query: "University email communication guidelines",
      result:
        "Retrieved from University Guidelines for Communication (PDF): Section 2.1 - 'All email communications should maintain a professional tone and adhere to the university's brand voice guidelines.'",
      type: "pdf",
      source: "University_Guidelines_for_Communication.pdf",
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [])

  const sendMessage = useCallback(() => {
    if (inputMessage.trim() === "") return

    const newMessages = [
      ...messages,
      { role: "user", content: inputMessage },
      { role: "agent", content: "Just a sec, thinking about that..." },
    ]
    setMessages(newMessages)
    setInputMessage("")

    // Simulate agent response
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        {
          role: "agent",
          content:
            "I took a look at your email, and I have a few ideas to make it even better:\n\n1. Start by using the student's name\n2. Mention that you understand their worry about the late FAFSA\n3. Give them a clear idea of when they'll hear back\n4. Offer some extra help or info they can check out\n\nWant me to rewrite it with these changes?",
        },
      ])

      // Simulate RAG search
      setRagSearches((prevSearches) => [
        {
          query: "Email tone guidelines for financial aid",
          result:
            "From University Guidelines for Communication (PDF): 'When discussing financial matters, maintain a supportive and empathetic tone while providing clear, factual information.'",
          type: "pdf",
          source: "University_Guidelines_for_Communication.pdf",
        },
        ...prevSearches,
      ])
    }, 2000)
  }, [inputMessage])

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <Tabs defaultValue="chat" className="flex-grow flex flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="rag-history">Search History</TabsTrigger>
        </TabsList>
        <TabsContent value="chat" className="flex-grow flex flex-col p-4">
          <ScrollArea className="flex-grow pr-4 mb-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] p-3 rounded-2xl ${
                      message.role === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-800"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="rounded-full bg-white"
            />
            <Button onClick={sendMessage} className="rounded-full bg-blue-500 hover:bg-blue-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="rag-history" className="flex-grow p-4">
          <ScrollArea className="h-full pr-4">
            {ragSearches.map((search, index) => (
              <div key={index} className="mb-4 bg-white p-3 rounded-lg shadow">
                <div className="flex items-center mb-2">
                  {search.type === "pdf" ? (
                    <FileText className="h-4 w-4 mr-2 text-red-500" />
                  ) : (
                    <Search className="h-4 w-4 mr-2 text-blue-500" />
                  )}
                  <p className="text-sm font-semibold">{search.query}</p>
                </div>
                <p className="text-sm mb-1">{search.result}</p>
                {search.source && <p className="text-xs text-gray-500">Source: {search.source}</p>}
              </div>
            ))}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

