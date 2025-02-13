import { useState, useEffect } from 'react';
import { useDeleteContactMutation, useUpdateContactMutation } from '../../redux/contact/contact-api';
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
};

interface Contact {
  id: string;
  name: string;
  number: string;
};

interface FormField {
  name: string;
  type: string;
  title: string;
  placeholder: string;
  pattern?: string;
  required?: boolean;
}

const ContactListItem = ({ id, name, number }: ContactListItemProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [contact, setContact] = useState<Contact>({ id, name, number });

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

  const toastMessage = {
    deleted: "is deleted",
    editError: "can't be edited",
    edited: "was successfully updated",
    deleteError: "can't be deleted",
  }

  useEffect(() => {
    if (isDeleted) {
      toast.warn(` ${name} ${toastMessage.deleted}`);
    }
  }, [isDeleted, name]);

  useEffect(() => {
    if (isDeleteError) {
      toast.error(` ${name} ${toastMessage.deleteError}`);
    }
  }, [isDeleteError, name]);

  useEffect(() => {
    if (isEdited) {
      toast.success(` ${name} ${toastMessage.edited}`);
    }
  }, [isEdited]);

  useEffect(() => {
    if (isEditError) {
      toast.error(` ${name} ${toastMessage.editError}`);
    }
  }, [isEditError, name]);

  const renderEditForm = () => (
    <EditContactForm onSubmit={handleFormSubmit}>
      <EditContactFormList>
        {FORM_CONFIG.map((field: FormField) => (
          <EditContactFormItem key={field.name}>
            <EditContactFormInput
              type={field.type}
              title={field.title}
              name={field.name}
              placeholder={field.placeholder}
              pattern={field.pattern}
              required={field.required}
              value={contact[field.name as keyof Contact]}
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
  );

  const renderContactDetails = () => {
    const renderDeleteButtonContent = () => {
      if (isDeleting) {
        return <ThreeDots ariaLabel="three-dots-loading" height={20} width={70} color="gray" />;
      } else {
        return 'delete';
      }
    };

    return (
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
            {renderDeleteButtonContent()}
          </DeleteContactButton>
        </ContactWrapper>
      </>
    );
  };

  return <ContactItem>{isUpdating ? renderEditForm() : renderContactDetails()}</ContactItem>;
};

export default ContactListItem;
