import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import moment from "moment";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";
import "moment/locale/vi";

moment.locale("vi");

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  description: "Bản sao threads",
  title: "Bản sao threads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${poppins.variable} h-full antialiased`} lang="vi">
      <body
        className={`${poppins.className} min-h-full flex flex-col bg-background`}
      >
        <QueryProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#333",
                color: "#fff",
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
