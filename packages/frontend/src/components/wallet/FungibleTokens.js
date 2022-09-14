import React from 'react';
import { Translate } from 'react-localize-redux';
import { Textfit } from 'react-textfit';

import FormButton from '../common/FormButton';
import Tooltip from '../common/Tooltip';
import DaoIcon from '../svg/DaoIcon';
import DownArrowIcon from '../svg/DownArrowIcon';
import ReportsIcon from '../svg/ReportsIcon';
import UpArrowIcon from '../svg/UpArrowIcon';
import AllTokensTotalBalanceUSD from './AllTokensTotalBalanceUSD';

const FungibleTokens = ({ fungibleTokensList }) => (
    <>
        <div className='total-balance'>
            <Textfit mode='single' max={48}>
                <AllTokensTotalBalanceUSD allFungibleTokens={fungibleTokensList} />
            </Textfit>
        </div>
        <div className="sub-title balance">
            <Translate id="wallet.availableBalance" />{' '}
            <Tooltip translate="availableBalanceInfo" />
        </div>
        <div className="buttons">
            <FormButton
                color="dark-gray"
                linkTo="/send-money"
                trackingId="Click Send on Wallet page"
                data-test-id="balancesTab.send"
                className="send"
            >
                <div>
                    <UpArrowIcon />
                </div>
                <Translate id="button.send" />
            </FormButton>
            <FormButton
                color="dark-gray"
                linkTo="/receive-money"
                trackingId="Click Receive on Wallet page"
                data-test-id="balancesTab.receive"
                className="receive"
            >
                <div>
                    <DownArrowIcon />
                </div>
                <Translate id="button.receive" />
            </FormButton>
            <FormButton
                color="dark-gray"
                linkTo="/dao"
                trackingId="Click Receive on Wallet page"
                data-test-id="balancesTab.receive"
                className="dao"
            >
                <div>
                    <DaoIcon />
                </div>
                DAO
            </FormButton>
            <FormButton
                color="dark-gray"
                linkTo="/"
                trackingId="Click Receive on Wallet page"
                data-test-id="balancesTab.receive"
                className="report"
            >
                <div>
                    <ReportsIcon />
                </div>
                Reports
            </FormButton>
        </div>
    </>
);

export default FungibleTokens;
