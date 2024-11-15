import type { Metadata } from "next";
import "./globals.css";
import { EB_Garamond } from "next/font/google";

const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eb-garamond",
});

export const metadata: Metadata = {
  title: "buzzwatch",
  description: "get email when a seat opens up for a gt course section",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`font-serif ${eb_garamond.variable} text-xl antialiased`}
      >
        <div className="px-4 py-12">
          <div className="mx-auto max-w-[720px]">{children}</div>
        </div>
      </body>
    </html>
  );
}
