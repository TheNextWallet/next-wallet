import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../utils/theme';
import ChevronIcon from '../../svg/ChevronIcon';
import Token from './entry_types/Token';

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: ${COLORS.darkGray};
    border-radius: 8px;
    cursor: pointer;
    transition: 100ms;

    :hover {
        opacity: 0.5;
    }

    > div {
        width: 100%;
        padding: 0;
        color: ${COLORS.beige};
        font-weight: 600;
    }

    .icon {
        margin-right: 15px;
        color: ${COLORS.beige};
    }
`;

const SelectTokenButton = ({ token, onClick }) => (
    <StyledContainer
        onClick={onClick}
        className="select-token-btn"
        data-test-id="sendMoneyPageSelectTokenButton"
    >
        <Token
            translateIdTitle='sendV2.selectTokenButtonTitle'
            symbol={token.onChainFTMetadata?.symbol}
            icon={token.onChainFTMetadata?.icon}
        />
        <ChevronIcon color={COLORS.green} />
    </StyledContainer>
);

export default SelectTokenButton;
