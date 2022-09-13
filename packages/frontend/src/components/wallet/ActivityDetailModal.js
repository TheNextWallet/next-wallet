import React, { useEffect } from 'react';
import { Translate } from 'react-localize-redux';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { EXPLORER_URL } from '../../config';
import { actions as transactionsActions } from '../../redux/slices/transactions';
import { COLORS } from '../../utils/theme';
import { TRANSACTIONS_REFRESH_INTERVAL } from '../../utils/wallet';
import FormButton from '../common/FormButton';
import Modal from '../common/modal/Modal';
import SafeTranslate from '../SafeTranslate';
import { ActionTitle, ActionValue, ActionMessage, ActionStatus, translateData } from './ActivityBox';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        &.title {
            text-align: center;
            font-family: 'Poppins';
            font-weight: 700;
            font-size: 40px;
            color: ${COLORS.beige};
        }
    }

    .row {
        width: 100%;
        max-width: 400px;
        margin: 40px auto 0px;
    }

    .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 32px 0;
        border-top: 1px solid rgba(165, 165, 165, 0.4);

        @media (max-width: 767px) {
            margin: 0 -25px;
            padding: 15px;
        }

        > span {
            :first-of-type {
                font-family: 'Poppins';
                font-weight: 500;
                font-size: 20px;
                color: ${COLORS.lightText};

                > span > span {
                    color: #3F4045;
                }
            }
        }
        &.data > span {
            :last-of-type {
                font-family: 'Poppins';
                font-weight: 500;
                font-size: 20px;
                color: ${COLORS.beige};
            }
        }

        &.sent-to > span {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;

            > span {
                font-family: 'Poppins';
                font-weight: 500;
                font-size: 20px;
                color: ${COLORS.beige};
                max-width: 150px;
                overflow: hidden;
                text-overflow: ellipsis;

                @media(max-width: 350px) {
                    max-width: 200px;
                }
                :first-of-type {
                    text-transform: capitalize;
                    font-family: 'Poppins';
                    font-weight: 500;
                    font-size: 20px;
                    color: ${COLORS.beige};
                }
            }
        }

        .amount {
            .value {
                font-weight: 700;
                color: #24272a;
                white-space: nowrap;
                display: flex;
                align-items: center;
                text-align: right;

                &.transferred {
                    .near-amount {
                        &::before {
                            content: '-'
                        }
                    }
                }
                &.received {
                    color: #00C08B;
                    .near-amount {
                        &::before {
                            content: '+'
                        }
                    }
                }
                .fiat-amount {
                    font-weight: 400;
                }
            }
        }
        .status {
            display: flex;
            align-items: center;
            font-family: 'Poppins';
            font-weight: 500;
            font-size: 20px;
            color: ${COLORS.lightText};
        }
    }

    button {
        &.gray-blue {
            width: 100% !important;
            max-width: 400px;
            margin-top: 32px !important;
            border: 0 !important;
            background: ${COLORS.darkGreen} !important;
            border-radius: 15px !important;
            font-family: 'Poppins' !important;
            font-weight: 500 !important;
            font-size: 24px !important;
            color: ${COLORS.green} !important;
        }

        &.gray-blue:hover {
            color: ${COLORS.darkGreen} !important;
            background: ${COLORS.green} !important;
        }
    }
    @media (max-width: 768px) {
        h2 {
            &.title {
                font-weight: 600;
                font-size: 30px;
            }
        }
    }
`;

const ActivityDetailModal = (
    {
        open,
        onClose,
        accountId,
        transaction
    }
) => {
    const {
        args: actionArgs,
        kind: actionKind,
        status,
        checkStatus,
        hash,
        signer_id,
        block_timestamp,
        hash_with_index
    } = transaction;

    const dispatch = useDispatch();
    const getTransactionStatusConditions = () => checkStatus && !document.hidden && dispatch(transactionsActions.fetchTransactionStatus({ hash, signer_id, accountId, hash_with_index }));

    useEffect(() => {
        getTransactionStatusConditions();
        const interval = setInterval(() => {
            getTransactionStatusConditions();
        }, TRANSACTIONS_REFRESH_INTERVAL);

        return () => clearInterval(interval);
    }, [hash, checkStatus]);

    return (
        <Modal
            id='instructions-modal'
            isOpen={open}
            onClose={onClose}
            closeButton
        >
            <StyledContainer>
                <h2 className='title'>
                    <ActionTitle
                        transaction={transaction}
                        actionArgs={actionArgs}
                        actionKind={actionKind}
                        accountId={accountId}
                    />
                </h2>
                <div className='row'>
                    {['Transfer', 'Stake'].includes(actionKind) && (
                        <div className='item'>
                            <span>
                                Amount
                            </span>
                            <span className='amount'>
                                <ActionValue
                                    transaction={transaction}
                                    actionArgs={actionArgs}
                                    actionKind={actionKind}
                                    accountId={accountId}
                                />
                            </span>
                        </div>
                    )}
                    {actionKind !== 'DeleteKey' &&  (
                        actionKind === 'FunctionCall'
                            ? (
                                <>
                                    <div className='item sent-to'>
                                        <SafeTranslate
                                            id={'dashboardActivity.message.FunctionCallDetails.first'}
                                            data={translateData(transaction, actionArgs, actionKind)}
                                        />
                                    </div>
                                    <div className='item sent-to'>
                                        <SafeTranslate
                                            id={'dashboardActivity.message.FunctionCallDetails.second'}
                                            data={translateData(transaction, actionArgs, actionKind)}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className='item sent-to'>
                                    <ActionMessage
                                        transaction={transaction}
                                        actionArgs={actionArgs}
                                        actionKind={actionKind}
                                        accountId={accountId}
                                    />
                                </div>
                            )
                    )
                    }
                    <div className='item data'>
                        <span><Translate id='wallet.dateAndTime' /></span>
                        <span>
                            {new Date(block_timestamp).toLocaleString(
                                'en-US',
                                { dateStyle: 'short', timeStyle: 'short' }
                            )}
                        </span>
                    </div>
                    <div className='item'>
                        <span><Translate id='wallet.status' /></span>
                        <ActionStatus status={status} />
                    </div>
                </div>
                <FormButton
                    color='gray-blue'
                    linkTo={`${EXPLORER_URL}/transactions/${hash}`}
                    trackingId='Click access key added view on explorer button'
                >
                    <Translate id='button.viewOnExplorer'/>
                </FormButton>
            </StyledContainer>
        </Modal>
    );
};

export default ActivityDetailModal;
