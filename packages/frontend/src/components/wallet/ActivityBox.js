import React from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';
import { format } from 'timeago.js';

import IconTStake from '../../images/IconTStake';
import classNames from '../../utils/classNames';
import { COLORS } from '../../utils/theme';
import Balance from '../common/balance/Balance';
import SafeTranslate from '../SafeTranslate';
import CodeIcon from '../svg/CodeIcon';
import DownArrowIcon from '../svg/DownArrowIcon';
import KeyIcon from '../svg/KeyIcon';
import SendIcon from '../svg/SendIcon';
import UserIcon from '../svg/UserIcon';

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 15px 0;

    @media (max-width: 991px) {
        margin: 0 -14px;
        padding: 15px 14px;
    }

    :hover {
        cursor: pointer;
    }

    .symbol {
        min-width: 50px;
        min-height: 50px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
        background: ${COLORS.darkGreen};
    }

    .desc {
        overflow: hidden;
        font-weight: 700;
        font-size: 18px;
        line-height: 24px;
        color: ${COLORS.beige};
        min-width: 0;
        margin-right: 40px;

        > span {
            overflow: hidden;
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            color: ${COLORS.lightText};

            > span {
                color: ${COLORS.lightText};
                
                :first-of-type {
                    color: ${COLORS.lightText};
                }

            }
        }
    }

    .right {
        margin-left: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        .value {
            font-weight: 700;
            white-space: nowrap;
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height: 24px;
            color: ${COLORS.beige};

            &.transferred {
                .balance {
                    .near-amount {
                        .near {
                            color: ${COLORS.lightRed};
                        }
                    }
                }
                &::before {
                    color: ${COLORS.lightRed};
                    content: '-'
                }
            }
            &.received {
                color: #00C08B;

                &::before {
                    content: '+'
                }
            }
        }
        .time {
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            color: ${COLORS.lightText};
            text-align: right;
        }
    }
`;

const StyledDot = styled.span`
    height: 7px;
    width: 7px;
    border-radius: 50%;
    background-color: ${(props) => props.background};
    margin-right: 5px;
`;

const ActivityBox = ({ transaction, actionArgs, actionKind, accountId, setTransactionHash, receiverId }) => {
    const { block_timestamp, hash_with_index } = transaction;

    return (
        <StyledContainer className='activity-box' onClick={() => setTransactionHash(hash_with_index)}>
            <ActionIcon actionKind={actionKind} receiverId={receiverId} accountId={accountId}/>
            <div className='desc'>
                <ActionTitle
                    transaction={transaction}
                    actionArgs={actionArgs}
                    actionKind={actionKind}
                    accountId={accountId}
                />
                <ActionMessage
                    transaction={transaction}
                    actionArgs={actionArgs}
                    actionKind={actionKind}
                    accountId={accountId}
                />
            </div>
            <div className='right'>
                {['Transfer', 'Stake'].includes(actionKind) && (
                    <ActionValue
                        transaction={transaction}
                        actionArgs={actionArgs}
                        actionKind={actionKind}
                        accountId={accountId}
                        showBalanceInUSD={false}
                    />
                )}
                <ActionTimeStamp
                    timeStamp={block_timestamp}
                />
            </div>
        </StyledContainer>
    );
};

export const ActionTitle = ({ transaction, actionArgs, actionKind, accountId }) => (
    <Translate
        id={`dashboardActivity.title.${translateId(transaction, actionArgs, actionKind, accountId)}`}
    />
);

export const ActionMessage = ({ transaction, actionArgs, actionKind, accountId }) => (
    <SafeTranslate
        id={`dashboardActivity.message.${translateId(transaction, actionArgs, actionKind, accountId)}`}
        data={translateData(transaction, actionArgs, actionKind)}
    />
);

const translateId = (transaction, actionArgs, actionKind, accountId) => (
    `${actionKind
    }${actionKind === 'AddKey'
        ? actionArgs.access_key && actionArgs.access_key.permission.permission_details
            ? '.forContract'
            : '.forReceiver'
        : ''
    }${actionKind === 'Transfer'
        ? transaction.signer_id === accountId
            ? '.transferred'
            : '.received'
        : ''
    }`
);

export const translateData = (transaction, actionArgs, actionKind) => ({
    receiverId: transaction.receiver_id || '',
    signerId: transaction.signer_id || '',
    methodName: actionKind === 'FunctionCall' ? actionArgs.method_name : '',
    deposit: actionKind === 'Transfer' ? <Balance amount={actionArgs.deposit} /> : '',
    stake: actionKind === 'Stake' ? <Balance amount={actionArgs.stake} />  : '',
    permissionReceiverId: (actionKind === 'AddKey' && actionArgs.access_key && actionArgs.access_key.permission.permission_kind === 'FUNCTION_CALL') ? actionArgs.access_key.permission.permission_details.receiver_id : '',
});

const ActionIcon = ({ actionKind, receiverId, accountId }) => (
    <div className='symbol'>
        {actionKind === 'CreateAccount' && <UserIcon color={COLORS.green} />}
        {actionKind === 'DeleteAccount' && <UserIcon color={COLORS.green} />}
        {actionKind === 'DeployContract' && <CodeIcon color={COLORS.green} />}
        {actionKind === 'FunctionCall' && <CodeIcon color={COLORS.green} />}
        {actionKind === 'Transfer' && (receiverId === accountId ? <DownArrowIcon color={COLORS.green} /> : <SendIcon color={COLORS.green} />)}
        {actionKind === 'Stake' && <IconTStake color={COLORS.green} />}
        {actionKind === 'AddKey' && <KeyIcon color={COLORS.green} />}
        {actionKind === 'DeleteKey' && <KeyIcon color={COLORS.green}  />}
    </div>
);

const ActionTimeStamp = ({ timeStamp }) => {
    let time = format(timeStamp);
    let formatting = {
        'ago': '',
        'years': 'y',
        'year': 'y',
        'months': 'mo',
        'month': 'mo',
        'weeks': 'w',
        'week': 'w',
        'days': 'd',
        'day': 'd',
        'hours': 'hr',
        'hour': 'hr',
        'minutes': 'min',
        'minute': 'min',
        'seconds': 's'
    };

    for (const format in formatting) {
        time = time.replace(`${format}`, `${formatting[format]}`);
    }

    if (time !== 'just now') {
        time = time.split(' ').join('');
    }

    return (
        <span className='time'>
            {time}
        </span>
    );
};

export const ActionValue = ({ transaction, actionArgs, actionKind, accountId, showBalanceInUSD }) => (
    <div className={`value ${actionKind === 'Transfer' ? transaction.signer_id === accountId ? 'transferred' : 'received' : ''}`}>
        {actionKind === 'Transfer' && <Balance amount={actionArgs.deposit} showBalanceInUSD={showBalanceInUSD}/>}
        {actionKind === 'Stake' && <Balance amount={actionArgs.stake} showBalanceInUSD={showBalanceInUSD}/>}
    </div>
);

const TX_STATUS_COLOR = {
    NotStarted: '',
    Started: '#6ad1e3',
    Failure: '#ff585d',
    SuccessValue: '#5ace84',
    notAvailable: '#ff585d'
};

export const ActionStatus = ({ status }) => (
    <span className={classNames(['status', {'dots': !status}])}>
        {status && <StyledDot background={TX_STATUS_COLOR[status]} />}
        <Translate id={`transaction.status.${status || 'checkingStatus'}`} />
    </span>
);

export default ActivityBox;
