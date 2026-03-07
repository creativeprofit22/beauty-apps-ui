"use client";

import { useState, useCallback } from "react";
import { useLocale, type Locale } from "@/lib/i18n";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const assistantResponses: Record<Locale, string[]> = {
  en: [
    "I'd be happy to help you with that! Let me check our availability.",
    "Your appointment has been noted. Is there anything else you'd like to add?",
    "We have several options available for that service. Would you prefer morning or afternoon?",
    "Great choice! Our therapists are highly experienced with that treatment.",
    "I've updated your preferences. You'll receive a confirmation shortly.",
    "That time slot is available. Shall I go ahead and book it for you?",
    "Your loyalty points have been applied. You're getting closer to the next tier!",
    "We recommend pairing that with our signature aromatherapy add-on.",
  ],
  es: [
    "Estare encantado de ayudarte con eso. Dejame verificar nuestra disponibilidad.",
    "Tu cita ha sido registrada. Hay algo mas que quieras agregar?",
    "Tenemos varias opciones disponibles para ese servicio. Prefieres por la manana o por la tarde?",
    "Excelente eleccion! Nuestros terapeutas tienen mucha experiencia con ese tratamiento.",
    "He actualizado tus preferencias. Recibiras una confirmacion en breve.",
    "Ese horario esta disponible. Quieres que lo reserve para ti?",
    "Tus puntos de fidelidad han sido aplicados. Estas cada vez mas cerca del siguiente nivel!",
    "Recomendamos combinar eso con nuestro complemento exclusivo de aromaterapia.",
  ],
};

const welcomeMessage: Record<Locale, string> = {
  en: "Welcome! How can I help you today?",
  es: "Bienvenido! Como puedo ayudarte hoy?",
};

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
  const { locale } = useLocale();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createMessage("assistant", welcomeMessage[locale]),
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const send = useCallback((content: string) => {
    if (!content.trim()) return;

    const userMsg = createMessage("user", content.trim());
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const delay = 1000 + Math.random() * 1500;
    const responses = assistantResponses[locale];
    const reply = responses[Math.floor(Math.random() * responses.length)] ?? "...";

    setTimeout(() => {
      setMessages((prev) => [...prev, createMessage("assistant", reply)]);
      setIsTyping(false);
    }, delay);
  }, [locale]);

  return { messages, isTyping, send };
}
