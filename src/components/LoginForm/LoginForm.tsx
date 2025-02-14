import { useState, useEffect } from 'react';
import { useLoginMutation } from '../../redux/auth';
import LOGIN_FORM_CONFIG from './LoginForm.config.json';
import BeatLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';
import {
  LoginFormTitle,
  LoginForm,
  LoginFormList,
  LoginFormItem,
  LoginFormLabel,
  LoginFormInput,
  LoginButton,
} from './LoginForm.styled';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [logIn, { isLoading, isSuccess, isError }] = useLoginMutation();

  const handleInputChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) =>
    setUser(state => ({ ...state, [name]: value }));

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    logIn(user);
  };

  useEffect(() => {
    if (isSuccess) {
      setUser({ email: '', password: '' });
    }
    if (isError) {
      toast.error('Your login attempt was not successful. Please try again');
    }
  }, [isError, isSuccess]);

  return (
    <>
      <LoginFormTitle>login</LoginFormTitle>

      <LoginForm onSubmit={handleFormSubmit} autoComplete="off">
        <LoginFormList>
          {LOGIN_FORM_CONFIG.map(({ name, type, title, required }) => (
            <LoginFormItem key={name}>
              <LoginFormLabel>
                {name}
                <LoginFormInput
                  type={type}
                  name={name}
                  title={title}
                  value={user[name as keyof typeof user]}
                  onChange={handleInputChange}
                  required={required}
                  autoComplete="false"
                />
              </LoginFormLabel>
            </LoginFormItem>
          ))}
        </LoginFormList>

        <LoginButton disabled={isLoading}>
          {isLoading ? (
            <BeatLoader />
          ) : (
            'login'
          )}
        </LoginButton>
      </LoginForm>
    </>
  );
};

export default Login;