import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ContactList from './pages/ContactList';
import ContactDetails from './pages/ContactDetails';
import logo from './assets/image/logo-v.png';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactForm from './components/ContactForm';

const Container = styled.div`
  list-style: none;
  padding: 10px;
  max-width: 800px;
  margin: 0 auto;
`;

interface Contact {
  id: string;
  name: string;
  phones: string[];
  avatar: string;
  cep: string;
  street: string;
  homeNumber: string;
  neighborhood: string;
  city: string;
  state: string;
}

interface Props {
  contacts?: Contact[];
}

const App: React.FC<Props> = () => {
  const getStoredContacts = (): Contact[] => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      return JSON.parse(storedContacts);
    } else {
      return [];
    }
  }

  const [contacts, setContacts] = useState<Contact[]>(getStoredContacts());

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    setContacts(savedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <Router>
      <Header logoSrc={logo} title="Lista de Contatos" />
      <Container>
        <Routes>
          <Route path="/" element={<ContactList contacts={contacts} />} />
          <Route path="/details/:id" element={<ContactDetails contacts={contacts} />} />
          <Route path="/new-contact" element={<ContactForm />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
