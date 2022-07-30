import styled from 'styled-components';

export const ContactList = styled.ul`
  margin-right: auto;
  margin-left: auto;
  padding-left: 0;
  width: 360px;
  list-style: none;
`;

export const ContactItem = styled.li`
  display: flex;
  justify-content: space-between;
  height: 110px;
  border: 2px solid gray;
  border-radius: 4px;
  padding: 15px;
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);

  &:not(:last-child) {
    margin-bottom: 15px;
  }

  &:hover,
  &:focus {
    transform: scale(1.05);
  }
`;

export const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

export const ContactName = styled.p`
  margin-top: 0;
  margin-bottom: 0;
`;

export const ContactNumber = styled.p`
  margin-top: 0;
  margin-bottom: 0;
`;

export const DeleteContactButton = styled.button`
  padding: 5px;
  min-width: 80px;
  min-height: 30px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  text-transform: capitalize;

  &:hover,
  &:focus-visible {
    background-color: gray;
    color: white;
  }
`;

export const EditContactButton = styled.button`
  padding: 5px;
  min-width: 80px;
  min-height: 30px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  text-transform: capitalize;

  &:hover,
  &:focus-visible {
    background-color: gray;
    color: white;
  }
`;

export const ContactMessage = styled.p``;

//////////////////////////////////////////////////

export const EditContactForm = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const EditContactFormList = styled.ul`
  padding-left: 0;
  margin-bottom: 0;
  margin-top: 0;
  list-style: none;
`;

export const EditContactFormItem = styled.li``;

export const EditContactFormLabel = styled.label`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  text-transform: capitalize;
  font-size: 18px;
`;

export const EditContactFormInput = styled.input`
  min-height: 30px;
  margin-top: 5px;
  border: 2px solid gray;
  border-radius: 4px;
  padding-left: 5px;

  &::placeholder {
    font-size: 16px;
    color: lightgray;
  }
`;

export const UpdateContactButton = styled.button`
  padding: 5px;
  min-width: 80px;
  min-height: 30px;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  text-transform: capitalize;

  &:hover,
  &:focus-visible {
    background-color: gray;
    color: white;
  }
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  padding: 4px;
  min-width: 250px;
  min-height: 35px;
  margin-top: 10px;
  border: 2px solid gray;
  border-radius: 4px;

  &::placeholder {
    text-transform: capitalize;
  }
`;
