import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Authprovider from "@/layouts/protectedLayout/authInitilizer";
type QueryClientProps = {
    children: React.ReactNode;
};
function QueryProvider({ children }: QueryClientProps) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Authprovider />
        </QueryClientProvider>
    );
}

export default QueryProvider;
