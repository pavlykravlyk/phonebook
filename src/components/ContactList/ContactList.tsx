import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useContacts } from '../../redux/hooks';
import { getFilterValue, setFilter } from '../../redux/contact';
import ContactListItem from './ContactListItem';
import BeatLoader from 'react-spinners/BeatLoader';
import { ContactList, ContactMessage, Label, Input } from './ContactList.styled';
import { AddContactButton } from '../ContactForm/ContactForm.styled';

const ContactsList = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const filter = useAppSelector(getFilterValue);
  const { isLoading, isSuccess, filteredContacts } = useContacts();

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setFilter(value));

  return (
    <>
      {isLoading && <BeatLoader />}

      {filteredContacts?.length === 0 && (
        <AddContactButton type="button" onClick={() => navigate('/create')}>
          create contact
        </AddContactButton>
      )}

      {isSuccess && filteredContacts ? (
        <>
          <Label htmlFor="">
            <Input placeholder="find contacts" type="text" value={filter} onChange={handleChange} />
          </Label>

          <ContactList>
            {filteredContacts.map(contact => (
              <ContactListItem key={contact.id} {...contact} />
            ))}
          </ContactList>
        </>
      ) : (
        <ContactMessage>You haven't any contacts.</ContactMessage>
      )}
    </>
  );
};

export default ContactsList;
