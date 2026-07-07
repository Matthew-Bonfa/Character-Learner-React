import styled from "styled-components";

const MessageBackground = styled.div`
    position: absolute;
    background-color: #00000020;
    height: 100vh;
    width: 100vw;
    z-index: 3;     
    top: 0;
    backdrop-filter: blur(0.1em);
`

const MessageContainer = styled.div`
    position: absolute;
    display: flex;
    width: 27rem;
    height: 15rem;
    background-color: ${({ theme }) => theme.color.third};
    justify-content: center;
    border-radius: 2rem;
    text-align: center;
    padding: 1rem;
    overflow: hidden;
    left: calc(50vw - 13.5rem);
    top: calc(50vh - 10rem);
    box-shadow: 0 0.4rem 0.5rem ${({ theme }) => theme.shadow.third[80]};
`
const MessageTitle = styled.h1`
    font-size: 2.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0;
    
`
const MessageBody = styled.p`
    width: 100%;
    height: 40%;
    font-size: 1.5rem;
    margin-top: 1rem;
    background-color: blue;
    text-align: center;
    inline-size: 90%;
    margin: 0.5rem auto;
    overflow-wrap: break-word;
    word-wrap: break-word;
`

const ButtonContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row-reverse;
    bottom: 1rem;
    right: 0;
    width: 100%;
    height: fit-content;
`

const MessageButton = styled.button`
    margin-right: 1.5rem;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 0.3rem;
    border: none;
    background-color: ${({ theme }) => theme.color.first};
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: ${({ theme }) => theme.shadow.text[30]};
    }

    &:active {
        transform: translateY(0.2em);
    }
    
`

interface AlertMessageProps {
  title: string
  message: string
  onConfirm?: () => void
}

function AlertMessage({ title, message, onConfirm }: AlertMessageProps) {
  return (
    <MessageBackground>
      <MessageContainer>
        <section>
          <MessageTitle>{title}</MessageTitle>

          <MessageBody>{message}</MessageBody>

          <ButtonContainer>
            <MessageButton
              onClick={onConfirm}
            >
              CONFIRM
            </MessageButton>

            <MessageButton>CANCEL</MessageButton>
          </ButtonContainer>
        </section>
      </MessageContainer>
    </MessageBackground>
  )
}

export default AlertMessage;
