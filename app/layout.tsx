"use client";

import { Inter } from "next/font/google";
import './globals.css'

import { Provider } from 'react-redux';
import { store } from '../store/store';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
