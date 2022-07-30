import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  border-bottom: 2px solid gray;
`;

export const MainNav = styled.nav``;

export const List = styled.ul`
  display: flex;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
  list-style: none;
`;

export const Item = styled.li`
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

export const Link = styled(NavLink)`
  padding: 10px;
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
  text-transform: capitalize;
  color: gray;

  &.active {
    color: red;
  }
`;
