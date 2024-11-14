import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import QueryProvider from "@/api/queryProvider";
import ProtectedRoute from "@/layouts/protectedLayout/index.tsx";
// import { MultiSelectTheme } from "chakra-multiselect";

const theme = extendTheme({
  components: {
    // MultiSelect: MultiSelectTheme,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        </ChakraProvider>
      </BrowserRouter>
    </QueryProvider>
  </StrictMode>
);
