import { QueryClientProvider } from "@tanstack/react-query";
import FormFlow from "./page/FormFlow";
import { AppProvider } from "./context/AppContext";
import { queryClient } from "./queryClient";


function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <FormFlow />
        </AppProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
