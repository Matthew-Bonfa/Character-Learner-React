import styled from "styled-components";

const IconSVG = styled.svg<{ color?: string, animation?: string }>`
    transform: scale(1.2);
    transition: all 0.2s ease-in-out;
    will-change: transform;
    color: ${({ color }) => color};

    &:hover {
        transform: scale(1.4);
    }

    &:active {
        transform: ${({ animation }) => animation || ""};
    }

`

interface SVGComponentProps {
  SVG?: React.FC<React.SVGProps<SVGSVGElement>>;
  color?: string
  animation?: string
}

const SVGComponent: React.FC<SVGComponentProps> = ({ SVG, color, animation }: SVGComponentProps) => {
  return (
    <IconSVG
      as={SVG}
      color={color}
      animation={animation}
    />
  )
}

export default SVGComponent;
