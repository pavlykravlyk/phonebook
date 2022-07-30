import { ReactNode } from 'react';
import { Wrapper } from './Container.styled';

interface IProps {
  children: ReactNode;
}

const Container = ({ children }: IProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Container;
