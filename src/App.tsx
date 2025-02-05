import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getIsRefreshing } from 'redux/auth';
import { useAppSelector, useAuth } from 'redux/hooks';
import { ToastContainer } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {
  PrivateRoute,
  PublicRoute,
  Container,
  Section,
  Navigation,
  Phonebook,
  ContactList,
  Home,
  LoginForm,
  RegisterForm,
  NotFound,
} from './components';

const App = () => {
  const isRefreshing = useAppSelector(getIsRefreshing);

  useAuth()

  return (
    <div className="App">
      <Container>
        {isRefreshing ? (
          <ThreeDots color="gray" height={200} width={200} />
        ) : (
          <>
            <Navigation />

            <Suspense fallback={<ThreeDots color="gray" height={100} width={100} />}>
              <Section>
                <Routes>
                  <Route path="/" element={<PublicRoute />}>
                    <Route index element={<Home />} />
                  </Route>

                  <Route path="/" element={<PublicRoute restricted />}>
                    <Route path="login" element={<LoginForm />} />
                    <Route path="register" element={<RegisterForm />} />
                  </Route>

                  <Route path="/contacts" element={<PrivateRoute />}>
                    <Route index element={<ContactList />} />
                  </Route>

                  <Route path="/create" element={<PrivateRoute />}>
                    <Route index element={<Phonebook />} />
                  </Route>
                    
                  <Route path="*" element={<NotFound/>}></Route>
                </Routes>
              </Section>
            </Suspense>
          </>
        )}
      </Container>

      <ToastContainer autoClose={5000} />
    </div>
  );
};

export default App;
