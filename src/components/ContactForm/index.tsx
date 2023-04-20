import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    ContactDetailsButton,
    ContactDetailsContainer,
    FormContainer,
    InputField,
    SubmitButton,
    InputFieldWrapper,
    ButtonBox,
    AddTitle
} from "./styles";
import axios from "axios";
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

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

interface FormProps {
    contact?: Contact;
}

const Form: React.FC<FormProps> = ({ contact }) => {
    const location = useLocation();
    const [name, setName] = useState("");
    const [phones, setPhones] = useState<string[]>([]);
    const [avatar, setAvatar] = useState("");
    const [editing, setEditing] = useState(false);
    const [isDetailsPage, setIsDetailsPage] = useState(false);
    const [cep, setCep] = useState("");
    const [street, setStreet] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [homeNumber, setHomeNumber] = useState("");

    const schema = Yup.object().shape({
        name: Yup.string().required('O nome é obrigatório'),
        phones: Yup.array()
            .of(Yup.string().required('O telefone é obrigatório'))
            .min(1, 'Pelo menos um telefone deve ser informado'),
        avatar: Yup.string(),
        cep: Yup.string(),
        street: Yup.string(),
        homeNumber: Yup.string(),
        neighborhood: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
    });

    useEffect(() => {
        if (contact) {
            setName(contact.name);
            setPhones(contact.phones);
            setAvatar(contact.avatar);
            setCep(contact.cep);
            setHomeNumber(contact.homeNumber);
            setStreet(contact.street);
            setNeighborhood(contact.neighborhood);
            setCity(contact.city);
            setState(contact.state);
        }

        if (location.pathname.includes("/details")) {
            setIsDetailsPage(true);

            const storedContacts: Contact[] = JSON.parse(
                localStorage.getItem("contacts") || "[]"
            );
            const storedContact = storedContacts.find((c) => c.id === contact?.id);

            if (storedContact) {
                setName(storedContact.name);
                setPhones(storedContact.phones);
                setAvatar(storedContact.avatar);
                setName(storedContact.name);
                setAvatar(storedContact.avatar);
                setHomeNumber(storedContact.homeNumber);
                setCep(storedContact.cep);
                setStreet(storedContact.street);
                setNeighborhood(storedContact.neighborhood);
                setCity(storedContact.city);
                setState(storedContact.state);
                setEditing(false);
            }
        }
    }, [contact, location.pathname]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Armazena os contatos no localStorage
        const contacts: Contact[] = JSON.parse(
            localStorage.getItem("contacts") || "[]"
        );
        const newContact: Contact = {
            name,
            phones,
            avatar,
            cep,
            street,
            neighborhood,
            city,
            state,
            id: Math.random().toString(36).substr(2, 9),
            homeNumber,
        };

        try {
            await schema.validate(newContact);

            const updatedContacts = contacts.length > 0 ? [...contacts, newContact] : [newContact];
            localStorage.setItem("contacts", JSON.stringify(updatedContacts));

            setName("");
            setPhones(['']);
            setAvatar("");
            setCep("");
            setStreet("");
            setNeighborhood("");
            setHomeNumber("");
            setCity("");
            setState("");
            toast.success('Usuário adicionado com sucesso!', { duration: 5000 })
            setTimeout(() => {
                window.location.replace("/");
            }, 4000);
        } catch (error) {
            toast.error('Existem campos vazios!', { duration: 5000 });
        }
    };

    const handleEdit = () => {
        setEditing(true);
    };

    const handleSave = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Busca informações de endereço pelo CEP
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        // Atualiza contato no localStorage
        const contacts: Contact[] = JSON.parse(localStorage.getItem("contacts") || "[]");

        const updatedContacts = contacts.map((c) => {
            if (c.id === contact?.id) {
                return {
                    ...c,
                    name,
                    phones,
                    avatar,
                    cep,
                    street: data.logradouro,
                    neighborhood: data.bairro,
                    city: data.localidade,
                    state: data.uf,
                    homeNumber
                };
            }
            return c;
        });

        localStorage.setItem("contacts", JSON.stringify(updatedContacts));

        setEditing(true);
        setName("");
        setPhones(['']);
        setAvatar("");
        setCep("");
        setStreet("");
        setNeighborhood("");
        setHomeNumber("");
        setCity("");
        setState("");

        toast.success('Usuário editado com sucesso!', { duration: 4000 })
        setTimeout(() => {
            window.location.replace("/");
        }, 2000);
    };

    const handleDelete = () => {
        const contacts: Contact[] = JSON.parse(
            localStorage.getItem("contacts") || "[]"
        );
        const updatedContacts = contacts.filter((c) => c.id !== contact?.id);
        console.log(updatedContacts)
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
        toast.success('Usuário deletado com sucesso!', { duration: 3000 });
        setTimeout(() => {
            window.location.replace("/");
        }, 4000);
    };

    const handleCepSearch = async () => {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                setStreet(data.logradouro);
                setNeighborhood(data.bairro);
                setCity(data.localidade);
                setState(data.uf);
            } else {
                toast.error('CEP não encontrado!', { duration: 5000 })
            }
        } catch (error) {
            toast.error('Erro ao tentar buscar o cep digitado!', { duration: 5000 })
        }
    };

    const handlePhoneChange = (index: number, phone: string) => {
        setPhones((prevPhones) => {
            const newPhones = [...prevPhones];
            newPhones[index] = phone;
            return newPhones;
        });
    };

    const handleAddphone = () => {
        setPhones((prevPhones) => [...prevPhones, '']);
    };

    const handleImageChange = (e: { target: { files: any[]; }; }) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatar(event.target.result);
                localStorage.setItem("avatar", event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (location.pathname === "/new-contact") {
        return (
            <FormContainer onSubmit={handleSubmit}>
                <Toaster position="top-right" />
                <AddTitle>Adicione um novo contato</AddTitle>
                <InputFieldWrapper>
                    <label>Nome</label>
                    <InputField
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </InputFieldWrapper>
                {phones.map((phone, index) => (
                    <InputFieldWrapper>
                        <label>Telefone {index + 1}</label>
                        <InputField
                            key={index}
                            type="tel"
                            placeholder={`Telefone ${index + 1}`}
                            value={phone}
                            onChange={(e) => handlePhoneChange(index, e.target.value)}
                            required
                        />
                    </InputFieldWrapper>
                ))}
                <ContactDetailsButton type="button" onClick={handleAddphone}>
                    Adicionar Telefone
                </ContactDetailsButton>
                <InputFieldWrapper>
                    <label>Adicionar imagem</label>
                    {avatar && <img src={avatar} alt="Avatar preview" />}
                    <InputField
                        type="file"
                        id="avatar"
                        onChange={handleImageChange}
                        accept="image/*"
                    />
                </InputFieldWrapper>
                <InputFieldWrapper>
                    <label>CEP</label>
                    <InputField
                        type="text"
                        name="cep"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        placeholder="CEP"
                    />
                </InputFieldWrapper>
                <ContactDetailsButton type="button" onClick={handleCepSearch}>
                    Buscar CEP
                </ContactDetailsButton>
                <InputFieldWrapper>
                    <label>Rua</label>
                    <InputField
                        type="text"
                        name="street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Rua"
                    />
                </InputFieldWrapper>
                <InputFieldWrapper>
                    <label>Número</label>
                    <InputField
                        type="text"
                        name="number"
                        value={homeNumber}
                        onChange={(e) => setHomeNumber(e.target.value)}
                        placeholder="Número"
                    />
                </InputFieldWrapper>
                <InputFieldWrapper>
                    <label>Bairro</label>
                    <InputField
                        type="text"
                        name="neighborhood"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder="Bairro"
                    />
                </InputFieldWrapper>
                <InputFieldWrapper>
                    <label>Cidade</label>
                    <InputField
                        type="text"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Cidade"
                    />
                </InputFieldWrapper>
                <InputFieldWrapper>
                    <label>UF</label>
                    <InputField
                        type="text"
                        name="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Estado"
                    />
                </InputFieldWrapper>
                <SubmitButton type="submit">Adicionar</SubmitButton>
            </FormContainer>
        );
    }

    if (isDetailsPage && contact) {
        return (
            <ContactDetailsContainer>
                <Toaster position="top-right" />
                <ButtonBox>
                    <ContactDetailsButton onClick={handleDelete}>
                        Excluir
                    </ContactDetailsButton>
                    {!editing && (
                        <ContactDetailsButton onClick={handleEdit}>
                            Editar
                        </ContactDetailsButton>
                    )}
                    {editing && (
                        <ContactDetailsButton onClick={handleSave}>
                            Salvar
                        </ContactDetailsButton>
                    )}
                </ButtonBox>

                <InputFieldWrapper>
                    <label>Nome</label>
                    <InputField
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={!editing}
                    />
                </InputFieldWrapper>

                {phones.map((phone, index) => (
                    <InputFieldWrapper>
                        <label>Telefone {index + 1}</label>
                        <InputField
                            key={index}
                            type="tel"
                            placeholder={`Telefone ${index + 1}`}
                            value={phone}
                            onChange={(e) => handlePhoneChange(index, e.target.value)}
                            required
                            disabled={!editing}
                        />
                    </InputFieldWrapper>
                ))}

                <ContactDetailsButton type="button" onClick={handleAddphone} disabled={!editing}>
                    Adicionar Telefone
                </ContactDetailsButton>

                <InputFieldWrapper>
                    <label>Adicionar imagem</label>
                    {avatar && <img src={avatar} alt="Avatar preview" />}
                    <InputField
                        type="file"
                        id="avatar"
                        onChange={handleImageChange}
                        accept="image/*"
                        disabled={!editing}
                    />
                </InputFieldWrapper>

                <InputFieldWrapper>
                    <label>CEP</label>
                    <InputField
                        type="text"
                        name="cep"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        placeholder="CEP"
                        disabled={!editing}
                    />

                </InputFieldWrapper>
                <ContactDetailsButton type="button" onClick={handleCepSearch} disabled={!editing}>
                    Buscar CEP
                </ContactDetailsButton>

                <InputFieldWrapper>
                    <label>Rua</label>
                    <InputField
                        type="text"
                        name="street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Rua"
                        disabled={!editing}
                    />
                </InputFieldWrapper>
                <InputFieldWrapper>
                    <label>Número</label>
                    <InputField
                        type="text"
                        name="number"
                        value={homeNumber}
                        onChange={(e) => setHomeNumber(e.target.value)}
                        placeholder="Número"
                        disabled={!editing}
                    />
                </InputFieldWrapper>
                <InputFieldWrapper>
                    <label>Bairro</label>
                    <InputField
                        type="text"
                        name="neighborhood"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder="Bairro"
                        disabled={!editing}
                    />
                </InputFieldWrapper>

                <InputFieldWrapper>
                    <label>Cidade</label>
                    <InputField
                        type="text"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Cidade"
                        disabled={!editing}
                    />
                </InputFieldWrapper>
                <InputFieldWrapper>
                    <label>UF</label>
                    <InputField
                        type="text"
                        name="state"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Estado"
                        disabled={!editing}
                    />
                </InputFieldWrapper>
                <ButtonBox>
                    <ContactDetailsButton onClick={handleSave} disabled={!editing}>
                        Salvar
                    </ContactDetailsButton>
                </ButtonBox>
            </ContactDetailsContainer>
        );
    }

    return (
        <div>
            <h1>404 - Página não encontrada</h1>
            <Link to="/">Voltar para a lista de contatos</Link>
        </div>
    );
};

export default Form;
