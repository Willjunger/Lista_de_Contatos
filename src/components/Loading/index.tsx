import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import styled from 'styled-components';

const Spinner = styled(FaSpinner)`
  animation: spin 0.5s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Spinner size={32} />
        </div>
    );
};

export default Loading;