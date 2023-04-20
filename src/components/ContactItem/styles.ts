
import styled from 'styled-components';

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  padding: 10px;
  background-color: #fff;
  border: 1px solid  #0077ff;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  transition: all 0.3s ease-in-out;

  a {
    width: 100%;    
  }

  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    background-color: whitesmoke;
    opacity: 0.8;
  }
`;

export const ContactImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ContactName = styled.h3`
  margin: 0;
  color: #0077ff;
`;

export const Title = styled.h2`
    color: #0077ff;
`;

export const PhoneNumber = styled.p`
  margin: 0;
  color: #0077ff;
`;
