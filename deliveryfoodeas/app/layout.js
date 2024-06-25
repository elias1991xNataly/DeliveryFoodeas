import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import Header from "../app/_components/Header";
const inter = Inter({ subsets: ["latin"] });
import Provider from "../app/Provider";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

      <html lang="en">
        <body className={inter.className}>

          <SignedOut>
            <SignInButton />
          </SignedOut>


          <SignedIn>

          </SignedIn>

          <Provider >{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
