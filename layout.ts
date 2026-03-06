import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SessionProviders from "@/components/Providers/SessionProvider";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/components/Providers/ReduxProvider";
import { ErrorBoundary } from "react-error-boundary";
import AppErrorBoundary from "@/components/app-error-boundary";
import TanstackProvider from "@/components/Providers/TanstackProvider";
import RegisterSW from "@/components/RegisterSW";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });


export const metadata: Metadata = {
  title: {
    default: "Trakion – Smart Task Manager for Projects",
    template: "%s | Trakion",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
  },
  description:
    "Manage tasks, organize projects, and boost productivity with Trakion.",
  applicationName: "Trakion",
  openGraph: {
    title: "Trakion – Smart Task Manager for Project Organization",
    description:
      "Organize tasks, track projects, and improve team productivity with Trakion’s smart task management system.",
    type: "website",
    siteName: "Trakion",
    images: [
      "https://klizos-attendance-new.s3.us-east-2.amazonaws.com/task-managemet-system/1769078192868-OG_Image.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trakion – Smart Task Manager for Projects",
    description:
      "Manage tasks, organize projects, and boost productivity with Trakion.",
    images: [
      "https://klizos-attendance-new.s3.us-east-2.amazonaws.com/task-managemet-system/1769078192868-OG_Image.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
      <link rel="manifest" href="/manifest.json" />
      <body className={`${outfit.className} antialiased`}>
        <Toaster position="bottom-right" />
        <RegisterSW/>
        <ErrorBoundary fallback={<AppErrorBoundary className="min-h-screen" />}>
        <TanstackProvider>
          <ReduxProvider>
            <SessionProviders>{children}</SessionProviders>
          </ReduxProvider>
        </TanstackProvider>  
        </ErrorBoundary>
      </body>
    </html>
  );
}
