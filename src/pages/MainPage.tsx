import styled from "styled-components";
import Question from "../components/Question";
import TextInput from "../components/TextInput";
import { useGlobalContext } from "../components/GlobalProvider";
import { useEffect, useMemo, useState } from "react";
import { generateNum, useToggleState } from "../utils";

const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: calc(100vh - 4rem);
	margin: 4rem 0 0 0;
	overflow: auto;
`;

const Answer = styled.h2`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 2rem;
	width: 100%;
	line-height: 2rem;
	min-height: 3rem;
	margin: 0;
`;

function MainPage() {
  const {
    userContent,
    userSettings: { enableRomaji, writeMode, orderMode },
  } = useGlobalContext();

  const [index, setIndex] = useState<number | undefined>(undefined);
  const [sessionIndexes, setSessionIndexes] = useState<number[]>([]);
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const [showAnswer, toggleShowAnswer] = useToggleState(false);
  const [triggerAnimation, setTriggerAnimation] = useState<
    "left" | "right" | null
  >(null);

  const sessionContent = useMemo(() => {
    return userContent.reduce((acc: any[], content: any) => {
      if (content.selected) {
        return acc.concat(content.content);
      }
      return acc;
    }, []);
  }, [userContent]);

  // initialize first index(es)
  useEffect(() => {
    if (sessionContent.length > 0 && index === undefined) {
      if (orderMode === "Random") {
        const firstNum = generateNum(undefined, sessionContent.length);
        const secondNum = generateNum(firstNum, sessionContent.length);
        setSessionIndexes([firstNum, secondNum]);
        setIndex(0);
      } else if (orderMode === "Shuffle") {
        const allIndexes = Array.from(
          { length: sessionContent.length },
          (_, i) => i
        );
        // get first two from shuffled sequence
        const firstNum = generateNum(allIndexes);
        const secondNum = generateNum(allIndexes);
        setSessionIndexes([firstNum, secondNum]);
        setIndex(0);
      }
    }
  }, [orderMode, sessionContent.length]);

  // validate user input
  useEffect(() => {
    if (index !== undefined) {
      const answerRaw = String(
        sessionContent[sessionIndexes[index]][
        (writeMode === "Kana" || writeMode === "Kanji") && enableRomaji
          ? "Romaji"
          : writeMode
        ]
      );

      const cleanText = (text: string) =>
        text
          .replace(/\(.*?\)|\[.*?\]|\{.*?\}|<.*?>/g, "")
          .replace(/[^\p{L}\p{N}\s]/gu, "")
          .replace(/\s+/g, " ")
          .trim()
          .toLowerCase();

      const validAnswers = answerRaw
        .split(";")
        .map((w: string) => cleanText(w));
      const userInputClean = cleanText(String(inputValue));

      if (validAnswers.includes(userInputClean)) {
        setInputValue("");
        setTriggerAnimation("right");
      }
    }
  }, [inputValue]);

  const handleAnimationComplete = () => {
    if (index !== undefined) {
      if (triggerAnimation === "right") {
        const nextIndex = index + 1;

        if (orderMode === "Random") {
          const nextNum = generateNum(
            sessionIndexes[index + 1] ?? sessionIndexes[index],
            sessionContent.length
          );
          setSessionIndexes([...sessionIndexes, nextNum]);
        } else if (orderMode === "Shuffle") {
          const allIndexes = Array.from(
            { length: sessionContent.length },
            (_, i) => i
          );
          const nextNum = generateNum(allIndexes);
          setSessionIndexes([...sessionIndexes, nextNum]);
        }

        setIndex(nextIndex);
        setTriggerAnimation(null);
      } else if (triggerAnimation === "left") {
        if (index === 0) return;
        setIndex(index - 1);
        setTriggerAnimation(null);
      }
    }
  };

  return (
    <MainContainer>
      {sessionContent.length > 0 && index !== undefined && (
        <>
          <Question
            content={sessionContent}
            index={index}
            sessionIndexes={sessionIndexes}
            triggerAnimation={triggerAnimation}
            setTriggerAnimation={setTriggerAnimation}
            onAnimationComplete={handleAnimationComplete}
          />
          <Answer>
            {showAnswer && index !== undefined
              ? `${sessionContent[sessionIndexes[index]].English}  ${sessionContent[sessionIndexes[index]].Kana
              }`
              : ""}
          </Answer>
          <TextInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            showAnswer={showAnswer}
            toggleShowAnswer={toggleShowAnswer}
          />
        </>
      )}
    </MainContainer>
  );
}

export default MainPage;
