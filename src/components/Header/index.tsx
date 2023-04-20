import React from 'react';
import { HeaderContainer, Logo, Title } from './styles';

interface HeaderProps {
    logoSrc: string;
    title: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, title }) => {
    return (
        <HeaderContainer>
            <Logo src={logoSrc} alt="Logo" />
            <Title>{title}</Title>
        </HeaderContainer>
    );
};

export default Header;
