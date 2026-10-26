import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer";
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

// Applies a saved theme choice before first paint; without one, CSS follows the OS setting
const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

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
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
