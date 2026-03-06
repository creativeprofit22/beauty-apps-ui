"use client";

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/primitives/input";
import { Button } from "@/components/primitives/button";
import { useChat, type ChatMessage } from "@/hooks/useChat";

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 max-w-[80%]" aria-label="Assistant is typing">
      <div
        className="rounded-xl rounded-bl-sm px-4 py-3 bg-surface-raised ring-1 ring-border/50"
        style={{ boxShadow: "var(--elevation-card-highlight), var(--elevation-card)" }}
      >
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-1.5 h-1.5 rounded-full bg-text-tertiary"
              style={{
                animation: "typing-dot 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-xl px-4 py-2.5",
          isUser
            ? "rounded-br-sm bg-primary text-text-primary"
            : "rounded-bl-sm bg-surface-raised ring-1 ring-border/50",
        )}
        style={
          isUser
            ? undefined
            : { boxShadow: "var(--elevation-card-highlight), var(--elevation-card)" }
        }
      >
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
      <span className="text-text-tertiary" style={{ fontSize: "var(--font-size-2xs)" }}>
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
}

export function ChatInterface({ className }: { className?: string }) {
  const { messages, isTyping, send } = useChat();
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!draft.trim()) return;
    send(draft);
    setDraft("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col rounded-xl bg-surface-sunken ring-1 ring-border/50 overflow-hidden",
        className,
      )}
      style={{ height: 420 }}
    >
      {/* Message list */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Compose bar */}
      <div className="flex items-center gap-2 p-3 border-t border-border bg-surface-base">
        <Input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button
          size="sm"
          variant="primary"
          radius="pill"
          onClick={handleSend}
          disabled={!draft.trim()}
          aria-label="Send message"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M14 2L7 9M14 2L9.5 14L7 9M14 2L2 6.5L7 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
