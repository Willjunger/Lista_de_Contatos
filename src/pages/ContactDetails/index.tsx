import React from 'react';
import { useParams } from 'react-router-dom';
import ContactForm from '../../components/ContactForm';
import imagePeople from '../../assets/image/people.jpg';
import { Container, ContactName, PhoneNumber, Image, Title } from './styles';

interface Contact {
    [x: string]: any;
    id: string;
    name: string;
    phones: string[];
    avatar: string;
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
}

interface Props {
    contacts: Contact;
}

const ContactDetails: React.FC<Props> = ({ contacts }) => {
    const { id } = useParams<{ id: string }>();

    // Busca o contato pelo id
    const contact = contacts.find((c: { id: string | undefined; }) => c.id === id);

    if (!contact) {
        window.location.replace("/");
    }

    return (
        <Container>
            <Title>Detalhes</Title>
            {contact.avatar ? (
                <Image src={contact.avatar} alt="Avatar" />
            ) : <Image src={imagePeople} alt="Avatar" />}
            <ContactName>Nome: {contact.name}</ContactName>
            <PhoneNumber>Telefone: {contact.phones}</PhoneNumber>
            <ContactForm contact={contact} />
        </Container>
    );
};

export default ContactDetails;
