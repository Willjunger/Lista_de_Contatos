import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactItem from '../../components/ContactItem';
import { Container, InputContainer, Input, SuggestionsContainer, SuggestionItem, ContactDetailsButton, InitialGroup, Title } from './styles';

interface Contact {
    id: string;
    name: string;
    phones: string[];
    avatar: string;
}

interface Props {
    contacts: Contact[];
}

const ContactsList: React.FC<Props> = ({ contacts }) => {
    const [searchValue, setSearchValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);

    // Verifica se há algum contato filtrado para mostrar na lista
    const hasFilteredContacts = filteredContacts.length > 0;

    // Atualiza o estado do input de busca sempre que houver mudanças
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        // Filtra os contatos de acordo com o valor da busca
        const filtered = contacts.filter((contact) =>
            contact.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredContacts(filtered);
        setShowSuggestions(true);
    };

    // Agrupa os contatos por letra inicial do nome e ordena os grupos em ordem alfabética
    const groupedContacts = filteredContacts.reduce((acc, contact) => {
        const initial = contact.name.charAt(0).toUpperCase();
        acc[initial] = acc[initial] || [];
        acc[initial].push(contact);
        return acc;
    }, {} as { [initial: string]: Contact[] });

    const sortedKeys = Object.keys(groupedContacts).sort();

    return (
        <Container>
            <Title>Contatos</Title>
            <InputContainer>
                <Input
                    type="text"
                    placeholder="Pesquisar contatos"
                    value={searchValue}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />

                {showSuggestions && (
                    <SuggestionsContainer show={hasFilteredContacts}>
                        {searchValue.length > 0 &&
                            filteredContacts.map((contact) => (
                                <SuggestionItem key={contact.id}>
                                    <Link to={`/details/${contact.id}`}>
                                        <h3>{contact.name}</h3>
                                    </Link>
                                </SuggestionItem>
                            ))}
                    </SuggestionsContainer>
                )}
            </InputContainer>

            <Link to="/new-contact">
                <ContactDetailsButton>Adicionar Novo Contato</ContactDetailsButton>
            </Link>

            {sortedKeys.map((initial) => (
                <div key={initial}>
                    <InitialGroup>{initial}</InitialGroup>
                    {groupedContacts[initial].map((contact) => (
                        <ContactItem key={contact.id} contact={contact} />
                    ))}
                </div>
            ))}
        </Container>
    );
};

export default ContactsList;
