import React, { useState } from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';

import classNames from '../../../utils/classNames';
import { COLORS } from '../../../utils/theme';
import InputAccountId from './InputAccountId';

const StyledContainer = styled.div`
    background-color: ${COLORS.darkGray};
    color: ${COLORS.lightText} !important;
    display: flex;
    border-radius: 8px;
    transition: 100ms;
    color: #272729;
    font-weight: 600;
    white-space: nowrap;
    align-items: center;
    padding-left: 15px;
    margin-top: 50px;
    overflow-x: hidden;

    &.focus {
        border: 2px solid ${COLORS.green};
        box-shadow: 0 0 0 2pt ${COLORS.green};
        color: ${COLORS.beige};
    }

    &.problem {
        border: 2px solid ${COLORS.lightRed};

        &.focus {
            box-shadow: 0 0 0 2pt ${COLORS.red};
        }
    }

    &.success {
        color: ${COLORS.green};
        &.focus {
            box-shadow: 0 0 0 2pt ${COLORS.green};
        }
    }
`;

const ReceiverInputWithLabel = (
    {
        receiverId,
        handleChangeReceiverId,
        checkAccountAvailable,
        setIsImplicitAccount,
        localAlert,
        clearLocalAlert,
        autoFocus,
        isSuccess,
        isProblem
    }
) => {
    const [inputHasFocus, setInputHasFocus] = useState(false);
    // TODO: Add remaining error style text

    const containerClass = classNames([
        { 'success': isSuccess },
        { 'problem': isProblem },
        { 'focus': inputHasFocus }
    ]);

    return (
        <StyledContainer className={containerClass}>
            <Translate id='sendV2.selectReceiver.receiverInputLabel' />
            <InputAccountId
                accountId={receiverId}
                handleChange={handleChangeReceiverId}
                ReceiverInputWithLabel={ReceiverInputWithLabel}
                checkAvailability={checkAccountAvailable}
                setIsImplicitAccount={setIsImplicitAccount}
                localAlert={localAlert}
                clearLocalAlert={clearLocalAlert}
                onFocus={() => setInputHasFocus(true)}
                onBlur={() => setInputHasFocus(false)}
                autoFocus={!receiverId && autoFocus}
                isSuccess={isSuccess}
                isProblem={isProblem}
            />
        </StyledContainer>
    );
};

export default ReceiverInputWithLabel;
