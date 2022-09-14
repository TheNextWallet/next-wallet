import BN from 'bn.js';
import React from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';

import { COLORS } from '../../../utils/theme';
import Balance from '../../common/balance/Balance';
import Tooltip from '../../common/Tooltip';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > .balance {
        text-align: center;
        margin: 30px 0;
        .near-amount {
            font-size: 31px;
            font-weight: 600;
            color: ${COLORS.beige};
        }
        .fiat-amount {
            color: ${COLORS.lightText};
            font-size: 16px;
        }
    }

    > .account {
        background-color: ${COLORS.darkGray};
        border-radius: 8px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        color: ${COLORS.lightText};

        .right {
            text-align: right;
            margin-left: 20px;
            
            .account-id {
                color: ${COLORS.beige};
                font-weight: 600;
                word-break: break-all;
            }

            .balance {
                color: #;
                margin-top: 5px;
            }
        }

        &.from {
            margin-bottom: 10px;
            .near-amount {
                color: ${COLORS.lightText} !i;
            }

            &.no-border {
                border-top: none;
            }
        }

        &.fees {
            .left {
                display: flex;
                align-items: center;
            }
            .near-amount {
                color: ${COLORS.lightText};
            }
            .fiat-amount {
                color: #A2A2A8;
                font-size: 14px;
                margin-top: 5px;
            }
        }
    }
`;

export default ({
    transferAmount,
    sender,
    estimatedFees,
    availableBalance,
    fromLabelId
}) => {
    const isTransferTransaction = new BN(transferAmount).gt(new BN(0));
    return (
        <StyledContainer className='transfer-amount brs-8 bsw-l'>
            {isTransferTransaction && (
                <Balance
                    amount={transferAmount}
                    showAlmostEqualSignUSD={false}
                    showSymbolUSD={false}
                />
            )}
            <div className={`account from ${!isTransferTransaction ? 'no-border' : ''}`}>
                <Translate id={fromLabelId || 'transfer.from'} />
                <div className='right'>
                    <div className='account-id'>{sender}</div>
                    <Balance
                        amount={availableBalance}
                        showBalanceInUSD={false}
                    />
                </div>
            </div>
            <div className='account fees'>
                <div className='left'>
                    <Translate id='transfer.estimatedFees' />
                    <Tooltip translate='sendV2.translateIdInfoTooltip.estimatedFees' />
                </div>
                <div className='right'>
                    <Balance
                        amount={estimatedFees}
                    />
                </div>
            </div>
        </StyledContainer>
    );
};
