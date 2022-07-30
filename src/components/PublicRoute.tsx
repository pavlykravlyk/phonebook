import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { getIsLoggedIn } from 'redux/auth';

interface PublicRouteProps {

  restricted?: boolean;
}

const PublicRoute = ({ restricted = false }: PublicRouteProps) => {
  const isLoggedIn = useAppSelector(getIsLoggedIn);

  if (restricted && isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
