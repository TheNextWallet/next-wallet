import React from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';

import classNames from '../../../utils/classNames';
import { COLORS } from '../../../utils/theme';
import ChevronIcon from '../../svg/ChevronIcon';

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${COLORS.darkGreen};
    color: ${COLORS.beige};
    padding: 10px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    cursor: pointer;
    font-size: 13px;

    > svg {
        width: 10px;
        height: 10px;
        transform: rotate(90deg);
        margin-left: 8px;
    }

    &.open {
        > svg {
            transform: rotate(-90deg);
        }
    }

`;

const AccordionTrigger = ({ id, onClick, translateIdTitle, open }) => {
    return (
        <StyledContainer
            id={id}
            onClick={onClick}
            className={classNames(['accordion-trigger' , open ? 'open' : ''])}
        >
            <Translate id={translateIdTitle} />
            <ChevronIcon color={COLORS.green}/>
        </StyledContainer>
    );
};

export default AccordionTrigger;
