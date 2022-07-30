import { lazy } from 'react';

import Container from './Container';
import Navigation from './Navigation';
import Section from './Section';
import UserMenu from './UserMenu';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Phonebook = lazy(() => import('./ContactForm'));
const ContactList = lazy(() => import('./ContactList'));
const LoginForm = lazy(() => import('./LoginForm'));
const RegisterForm = lazy(() => import('./RegisterForm'));
const Home = lazy(() => import('./Home'));

export {
  Phonebook,
  ContactList,
  Home,
  LoginForm,
  RegisterForm,
  Container,
  Navigation,
  Section,
  UserMenu,
  PrivateRoute,
  PublicRoute,
};
