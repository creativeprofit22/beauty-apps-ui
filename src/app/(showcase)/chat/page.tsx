"use client";

import { PageHeader } from "@/components/layout/page-header";
import { ShowcaseSection } from "@/components/layout/showcase-section";
import { Card } from "@/components/primitives/card";
import { ChatInterface } from "@/components/data-display/chat-interface";

export default function ChatPage() {
  return (
    <>
      <PageHeader
        title="Chat"
        subtitle="Full-height chat interface demo with message bubbles, typing indicator, and compose bar."
      />

      {/* ── Full-height Chat Demo ── */}
      <ShowcaseSection title="Chat Interface" className="mb-16">
        <Card className="p-0 overflow-hidden">
          <div className="stagger-child" style={{ height: "min(600px, 70vh)" }}>
            <ChatInterface />
          </div>
        </Card>
        <p className="text-xs text-text-tertiary mt-4">
          Scrollable message list with user and assistant bubbles. Compose bar with send button.
          Three-dot typing indicator bounces while the assistant is &ldquo;thinking.&rdquo;
          Messages auto-scroll to bottom on new entries.
        </p>
      </ShowcaseSection>
    </>
  );
}
