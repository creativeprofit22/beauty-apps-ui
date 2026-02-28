import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource/fira-code/400.css";
import "@fontsource/fira-code/500.css";
import "@fontsource/fira-code/600.css";
import "@/styles/globals.css";
import "@/skin/skin.css";

export const metadata: Metadata = {
  title: "Spa UI Moodboard",
  description: "Design system showcase for the spa-ai-platform component library",
};

/**
 * Inline script to prevent theme flash on load.
 * Reads from localStorage, falls back to system preference.
 */
const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-skin={process.env.SKIN || "spa"}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
