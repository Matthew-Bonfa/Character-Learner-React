import styled from "styled-components"
import "../index.css"
import { darkColor4 } from "../../constants"

const ContentButton = styled.button`
    border: none;
    background-color: ${darkColor4};
    left: clamp(10px, 2%, 20px);
    font-size: 100%;
    line-height: 0;
    padding-top: 5px;
    transition: all 0.2s ease-in-out;

    &:hover {
        opacity: 75%;
        cursor: pointer;
    }

    &:active {
        transform: translateY(2px);
    }
`

function Content() {
    return (
        <ContentButton>CONTENT</ContentButton>
    )
}

export default Content