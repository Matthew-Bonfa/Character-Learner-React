import React, { useRef } from 'react';
import styled from 'styled-components';
import ContentObject from './ContentObject';
import { ContentType } from './GlobalProvider';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const SectionContainer = styled.section`
    display: flex;
    margin-top: 6rem;
    margin-left: 1rem;
    margin-bottom: 1rem;
    max-width: 100%;
`;

const SectionTitle = styled.h1`
    position: absolute;
    margin-top: -2.75rem;
    font-size: 1.4rem;
    margin-left: 1rem;
    width: fit-content;
    border-radius: 1rem;
    transition: all 0.2s ease-in-out;

    &:hover {
        font-size: 1.5rem;
        cursor: pointer;
    }

    &:active {
        transform: translateY(0.2em);
    }
`;

const ContentBody = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-wrap: nowrap;
        overflow-x: scroll;
    }
`;

interface ContentProps {
  name: string;
  onClick?: () => void;
  sectionContent: ContentType[];
}

function ContentSections({ name, onClick, sectionContent }: ContentProps) {
  const nodeRefs = useRef(new Map<string, React.RefObject<HTMLDivElement | null>>());

  return (
    <SectionContainer>
      <SectionTitle onClick={onClick}>{name}</SectionTitle>
      <ContentBody>
        <TransitionGroup component={null}>
          {sectionContent.map((object) => {
            if (!nodeRefs.current.has(object.name)) {
              nodeRefs.current.set(object.name, React.createRef<HTMLDivElement>());
            }
            const nodeRef = nodeRefs.current.get(object.name)!;

            return (
              <CSSTransition
                key={object.name}
                nodeRef={nodeRef}
                timeout={100}
                classNames="content-object"
              >
                <div ref={nodeRef}>
                  <ContentObject
                    section={name}
                    name={object.name}
                    content={object.content}
                    selected={object.selected}
                    liked={object.liked}
                  />
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </ContentBody>
    </SectionContainer>
  );
}

export default ContentSections;
