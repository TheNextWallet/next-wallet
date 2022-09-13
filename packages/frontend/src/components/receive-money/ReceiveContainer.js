import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../utils/theme';
import Container from '../common/styled/Container.css';
import TabSelector from '../send/components/TabSelector';
import AccountId from './components/AccountId';
import AccountIdQRCode from './components/AccountIdQRCode';
import AvailableBalance from './components/AvailableBalance';

const StyledContainer = styled(Container)`
    > div {
        :nth-of-type(2) {
            margin: 70px auto;
        }

        :nth-of-type(4) {
            background-color: ${COLORS.black};
            margin-top: 5px;
            padding: 0 15px;

            > div {
                background-color: ${COLORS.darkGray};
                color: ${COLORS.lightText};
                border-radius: 8px;
            }
        }
    }
`;


const ReceiveContainer = ({ accountId, availableBalance }) => (
    <StyledContainer className='small-centered'>
        <TabSelector/>
        <AccountIdQRCode accountId={accountId} />
        <AccountId accountId={accountId} />
        <AvailableBalance availableBalance={availableBalance} />
    </StyledContainer>
);

export default ReceiveContainer;
