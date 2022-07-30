import styled from 'styled-components';

export const UserName = styled.p`
  margin-left: auto;
  margin-right: 15px;
  color: gray;
  text-transform: capitalize;
  font-size: 18px;
`;

export const LogOutButton = styled.button`
  padding: 8px 16px;
  min-width: 120px;
  min-height: 30px;
  border-radius: 4px;
  background: transparent;
  border: 2px solid gray;
  color: gray;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover,
  :focus-visible {
    background-color: gray;
    color: white;
  }
`;
