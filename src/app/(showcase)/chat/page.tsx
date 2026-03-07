"use client";

import { PageHeader } from "@/components/layout/page-header";
import { ShowcaseSection } from "@/components/layout/showcase-section";
import { Card } from "@/components/primitives/card";
import { ChatInterface } from "@/components/data-display/chat-interface";
import { useLocale } from "@/lib/i18n";
import { chatStrings as s } from "@/lib/strings/chat";

export default function ChatPage() {
  const { t } = useLocale();

  return (
    <>
      <PageHeader
        title={t(s.title)}
        subtitle={t(s.subtitle)}
      />

      {/* ── Full-height Chat Demo ── */}
      <ShowcaseSection title={t(s.sectionChatInterface)} className="mb-16">
        <Card className="p-0 overflow-hidden">
          <div className="stagger-child" style={{ height: "min(600px, 70vh)" }}>
            <ChatInterface />
          </div>
        </Card>
        <p className="text-xs text-text-tertiary mt-4">
          {t(s.chatDesc)}
        </p>
      </ShowcaseSection>
    </>
  );
}
