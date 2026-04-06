import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  description: "threads clone",
  title: "threads clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${poppins.variable} h-full antialiased`} lang="en">
      <body
        className={`${poppins.className} min-h-full flex flex-col bg-background`}
      >
        {children}
      </body>
    </html>
  );
}
