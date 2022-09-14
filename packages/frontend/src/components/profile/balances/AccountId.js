import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../../utils/theme';

import CopyIcon from '../../svg/CopyIcon';

const Container = styled.div`
    display: flex;
    align-items: center;
    background-color: ${COLORS.darkGreen};
    padding: 4px 4px 4px 15px;
    border-radius: 40px;
    font-weight: 600;
    max-width: 210px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${COLORS.green};
    span {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    > div {
        background-color: ${COLORS.darkGray};
        min-height: 32px;
        min-width: 32px;
        height: 32px;
        width: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin-left: 15px;
    }
`;

const AccountId = ({ id,  'data-test-id': testId }) => {
    return (
        <Container data-test-id={testId}> 
            <span>{id}</span>
            <div>
                <CopyIcon color={COLORS.green}/>
            </div>
        </Container>
    );
};

export default AccountId;
