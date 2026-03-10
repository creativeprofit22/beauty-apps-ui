import type { Metadata } from "next";
import "@fontsource/dm-serif-display";
import "@fontsource-variable/dm-sans";
import "@fontsource/fira-code/400.css";
import "@fontsource/fira-code/500.css";
import "@fontsource/fira-code/600.css";
import "@/styles/globals.css";
import "../../skins/spa/skin.css";
import "../../skins/barber/skin.css";
import "../../skins/nail-salon/skin.css";
import "../../skins/tattoo/skin.css";

export const metadata: Metadata = {
  title: "Beauty Apps UI",
  description: "Open-source UI component library for beauty & wellness apps. Built by Douro.",
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
    var skin = localStorage.getItem('skin');
    if (skin && ['spa','barber','nail-salon','tattoo'].indexOf(skin) !== -1) {
      document.documentElement.dataset.skin = skin;
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
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
