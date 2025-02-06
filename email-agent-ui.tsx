"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Pencil,
  MessageSquare,
  Settings,
  ChevronUp,
  ChevronDown,
  Maximize2,
  Minimize2,
  Expand,
  BarChart,
} from "lucide-react"
import { WriteEmail } from "./write-email"
import { ChatWithAgent } from "./chat-with-agent"
import { SettingsScreen } from "./settings-screen"
import { Dashboard } from "./dashboard"

const menuItems = [
  { icon: Pencil, label: "Write email", component: WriteEmail },
  { icon: MessageSquare, label: "Chat with Agent", component: ChatWithAgent },
  { icon: BarChart, label: "Dashboard", component: Dashboard },
]

type UIState = "collapsed" | "minimized" | "small" | "medium" | "large" | "fullExpanded"

export function EmailAgentUI() {
  const [uiState, setUiState] = useState<UIState>("medium")
  const [activeScreen, setActiveScreen] = useState("Write email")

  const toggleCollapse = useCallback(() => {
    setUiState((prevState) => (prevState === "collapsed" ? "medium" : "collapsed"))
  }, [])

  const toggleMinimize = useCallback(() => {
    setUiState((prevState) => (prevState === "minimized" ? "medium" : "minimized"))
  }, [])

  const toggleSize = useCallback(() => {
    setUiState((prevState) => {
      switch (prevState) {
        case "small":
          return "medium"
        case "medium":
          return "large"
        case "large":
          return "fullExpanded"
        case "fullExpanded":
          return "medium"
        default:
          return "medium"
      }
    })
  }, [])

  const getUiClasses = () => {
    switch (uiState) {
      case "collapsed":
        return "w-16 h-16"
      case "minimized":
        return "w-64 h-12"
      case "small":
        return "w-[30vw] h-[30vh]"
      case "medium":
        return "w-[40vw] h-[40vh]"
      case "large":
        return "w-[50vw] h-[50vh]"
      case "fullExpanded":
        return "w-[80vw] h-[80vh]"
    }
  }

  const renderContent = () => {
    if (uiState === "collapsed" || uiState === "minimized") return null

    return (
      <div className="flex h-full">
        <div className="w-16 border-r border-gray-200 flex flex-col">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              size="icon"
              className={`w-full aspect-square flex items-center justify-center ${
                activeScreen === item.label
                  ? "bg-purple-100 text-purple-900"
                  : "text-purple-800 hover:bg-purple-100 hover:text-purple-900"
              }`}
              onClick={() => setActiveScreen(item.label)}
              title={item.label}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className={`w-full aspect-square flex items-center justify-center mt-auto ${
              activeScreen === "Settings"
                ? "bg-purple-100 text-purple-900"
                : "text-purple-800 hover:bg-purple-100 hover:text-purple-900"
            }`}
            onClick={() => setActiveScreen("Settings")}
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-grow flex">
          <div className="flex-grow p-4 overflow-auto w-full">
            {activeScreen === "Write email" && <WriteEmail />}
            {activeScreen === "Chat with Agent" && <ChatWithAgent />}
            {activeScreen === "Dashboard" && <Dashboard />}
            {activeScreen === "Settings" && <SettingsScreen />}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`fixed bottom-4 left-4 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${getUiClasses()}`}
    >
      <div className="bg-purple-600 p-3 flex items-center justify-between">
        <span className="text-white font-semibold">Email Agent</span>
        <div className="flex gap-2">
          {uiState !== "collapsed" && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-purple-700"
                onClick={toggleMinimize}
              >
                {uiState === "minimized" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-purple-700"
                onClick={toggleSize}
              >
                <Expand className="h-4 w-4" />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white hover:bg-purple-700"
            onClick={toggleCollapse}
          >
            {uiState === "collapsed" ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      {renderContent()}
    </div>
  )
}

export function OutlookBackground() {
  return (
    <div
      className="outlook-background w-screen h-screen bg-cover bg-no-repeat bg-center fixed top-0 left-0 -z-10"
      style={{
        backgroundImage:
          'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Outloook%20Screenshot-cjBVY1lUAwK0YiLiZ6sPlmGU5AhfcF.gif")',
      }}
    />
  )
}
;<style jsx global>{`
  .outlook-background {
    z-index: -1;
  }
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }
`}</style>
}

