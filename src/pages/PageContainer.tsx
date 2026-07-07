import NavBar from "../components/NavBar"
import { useState } from "react"
import { PageType } from "../constants"
import MainPage from "./MainPage";
import ContentPage from "./ContentPage";
import { useGlobalContext } from "../components/GlobalProvider";
import SettingsPage from "./SettingsPage";
import { PageContext } from "../App";

function PageContainer() {
  const [currentPage, setCurrentPage] = useState<PageType>("main");

  const pages = {
    main: <MainPage />,
    content: <ContentPage setCurrentPage={setCurrentPage} />,
    popularContent: <></>,
  }

  const {
    userSettings: { settingsMode }
  } = useGlobalContext();

  return (
    <>
      <PageContext.Provider
        value={{ currentPage, setCurrentPage }}
      >
        <NavBar />
      </PageContext.Provider>
      <section>
        {pages[currentPage]}
      </section>
      {settingsMode && (
        <SettingsPage></SettingsPage>
      )}
    </>
  )
}

export default PageContainer;
