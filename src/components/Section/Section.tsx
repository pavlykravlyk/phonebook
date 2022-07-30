import { ReactNode } from "react";
import { Wrapper } from "./Section.styled";

interface SectionProps {
    children: ReactNode;
}

const Section = ({ children} : SectionProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Section;