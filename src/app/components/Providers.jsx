"use client";

import QueryProvider from "../../../utils/QueryProvider";
import { Toaster } from "react-hot-toast";

export function Providers({ children }) {
  return (
    <QueryProvider>
      {children}
      <Toaster position="top-center" />
    </QueryProvider>
  );
}
