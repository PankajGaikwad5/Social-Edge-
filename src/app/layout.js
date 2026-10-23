import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// Headings
const glacial = localFont({
  variable: "--font-glacial",
  src: [
    { path: "./fonts/GlacialIndifference-Regular.woff", weight: "400", style: "normal" },
    { path: "./fonts/GlacialIndifference-Bold.woff", weight: "700", style: "normal" },
  ],
});

// Body, UI and everything else
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Social Edge | Growth-Driven Social Media Agency",
  description:
    "Social Edge helps brands grow with campaigns, content, and performance marketing.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${glacial.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
