"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import LoadingWrapper from "@/components/Wrappers/LoadingWrapper";
import { ProductsProvider } from "@/context/ProductsContext";
import { FilterProvider } from "@/context/FiltersContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <FilterProvider>
        <AuthProvider>
          <ProductsProvider>
            <body className={inter.className}>
              <LoadingWrapper>{children}</LoadingWrapper>
            </body>
          </ProductsProvider>
        </AuthProvider>
      </FilterProvider>
    </html>
  );
}
