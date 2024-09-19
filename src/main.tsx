import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from "@/api/queryProvider";
import ProtectedRoute from "@/layouts/protectedLayout/index.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <ChakraProvider>
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        </ChakraProvider>
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>
);
