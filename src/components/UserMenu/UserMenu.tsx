import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLogoutMutation, getUserName } from '../../redux/auth';
import { UserName, LogOutButton } from './UserMenu.styled';
import BeatLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';

const UserMenu = () => {
  const userName = useSelector(getUserName);
  const [logOut, { isLoading, isSuccess, isError, error }] = useLogoutMutation();

  useEffect(() => {
    if (isError) {
      console.log(error);

    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success('you have been successfully logged out');
    }
  }, [isSuccess]);

  return (
    <>
      <UserName>{userName}</UserName>
      <LogOutButton disabled={isLoading} onClick={() => logOut()}>
        {isLoading ? (
          <BeatLoader />
        ) : (
          'logout'
        )}
      </LogOutButton>
    </>
  );
};

export default UserMenu;
