import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import {
  useAddContactMutation, useGetContactsQuery

} from '../../redux/contact/contact-api';
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

    if (allContacts?.some((item: typeof initialState) => {
      return item.name === contact.name;
    })) {
      toast.error(`${contact.name} is already in contacts`);
    } else {
      addContact(contact);
    }
  };

  useEffect(() => {
    if (isAdded) {
      toast.success(`${contact.name} has successfully added`);
    }
    setContact(initialState);
  }, [isAdded]);

  useEffect(() => {
    if (isError) {
      toast.error(`${contact.name} can't be added`);
    }
  }, [isError]);

  const renderNavigateToContacts = () => {
    if (isAdded) {
      return <Navigate to="/contacts" />;
    }
  };

  const renderButtonContent = () => {
    if (isAdding) {
      return <ThreeDots ariaLabel="three-dots-loading" height={18} color="gray" />;
    }
    return 'add contact';
  }

  const renderFormList = () => {
    return FORM_CONFIG.map(({ type, name: fieldName, placeholder, pattern, title, required }) => (
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
            value={contact[fieldName as keyof typeof contact]}
            onChange={handleInputChange}
          />
        </ContactFormLabel>
      </ContactFormItem>
    ));
  }

  return (
    <>
      <ContactFormTitle>create</ContactFormTitle>
      <ContactForm onSubmit={handleFormSubmit}>
        <ContactFormList>
          {renderFormList()}
        </ContactFormList>
        <AddContactButton disabled={isAdding}>
          {renderButtonContent()}
        </AddContactButton>
      </ContactForm>
      {renderNavigateToContacts()}
    </>
  );
};

export default Phonebook;
