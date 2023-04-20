import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border:1px solid black;
  border-radius: 5px;
  padding:20px;
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
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
