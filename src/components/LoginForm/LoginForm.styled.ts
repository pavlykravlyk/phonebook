import styled from 'styled-components';

export const LoginFormTitle = styled.h1`
  color: black;
  text-transform: capitalize;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  border: 2px solid gray;
  border-radius: 4px;
  padding: 20px;
  width: fit-content;
`;

export const LoginFormList = styled.ul`
  padding-left: 0;
  margin-bottom: 0;
  margin-top: 0;
  list-style: none;
`;

export const LoginFormItem = styled.li`
  margin-bottom: 15px;
`;

export const LoginFormLabel = styled.label`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  text-transform: capitalize;
  font-size: 18px;
`;

export const LoginFormInput = styled.input`
  min-width: 300px;
  min-height: 30px;
  margin-top: 5px;
  border: 2px solid gray;
  border-radius: 4px;
  padding-left: 5px;
`;

export const LoginButton = styled.button`
  margin-left: auto;
  margin-right: auto;
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
