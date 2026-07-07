import styled from "styled-components";
import ContentSections from "../components/ContentSections";
import { PageType } from "../constants";
import React from "react";
import { parseCSV } from "../utils";
import { ContentType, useGlobalContext } from "../components/GlobalProvider";

const ContentContainer = styled.div`
    position: absolute; 
    width: 100%;
    top: 4.5em;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    color: ${({ theme }) => theme.color.text};
`

const FileInputContainer = styled.div`
    position: absolute;
    display: flex;
    height: 3.5em;
    width: 3.5em;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.third};
    align-items: center;
    justify-content: center;
    right: 1em;
    top: 1em;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 0.5rem 1rem ${({ theme }) => theme.shadow.third[80]};
    color: ${({ theme }) => theme.color.text};

    span {
        aspect-ratio: 1;
        height: 2em;
        width: 2em;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;   
        transition: all 0.2s ease-in-out;
    }

    span:hover {
        font-size: 2.5rem;   
    }

    &:hover {
        background-color: ${({ theme }) => theme.shadow.text[15]};
    }

    &:active {
        box-shadow: 0 0rem 1rem ${({ theme }) => theme.shadow.third[80]};
        transform: translateY(0.15em);
    }
`

const HiddenFileInput = styled.input.attrs({ type: "file" })`
    display: none;
`

interface ContentProps {
  setCurrentPage: (currentPage: PageType) => void;
}

function ContentPage({ setCurrentPage }: ContentProps) {
  const {
    userContent,
    globalFunctions: {
      addContent,
      sortContent
    }
  } = useGlobalContext();

  const handleAddFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    for (let file of files) {
      try {
        const parsed = await parseCSV(file);
        addContent({
          name: file.name.slice(0, -4),
          content: parsed,
          selected: false,
          liked: false
        });
      }
      catch (error) {
        console.error(error);
      }
    }
    sortContent((a: ContentType, b: ContentType) => a.name.localeCompare(b.name));
  };

  return (
    <ContentContainer>
      <FileInputContainer>
        <label
          htmlFor="file-upload"
        >
          <span>
            +
          </span>
        </label>
        <HiddenFileInput
          id="file-upload"
          accept=".csv"
          multiple
          onChange={handleAddFile}
        />
      </FileInputContainer>

      <ContentSections
        name="FAVOURITES"
        sectionContent={userContent.filter(content => content.liked === true)}
      />
      <ContentSections
        name="MY CONTENT"
        sectionContent={userContent}
      />
      <ContentSections
        name="POPULAR CONTENT"
        onClick={() => setCurrentPage("popularContent")}
        sectionContent={[]}
      />
    </ContentContainer>
  )
}

export default ContentPage;
