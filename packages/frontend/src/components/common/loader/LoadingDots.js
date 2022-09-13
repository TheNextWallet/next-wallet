import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../utils/theme';

const StyledContainer = styled.div`
    text-align: center;
    span {
        display: inline-block;
        vertical-align: middle;
        width: 5px;
        height: 5px;
        margin: 4px;
        background-color: ${COLORS.green};
        border-radius: 50%;
        animation: loading 0.8s infinite alternate;

        :nth-of-type(1) {
            animation-delay: 0.2s;
        }
        :nth-of-type(2) {
            animation-delay: 0.4s;
        }
        :nth-of-type(3) {
            animation-delay: 0.6s;
        }
        :nth-of-type(4) {
            animation-delay: 0.8s;
        }
    }

    @keyframes loading {
        0% {
            background-color: ${COLORS.beige};
        }
        100% {
            background-color: ${COLORS.green};
        }
    }
`;

const LoadingDots = () => (
    <StyledContainer className='loading-dots'>
        <div>
            <span />
            <span />
            <span />
            <span />
        </div>
    </StyledContainer>
);

export default LoadingDots;
