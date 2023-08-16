"use client";

import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { usePathname } from "next/navigation";
import React from "react";

import styles from "./page.module.css";

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.dashboardContainer}>
      <NavBar />
      <div className={styles.itemsContainer}>
        {!pathname.includes("products") && (
          <div className={styles.blackBackground} />
        )}
        {children}
      </div>
      <Footer />
    </div>
  );
}
