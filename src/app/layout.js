import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import AuthSesionProvider from "./context/authSesionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Fund Me",
  description: "This aims to connect funders to entities seeking fundings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthSesionProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer/>
        </body>
      </AuthSesionProvider>
    </html>
  );
}
