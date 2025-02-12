import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAddContactMutation, useGetContactsQuery } from '../../redux/contact/contact-api';
import FORM_CONFIG from './ContactForm.config.json';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import {
  ContactFormTitle,
  ContactForm,
  ContactFormList,
  ContactFormItem,
  ContactFormLabel,
  ContactFormInput,
  AddContactButton,
} from './ContactForm.styled';


const Phonebook = () => {
  const initialState = { name: '', number: '' };
  const [contact, setContact] = useState(initialState);
  const { data: allContacts } = useGetContactsQuery();
  const [addContact, { isError, isLoading: isAdding, isSuccess: isAdded }] =
    useAddContactMutation();

  const handleInputChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) =>
    setContact(state => ({ ...state, [name]: value }));

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    allContacts?.some((item: typeof initialState) => item.name === contact.name)
      ? toast.error(`${contact.name} is already in contacts`)
      : addContact(contact);
  };

  useEffect(() => {
    isAdded && toast.success(`${contact.name} has successfully added`);
    setContact(initialState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdded]);

  useEffect(() => {
    isError && toast.error(`${contact.name} can't be added`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  type ContactName = keyof typeof contact;

  return (
    <>
      <ContactFormTitle>create</ContactFormTitle>

      <ContactForm onSubmit={handleFormSubmit}>
        <ContactFormList>
          {FORM_CONFIG.map(({ type, name: fieldName, placeholder, pattern, title, required }) => (
            <ContactFormItem key={fieldName}>
              <ContactFormLabel>
                {fieldName}
                <ContactFormInput
                  type={type}
                  title={title}
                  name={fieldName}
                  placeholder={placeholder}
                  pattern={pattern}
                  required={required}
                  value={contact[fieldName as ContactName]}
                  onChange={handleInputChange}
                />
              </ContactFormLabel>
            </ContactFormItem>
          ))}
        </ContactFormList>

        <AddContactButton disabled={isAdding}>
          {isAdding ? (
            <ThreeDots ariaLabel="three-dots-loading" height={18} color="gray" />
          ) : (
            'add contact'
          )}
        </AddContactButton>
      </ContactForm>

      {isAdded && <Navigate to="/contacts" />}
    </>
  );
};

export default Phonebook;
