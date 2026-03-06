"use client";

import { useState, useCallback } from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const assistantResponses = [
  "I'd be happy to help you with that! Let me check our availability.",
  "Your appointment has been noted. Is there anything else you'd like to add?",
  "We have several options available for that service. Would you prefer morning or afternoon?",
  "Great choice! Our therapists are highly experienced with that treatment.",
  "I've updated your preferences. You'll receive a confirmation shortly.",
  "That time slot is available. Shall I go ahead and book it for you?",
  "Your loyalty points have been applied. You're getting closer to the next tier!",
  "We recommend pairing that with our signature aromatherapy add-on.",
];

let messageIdCounter = 0;

function createMessage(role: "user" | "assistant", content: string): ChatMessage {
  return {
    id: `msg-${++messageIdCounter}`,
    role,
    content,
    timestamp: new Date(),
  };
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage("assistant", "Welcome! How can I help you today?"),
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const send = useCallback((content: string) => {
    if (!content.trim()) return;

    const userMsg = createMessage("user", content.trim());
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const delay = 1000 + Math.random() * 1500;
    const reply = assistantResponses[Math.floor(Math.random() * assistantResponses.length)] ?? "I'll look into that for you!";

    setTimeout(() => {
      setMessages((prev) => [...prev, createMessage("assistant", reply)]);
      setIsTyping(false);
    }, delay);
  }, []);

  return { messages, isTyping, send };
}
