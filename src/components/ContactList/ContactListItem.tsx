import { useState, useEffect } from 'react';
import { useDeleteContactMutation, useUpdateContactMutation } from 'redux/contact/contact-api';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import FORM_CONFIG from '../ContactForm/ContactForm.config.json';
import {
  ContactItem,
  ContactWrapper,
  ContactName,
  ContactNumber,
  DeleteContactButton,
  EditContactButton,
  EditContactForm,
  EditContactFormList,
  EditContactFormItem,
  EditContactFormInput,
  UpdateContactButton,
} from './ContactList.styled';

interface ContactListItemProps {
  id: string;
  name: string;
  number: string;
}

const ContactListItem = ({ id, name, number }: ContactListItemProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [contact, setContact] = useState({ id, name, number });

  const [deleteContact, { isError: isDeleteError, isLoading: isDeleting, isSuccess: isDeleted }] =
    useDeleteContactMutation();

  const [editContact, { isError: isEditError, isLoading: isEditing, isSuccess: isEdited }] =
    useUpdateContactMutation();

  const handleInputChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setContact(state => ({
      ...state,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    editContact(contact);
    setIsUpdating(false);
  };

  useEffect(() => {
    isDeleted && toast.warn(` ${name} is deleted`);
  }, [isDeleted, name]);

  useEffect(() => {
    isDeleteError && toast.error(` ${name} can't be deleted`);
  }, [isDeleteError, name]);

  useEffect(() => {
    isEdited && toast.success(` ${name} was successfully updated`);
  }, [isEdited, name]);

  useEffect(() => {
    isEditError && toast.error(` ${name} can't be edited`);
  }, [isEditError, name]);

  return (
    <ContactItem>
      {isUpdating ? (
        <EditContactForm onSubmit={handleFormSubmit}>
          <EditContactFormList>
            {FORM_CONFIG.map(field => (
              <EditContactFormItem key={field.name}>
                <EditContactFormInput
                  type={field.type}
                  title={field.title}
                  name={field.name}
                  placeholder={field.placeholder}
                  pattern={field.pattern}
                  required={field.required}
                  value={contact[field.name as keyof typeof contact] }
                  onChange={handleInputChange}
                />
              </EditContactFormItem>
            ))}
          </EditContactFormList>
          <ContactWrapper>
            <UpdateContactButton
              type="button"
              disabled={isEditing}
              onClick={() => setIsUpdating(false)}
            >
              cancel
            </UpdateContactButton>
            <UpdateContactButton disabled={isEditing}>save</UpdateContactButton>
          </ContactWrapper>
        </EditContactForm>
      ) : (
        <>
          <ContactWrapper>
            <ContactName>{name}</ContactName>
            <ContactNumber>{number}</ContactNumber>
          </ContactWrapper>
          <ContactWrapper>
            <EditContactButton
              type="button"
              disabled={isDeleting}
              onClick={() => setIsUpdating(true)}
            >
              edit
            </EditContactButton>
            <DeleteContactButton disabled={isDeleting} onClick={() => deleteContact(id)}>
              {isDeleting ? (
                <ThreeDots ariaLabel="three-dots-loading" height={20} width={70} color="gray" />
              ) : (
                'delete'
              )}
            </DeleteContactButton>
          </ContactWrapper>
        </>
      )}
    </ContactItem>
  );
};

export default ContactListItem;
