import styled, { keyframes } from 'styled-components';

interface SuggestionItemProps {
  active?: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  width: 100%;


  @media (max-width: 600px) {
    max-width: 90%;
    padding: 10px;
    margin: 0 auto;
  }
`;

export const InputContainer = styled.div`
position: relative;
  display: flex;
  align-items: center;
  margin-top: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  color:#0077ff;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

export const InitialGroup = styled.h3`
  padding: 10px;
  color: white;
  background-color: #0077ff;
  border-radius: 5px;

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 5px;
  }
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  outline: none;
  width: 100%;

  &:focus {
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 600px) {
    font-size: 14px;
    padding: 8px;
  }
`;

export const SuggestionsContainer = styled.div<{ show: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  opacity: ${({ show }) => (show ? 1 : 0)};
  animation: ${fadeIn} 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
  z-index: 1;

  @media (max-width: 600px) {
    max-height: 150px;
  }
`;

export const SuggestionItem = styled.div<SuggestionItemProps>`
  padding: 10px;
  font-size: 1.2rem;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#f6f6f6' : 'transparent')};
  color: ${({ active }) => (active ? '#333' : '#666')};
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: #f6f6f6;
    color: #333;
  }

  @media (max-width: 768px) {
    padding: 5px;
    font-size: 1rem;
  }
`;


export const ContactDetailsButton = styled.button`
margin-top:20px;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #0077ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
