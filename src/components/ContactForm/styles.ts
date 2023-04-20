import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 50px 0;
`;

export const ButtonBox = styled.div`
  display:flex;
  width: 100%;
  gap: 10px;

  button{
    width: 100%;
  }
`;

export const AddTitle = styled.h2`
  color: #0077ff;
`;

export const InputFieldWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  label{
    width: 100%;
  }

  input {
    width: 100%;
    margin-right:0;
  }

  & > * {
    margin-bottom: 16px;
    width: 100%;
  }

  @media (min-width: 768px) {
    & > * {
      margin-right: 16px;
      width: calc(50% - 8px);
    }
  }
`;

export const InputField = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:disabled{
    background-color: lightgray;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    border-color: #0077ff;
  }

  @media (min-width: 768px) {
    width: auto;
  }
`;

export const ContactDetailsContainer = styled(FormContainer)`
  & > * {
    margin-bottom: 16px;
  }
`;

export const ContactDetailsButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #0077ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled{
    background-color: gray;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled(ContactDetailsButton)`
  width: 100%;
`;

