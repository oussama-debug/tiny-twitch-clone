import { GeistSans } from "geist/font/sans";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import AuthenticationProvider from "@/components/provider/authentication";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { RequestQueryClientProvider } from "@/library/provider";

import "./globals.scss";
import clsx from "clsx";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "",
  description: "",
};

const interFont = Inter({ variable: "--font-inter", subsets: ["latin"] });
const ibmFont = IBM_Plex_Sans({
  variable: "--font-ibm",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(interFont.variable, ibmFont.variable, GeistSans.variable)}
    >
      <body>
        <main className="min-h-screen flex flex-col items-star overflow-hidden">
          <ClerkProvider>
            <AuthenticationProvider>
              <RequestQueryClientProvider>
                {children}
              </RequestQueryClientProvider>
            </AuthenticationProvider>
          </ClerkProvider>
        </main>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
