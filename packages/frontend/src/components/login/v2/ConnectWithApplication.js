import React from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';

import { COLORS } from '../../../utils/theme';
import GlobeIcon from '../../svg/GlobeIcon';

const StyledContainer = styled.a`
    background-color: ${COLORS.darkGreen};
    color: ${COLORS.green};
    padding: 6px 12px;
    border-radius: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    cursor: pointer;

    > svg {
        margin-right: 10px;
    }
`;

const ConnectWithApplication = ({ appReferrer, contractIdUrl }) => (
    <StyledContainer className='connect-with-application' href={contractIdUrl} target='_blank' rel='noreferrer'>
        <GlobeIcon color={COLORS.green} />
        {appReferrer || <Translate id='sign.unknownApp' />}
    </StyledContainer>
);

export default ConnectWithApplication;
