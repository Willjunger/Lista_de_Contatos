import React from 'react';
import { Link } from 'react-router-dom';
import imagePeople from '../../assets/image/people.jpg';
import { ContactContainer, ContactImage, ContactName, PhoneNumber } from './styles';

interface ContactItemProps {
    contact: {
        id: string;
        name: string;
        phones: string[];
        avatar: string;
    };
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
    return (
        <ContactContainer>
            <Link to={`/details/${contact.id}`}>
                {contact.avatar ? (
                    <ContactImage src={contact.avatar} alt="Avatar" />
                ) : <ContactImage src={imagePeople} alt="Avatar" />}
                <ContactName>Nome: {contact.name}</ContactName>
                <PhoneNumber>Telefone: {contact.phones}</PhoneNumber>
            </Link>
        </ContactContainer>
    );
};

export default ContactItem;
