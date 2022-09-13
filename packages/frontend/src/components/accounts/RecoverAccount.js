import React from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';

import PhraseIcon from '../../images/icon-recover-seedphrase.svg';
import { Mixpanel } from '../../mixpanel/index';
import { COLORS } from '../../utils/theme';
import FormButton from '../common/FormButton';
import Container from '../common/styled/Container.css';

const StyledContainer = styled(Container)`

    h1, h2 {
        color: ${COLORS.white};
        text-align: center;
    }
    h2 {
        margin-top: 20px;
    }
    @media (min-width: 992px) {
        h1, h2 {
            max-width: 700px;
            margin: 0 auto;
        }
        h2 {
            margin-top: 20px;
        }
    }
    .options-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const Option = styled.div`
    flex: 1;
    border: 3px solid ${COLORS.darkGray};
    background-color: ${COLORS.darkGray};
    border-radius: 6px;
    padding: 25px;
    margin-bottom: 25px;
    min-width: 30%;
    @media (min-width: 992px) {
        margin: 20px;
    }
    @media (min-width: 992px) {
        max-width: 420px;
    }
    @media (min-width: 1200px) {
        max-width: 460px;
    }
    > button {
        width: 100%;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    color: ${COLORS.white};
    font-weight: 500;
    font-size: 16px;
    :not(.no-background) {
        :before {
            content: '';
            background: url(${(props) => props.icon});
            background-repeat: no-repeat;
            display: block;
            width: 40px;
            height: 40px;
            margin-right: 15px;
            margin-top: -5px;
        }
    }
    .smart-phone-icon {
        width: 40px;
        height: 40px;
        margin-left: -5px;
        margin-right: 10px;
        path {
            stroke: #8dd4bd;
            stroke-width: 1.5;
        }
    }
`;

const P = styled.p`
    color: ${COLORS.lightText};
    &:first-of-type {
        margin-top: 20px;
    }
    span {
        font-weight: 500;
    }
`;

const RecoverAccount = ({ locationSearch }) => (
    <StyledContainer>
        <h1><Translate id='recoverAccount.pageTitle' /></h1>
        <div className='options-container'>
            <Option>
                <Header icon={PhraseIcon}><Translate id='recoverAccount.phrase.title' /></Header>
                <P><Translate id='recoverAccount.phrase.desc' /></P>
                <FormButton
                    color='dark-green'
                    linkTo={`/recover-seed-phrase${locationSearch}`}
                    onClick={() => Mixpanel.track('IE Click seed phrase recovery button')}
                    data-test-id="recoverAccountWithPassphraseButton"
                    id='IE Click seed phrase recovery button'
                >
                    <Translate id='button.recoverAccount' />
                </FormButton>
            </Option>
        </div>
    </StyledContainer>
);

export default RecoverAccount;
