"use client";

import QueryProvider from "../../../utils/QueryProvider";

export function Providers({ children }) {
  return (
   
      <QueryProvider>{children}</QueryProvider>
    
  );
}
