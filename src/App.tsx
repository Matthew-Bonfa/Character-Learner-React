import { createContext } from "react";
import GlobalProvider from "./components/GlobalProvider";
import { PageType } from "./constants";
import PageContainer from "./pages/PageContainer";

export const PageContext = createContext<{
  currentPage: PageType;
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
} | undefined>(undefined);

function App() {
  return (
    <GlobalProvider>
      <PageContainer />
    </GlobalProvider>
  )
}

export default App;
