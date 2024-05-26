import { Inter } from "next/font/google"; // Importing Inter font from Google Fonts
import "./globals.css"; // Importing global styles
import Navbar from "./components/navbar"; // Importing Navbar component
import Footer from "./components/footer"; // Importing Footer component
import AuthSesionProvider from "./context/authSesionProvider"; // Importing AuthSessionProvider context

// Initializing Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Metadata for the website
export const metadata = {
  title: "Fund Me",
  description: "This aims to connect funders to entities seeking fundings",
};

// RootLayout component for the overall layout of the application
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Providing authentication session context */}
      <AuthSesionProvider>
        {/* Setting up the body with Inter font */}
        <body className={inter.className}>
          {/* Navbar component */}
          <Navbar />
          {/* Render children components */}
          {children}
          {/* Footer component */}
          <Footer/>
        </body>
      </AuthSesionProvider>
    </html>
  );
}
