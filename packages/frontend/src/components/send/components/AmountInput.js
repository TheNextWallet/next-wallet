import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../utils/theme';

const StyledInput = styled.input`
    text-align: center;
    font-weight: 600;
    padding: 0;
    height: auto;
    border: 0;
    background-color: ${COLORS.darkGray};
    border-radius: 15px;

    :focus {
        border: 0;
        color: ${COLORS.white};
    }

    color: ${COLORS.lightText};

    ::placeholder {
        color: ${COLORS.lightText};
    }

    &.error {
        color: ${COLORS.lightRed};
    }
`;

const getFontSize = (charLength) => {
    let baseSize = 70;

    if (charLength > 5) {
        baseSize = 60;
    }

    if (charLength > 10) {
        baseSize = 50;
    }

    if (charLength >= baseSize) {
        charLength = baseSize - 6;
    }
    const fontSize = baseSize - charLength;
    return fontSize;
};

const AmountInput = ({ value, onChange, error, autoFocus = true, maxLength = 18}) => (
    <StyledInput
        className={error ? 'error' : ''}
        style={{ fontSize: `${value.length ? getFontSize(value.length) : 70}px` }}
        type='number'
        step='any'
        placeholder='0'
        data-test-id="sendMoneyAmountInput"
        value={value}
        onChange={(event) => {
            const { value, maxLength } = event.target;

            if (maxLength && value.length > maxLength) {
                return false;
            }

            onChange(event);
        }}
        autoFocus={!value ? autoFocus : false}
        maxLength={maxLength}
    />
);

export default AmountInput;
