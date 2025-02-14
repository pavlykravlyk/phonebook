import { useState, useEffect } from 'react';
import { useRegisterMutation } from '../../redux/auth';
import REGISTER_FORM_CONFIG from './RegisterForm.config.json';
import { toast } from 'react-toastify';
import BeatLoader from "react-spinners/ClipLoader";
import {
  RegisterTitle,
  RegisterForm,
  RegisterList,
  RegisterItem,
  RegisterLabel,
  RegisterInput,
  RegisterButton,
} from './RegisterForm.styled';

const Register = () => {
  const initiallUser = { name: '', email: '', password: '' }
  const [user, setUser] = useState(initiallUser);
  const [addUser, { isLoading, isSuccess, isError }] = useRegisterMutation();

  const handleInputChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) =>
    setUser(state => ({ ...state, [name]: value }));

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addUser(user);
  };

  useEffect(() => {
    if (isSuccess) {
      setUser(initiallUser);
    }
    if (isError) {
      toast.error(
        'Sorry you must enter a valid name, email and password to sign up',
      );
    }
  }, [isError, isSuccess]);

  return (
    <>
      <RegisterTitle>sign up</RegisterTitle>

      <RegisterForm onSubmit={handleFormSubmit} autoComplete="off">
        <RegisterList>
          {REGISTER_FORM_CONFIG.map(({ name, type, title, required }) => (
            <RegisterItem key={name}>
              <RegisterLabel>
                {name}
                <RegisterInput
                  type={type}
                  name={name}
                  title={title}
                  value={user[name as keyof typeof user]}
                  onChange={handleInputChange}
                  required={required}
                  autoComplete="false"
                />
              </RegisterLabel>
            </RegisterItem>
          ))}
        </RegisterList>

        <RegisterButton disabled={isLoading}>
          {isLoading ? (
            <BeatLoader />
          ) : (
            'sign up'
          )}
        </RegisterButton>
      </RegisterForm>
    </>
  );
};

export default Register;