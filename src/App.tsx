import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getIsRefreshing } from './redux/auth';
import { useAppSelector, useAuth } from './redux/hooks';
import { ToastContainer } from 'react-toastify';
import BeatLoader from "react-spinners/ClipLoader";
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
          <BeatLoader />
        ) : (
          <>
            <Navigation />

            <Suspense fallback={<BeatLoader />}>
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

                  <Route path="*" element={<NotFound />}></Route>
                </Routes>
              </Section>
            </Suspense>
          </>
        )}
      </Container>

      <ToastContainer autoClose={3500} />
    </div>
  );
};

export default App;
