import React from 'react';
import { Translate } from 'react-localize-redux';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { redirectTo } from '../../../redux/actions/account';
import classNames from '../../../utils/classNames';
import { COLORS } from '../../../utils/theme';
import { SHOW_NETWORK_BANNER } from '../../../utils/wallet';

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 15px;
    overflow: hidden;

    > div {
        flex: 1;
        margin: 10px 10px 10px 0;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${COLORS.darkGray};
        color: ${COLORS.lightText};
        font-weight: 600;
        padding: 15px;
        cursor: pointer;
        font-size: 16px;
        transition: color 100ms;
        min-height: 56px;

        &:not(.active) {
            :hover {
                color: darken(${COLORS.green}, 10%);
            }
        }

        &.active {
            background-color: ${COLORS.green};
            color: ${COLORS.black};
            filter: drop-shadow(0px 10px 30px ${COLORS.green});
            cursor: default;
        }

        
    }
    
    .left-button {
        margin: 10px 0 10px 10px;
    }

    @media (max-width: 500px) {
        border-radius: 0;
        border-bottom: 0;
    }

    &.showing-banner {
        background-color: ${COLORS.darkGray};
    }
`;

const TabSelector = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    const sendMoneyRoute = '/send-money';
    const receiveMoneyRoute = '/receive-money';

    //TODO: Replace tab selector in Wallet.js with this component

    return (
        <StyledContainer className={SHOW_NETWORK_BANNER ? 'showing-banner' : ''}>
            <div
                role='button'
                // className={pathname.includes(sendMoneyRoute) ? 'active' : ''}
                className={classNames([
                    'left-button',
                    { active: pathname.includes(sendMoneyRoute) }
                ])}
                onClick={!pathname.includes(sendMoneyRoute) ? () => dispatch(redirectTo(sendMoneyRoute)) : null}
            >
                <Translate id='button.send' />
            </div>
            <div
                role='button'
                className={pathname.includes(receiveMoneyRoute) ? 'active' : ''}
                onClick={!pathname.includes(receiveMoneyRoute) ? () => dispatch(redirectTo(receiveMoneyRoute)) : null}
            >
                <Translate id='button.receive' />
            </div>
        </StyledContainer>
    );
};

export default TabSelector;
