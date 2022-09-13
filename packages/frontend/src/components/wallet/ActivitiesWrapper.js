import React, { useEffect, useState } from 'react';
import { Translate } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { EXPLORER_URL } from '../../config';
import { selectAccountId } from '../../redux/slices/account';
import {
    actions as transactionsActions,
    selectTransactionsOneByIdentity,
    selectTransactionsByAccountId,
    selectTransactionsLoading
} from '../../redux/slices/transactions';
import classNames from '../../utils/classNames';
import { COLORS } from '../../utils/theme';
import FormButton from '../common/FormButton';
import ActivityBox from './ActivityBox';
import ActivityDetailModal from './ActivityDetailModal';

const StyledContainer = styled.div`
    width: 100%;
    background: ${COLORS.darkGray};
    font-family: 'Poppins', sans-serif;

    .no-activity {
        color: #B4B4B4;
        line-height: 150%;
    }

    @media (min-width: 992px) {
        border: 2px solid #F0F0F0;
        border-radius: 30px;
        padding: 30px;

        .activity-box {
            margin: 0 -20px;
            padding: 20px 30px;
            transition: 100ms;

            :first-of-type {
                border-top: 1px solid rgb(255 255 255 / 10%);
            }
        }
    }

    &&&&& > button {
        background: ${COLORS.darkGreen};
        border-radius: 15px;
        width: 100%;
        border: none;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        color: ${COLORS.green};
        font-family: 'Poppins', sans-serif;
        margin-top: 20px;
        :hover {
            background: ${COLORS.green};
            color: ${COLORS.darkGreen};
        }
    }

    .activity-box {
        border-top: 1px solid rgb(255 255 255 / 10%);

        :last-of-type {
            border-bottom: 0;
        }
    }

    h2 {
        font-weight: 700 !important;
        font-size: 24px !important;
        line-height: 24px !important;
        color: ${COLORS.beige} !important;
        margin-top: 0 !important;
    }

    .dots {
        :after {
            position: absolute;
            content: '.';
            animation: link 1s steps(5, end) infinite;
        
            @keyframes link {
                0%, 20% {
                    color: rgba(0,0,0,0);
                    text-shadow:
                        .3em 0 0 rgba(0,0,0,0),
                        .6em 0 0 rgba(0,0,0,0);
                }
                40% {
                    color: #24272a;
                    text-shadow:
                        .3em 0 0 rgba(0,0,0,0),
                        .6em 0 0 rgba(0,0,0,0);
                }
                60% {
                    text-shadow:
                        .3em 0 0 #24272a,
                        .6em 0 0 rgba(0,0,0,0);
                }
                80%, 100% {
                    text-shadow:
                        .3em 0 0 #24272a,
                        .6em 0 0 #24272a;
                }
            }
        }
    }
    @media (max-width: 991px) {
        padding: 32px 24px;
        border-radius: 30px;
    }
`;

const ActivitiesWrapper = () => {
    const dispatch = useDispatch();

    const [transactionHash, setTransactionHash] = useState();
    const accountId = useSelector(selectAccountId);
    const transactions = useSelector((state) => selectTransactionsByAccountId(state, { accountId }));
    const transaction = useSelector((state) => selectTransactionsOneByIdentity(state, { accountId, id: transactionHash }));
    const activityLoader = useSelector((state) => selectTransactionsLoading(state, { accountId }));

    useEffect(() => {
        if (accountId) {
            dispatch(transactionsActions.fetchTransactions({ accountId }));
        }
    }, [accountId]);

    return (
        <StyledContainer>
            <h2 className={classNames({'dots': activityLoader})}>Activity</h2>
            {transactions.slice(0, 4).map((transaction, i) => (
                <ActivityBox
                    key={`${transaction.hash_with_index}-${transaction.block_hash}-${transaction.kind}`}
                    transaction={transaction}
                    actionArgs={transaction.args}
                    actionKind={transaction.kind}
                    receiverId={transaction.receiver_id}
                    accountId={accountId}
                    setTransactionHash={setTransactionHash}
                />
            ))}
            {transactions?.length === 0 && !activityLoader && (
                <div className='no-activity'><Translate id='dashboard.noActivity' /></div>
            )}
            {transactionHash && (
                <ActivityDetailModal
                    open={!!transactionHash}
                    onClose={() => setTransactionHash()}
                    accountId={accountId}
                    transaction={transaction}
                />
            )}
            <FormButton
                linkTo={`${EXPLORER_URL}/accounts/${accountId}`}
                trackingId='Click to account on explorer'
            >
                <Translate id='button.viewAll'/>
            </FormButton>
        </StyledContainer>
    );
};

export default ActivitiesWrapper;
