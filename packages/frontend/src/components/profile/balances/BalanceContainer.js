import React from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';

import { COLORS, MEDIA_QUERY } from '../../../utils/theme';
import Balance from '../../common/balance/Balance';
import ClickToCopy from '../../common/ClickToCopy';
import Tooltip from '../../common/Tooltip';
import AccountId from './AccountId';

const Container = styled.div`
    margin-bottom: 60px;

    .border-box {
        font-family: 'Poppins', sans-serif;
        background: ${COLORS.darkGray};
        border-radius: 30px;
        padding: 5px 28px;

        :first-of-type {
            @media (max-width: 767px) {
                margin-top: 20px;
            }
        }

        @media (min-width: 768px) {
            width: 100%;
            > .item {
                :last-of-type {
                    border-bottom: 0;
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                }
            }
        }
    }

    h4 {
        font-weight: 500;
        font-size: 20px;
        line-height: 103.4%;
        color: ${COLORS.white};
        font-family: 'Poppins', sans-serif;
    }

    .title, .total, .item {
        display flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0px;
        
        .balance {
            text-align: right;
        }
    }

    .total {
        border-top: 1px solid rgb(255 255 255 / 10%);
        font-weight: 500;
        font-size: 20px;
        line-height: 103.4%;
        color: ${COLORS.white};
        .balance {
            .near-amount {
                font-weight: 500;
            }
            .fiat-amount {
                font-weight: 400;
                font-size: 16px;
                line-height: 103.4%;
                color: ${COLORS.lightText};
            }
        }

        @media (max-width: 767px) {
            &.button {
                &.last {
                    border-bottom: 1px solid #f3f3f3;
                }
            }
        }
    }

    .button {
        cursor: pointer;

        &.open {
            .chevron-icon {
                transform: rotate(-90deg);
            }
        }
    }

    .item {
        color: #72727A;
        border-bottom: 1px solid #f3f3f3;
        background-color: #FAFAFA;
        padding-left: 30px;

        span {
            display: flex;
            align-items: center;
            :last-of-type {
                font-weight: 600;
            }
        }

        &.first {
            box-shadow: inset 0 5px 6px -5px #dedede;
        }

        &.detail {

            &:first-of-type {
                box-shadow: inset 0 5px 6px -5px #dedede;
            }

        }

        &.locked {
            padding-left: 30px;

            @media (min-width: 768px) {
                &.last {
                    border-bottom: 0;
                    border-bottom-left-radius: 8px;
                    border-bottom-right-radius: 8px;
                }
            }
        }
    }

    .chevron-icon {
        transform: rotate(90deg);
        margin-left: 12px;
        width: 8px;
        height: 12px;
        margin-top: 2px;
    }

    @media (max-width: 767px) {
        h4 {
            font-weight: 500;
            font-size: 18px;
        }
        .title, .total, .item {
            padding: 17px 0px;
        }
        .total {
            font-weight: 500;
            font-size: 18px;
            &>span:first-child {
                margin-right: 15px;
            }
            .balance {
                .near-amount {
                    font-weight: 500;
                    font-size: 16px;
                }
                .fiat-amount {
                    font-weight: 400;
                    font-size: 16px;
                }
            }
        }
    }
`;

const BalanceContainer = ({ account, profileBalance, hasLockup, MIN_BALANCE_FOR_GAS_FORMATTED }) => {
    return (
        <Container>
            {profileBalance && (
                <>
                    <div className='border-box'>
                        <div className='title'>
                            <h4><Translate id='profile.account.walletId'/></h4>
                            <ClickToCopy copy={account.accountId}>
                                <AccountId id={account.accountId} data-test-id="ownerAccount.accountId"/>
                            </ClickToCopy>
                        </div>
                        <div className='total'>
                            <span><Translate id='profile.account.walletBalance'/></span>
                            <Balance data-test-id="ownerAccount.total" amount={profileBalance.walletBalance.walletBalance}/>
                        </div>
                        <div className='total'>
                            <span><Translate id='profile.account.reservedForStorage'/></span>
                            <span><Balance data-test-id="ownerAccount.reservedForStorage" amount={profileBalance.walletBalance.reservedForStorage}/></span>
                        </div>
                        <div className='total'>
                            <span><Translate id='profile.account.reservedForTransactions'/></span>
                            <span><Balance data-test-id="ownerAccount.reservedForTransactions" amount={profileBalance.walletBalance.reservedForTransactions}/></span>
                        </div>
                        <div className='total'>
                            <span><Translate id='profile.account.available'/></span>
                            <span><Balance data-test-id="ownerAccount.available" amount={profileBalance.walletBalance.available}/></span>
                        </div>
                    </div>
                    {hasLockup && (
                        <div className='border-box'>
                            <div className='title last'>
                                <h4><Translate id='profile.lockup.lockupId'/></h4>
                                <ClickToCopy copy={profileBalance.lockupId}>
                                    <AccountId id={profileBalance.lockupId} data-test-id="lockupAccount.accountId"/>
                                </ClickToCopy>
                            </div>
                            <div className='total'>
                                <span><Translate id='profile.lockup.lockupBalance'/></span>
                                <Balance data-test-id="lockupAccount.total" amount={profileBalance.lockupBalance.lockupBalance}/>
                            </div>
                            <div className='total'>
                                <span><Translate id='profile.account.reservedForStorage'/></span>
                                <span><Balance data-test-id="lockupAccount.reservedForStorage" amount={profileBalance.lockupBalance.reservedForStorage}/></span>
                            </div>
                            <div className='total'>
                                <span><Translate id='profile.lockup.locked'/></span>
                                <span><Balance data-test-id="lockupAccount.locked" amount={profileBalance.lockupBalance.locked}/></span>
                            </div>
                            <div className='total'>
                                <span><Translate id='profile.lockup.unlocked'/></span>
                                <span><Balance data-test-id="lockupAccount.unlocked" amount={profileBalance.lockupBalance.unlocked.sum}/></span>
                            </div>
                            <div className='total'>
                                <span><Translate id='profile.account.availableToTransfer'/><Tooltip translate='unlockedAvailTransfer'/></span>
                                <span><Balance data-test-id="lockupAccount.availableToTransfer" amount={profileBalance.lockupBalance.unlocked.availableToTransfer}/></span>
                            </div>
                        </div>
                    )}
                </>
            )}
        </Container>
    );
};

export default BalanceContainer;
