import React, { useState } from 'react';
import { Aside } from './Aside';
import { Header } from './Header';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <Aside isOpen={isOpen} />
      <Header toggle={toggle} isOpen={isOpen} />
    </>
  );
};
