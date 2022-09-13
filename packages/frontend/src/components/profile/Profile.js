import { formatNearAmount } from 'near-api-js/lib/utils/format';
import React, {useEffect, useState} from 'react';
import { Translate } from 'react-localize-redux';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { MIN_BALANCE_FOR_GAS } from '../../config';
import { useAccount } from '../../hooks/allAccounts';
import { Mixpanel } from '../../mixpanel/index';
import {
    getLedgerKey,
    checkCanEnableTwoFactor,
    redirectTo,
    getProfileStakingDetails,
    getBalance
} from '../../redux/actions/account';
import { selectProfileBalance } from '../../redux/reducers/selectors/balance';
import {
    selectAccountAuthorizedApps,
    selectAccountHas2fa,
    selectAccountHasLockup,
    selectAccountId,
    selectAccountLedgerKey,
    selectAccountExists,
} from '../../redux/slices/account';
import { selectAllAccountsHasLockup } from '../../redux/slices/allAccounts';
import { actions as recoveryMethodsActions, selectRecoveryMethodsByAccountId } from '../../redux/slices/recoveryMethods';
import { COLORS } from '../../utils/theme';
import { wallet } from '../../utils/wallet';
import SkeletonLoading from '../common/SkeletonLoading';
import Container from '../common/styled/Container.css';
import Tooltip from '../common/Tooltip';
import AccountIcon from '../svg/AccountIcon';
import CheckIcon from '../svg/CheckIcon';
import LockIcon from '../svg/LockIcon';
import ShieldIcon from '../svg/ShieldIcon';
import AuthorizedApp from './authorized_apps/AuthorizedApp';
import BalanceContainer from './balances/BalanceContainer';
import ExportKeyWrapper from './export_private_key/ExportKeyWrapper';
import RecoveryContainer from './Recovery/RecoveryContainer';
import RemoveAccountWrapper from './remove_account/RemoveAccountWrapper';
import TwoFactorAuth from './two_factor/TwoFactorAuth';
import { ZeroBalanceAccountWrapper } from './zero_balance/ZeroBalanceAccountWrapper';

const { fetchRecoveryMethods } = recoveryMethodsActions;

const StyledContainer = styled(Container)`
    padding: 0 16px;
    h2 {
        font-family: 'Poppins', sans-serif;
        font-weight: 700 !important;
        font-size: 24px !important;
        line-height: 103.4% !important;
        color: ${COLORS.white} !important;
        margin: 0px 0px 30px;
        text-align: left !important;
        display: flex;
        align-items: center;
        svg {
            width: 44px;
            height: 44px;
            margin-right: 15px;
            & > path {
                stroke: ${COLORS.white};
            }
        }
    }
    .left, .right {
        .animation-wrapper {
            border-radius: 8px;
            overflow: hidden;
        }
    }
    .left {
        margin-right: 50px !important;
        .animation-wrapper {
            margin-top: 50px;
            :last-of-type {
                margin-top: 30px;
            }
        }
        .tooltip {
            margin-bottom: -1px;
        }
    }
    .right {
        max-width: 515px !important;
        > h4 {
            margin: 0px 0 25px 0;
            display: flex;
            align-items: center;
            font-weight: 500;
            font-size: 16px;
            line-height: 103.4%;
            color: ${COLORS.lightText};
            font-family: 'Poppins', sans-serif;
        }
        .recovery-option,
        .animation-wrapper {
            margin-top: 10px;
        }
        > button {
            &.gray-blue {
                width: 100%;
                margin-top: 30px;
            }
        }
    }
    hr {
        border: 1px solid #F0F0F0;
        margin: 50px 0 40px 0;
    }
    .sub-heading {
        margin: 30px 0;
        font-weight: 500;
        font-size: 16px;
        line-height: 140%;
        color: ${COLORS.lightText};
        font-family: 'Poppins', sans-serif;
    }
    .auth-apps {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 35px;
        button {
            &.link {
                text-decoration: none !important;
                white-space: nowrap;
            }
        }
    }
    .authorized-app-box {
        margin-top: 20px !important;
    }

    @media (max-width: 991px) {
        .sub-heading {
            text-align: center;
        }
        h2 {
            font-weight: 600 !important;
            font-size: 22px !important;
            svg {
                width: 32px;
                height: 32px;
            }
        }
        .right {
            margin-top: 50px;
            max-width: 100% !important;
        }
        .left {
            margin-right: 0px !important;
        }
        hr {
            border: none;
            margin: 32px 0;
        }
    }

`;

export function Profile({ match }) {
    const accountExists = useSelector(selectAccountExists);
    const has2fa = useSelector(selectAccountHas2fa);
    const authorizedApps = useSelector(selectAccountAuthorizedApps);
    const ledgerKey = useSelector(selectAccountLedgerKey);
    const loginAccountId = useSelector(selectAccountId);
    const accountIdFromUrl = match.params.accountId;
    const accountId = accountIdFromUrl || loginAccountId;
    const isOwner = accountId && accountId === loginAccountId && accountExists;
    const account = useAccount(accountId);
    const dispatch = useDispatch();
    const profileBalance = selectProfileBalance(account);
    const hasLockup = isOwner
        ? useSelector(selectAccountHasLockup)
        : useSelector((state) => selectAllAccountsHasLockup(state, { accountId }));
    const [secretKey, setSecretKey] = useState(null);

    const userRecoveryMethods = useSelector((state) => selectRecoveryMethodsByAccountId(state, { accountId: account.accountId }));
    const twoFactor = has2fa && userRecoveryMethods && userRecoveryMethods.filter((m) => m.kind.includes('2fa'))[0];

    const hasLedger = userRecoveryMethods.some((method) => method.kind === 'ledger');

    useEffect(() => {
        if (!loginAccountId) {
            return;
        }

        if (accountIdFromUrl && accountIdFromUrl !== accountIdFromUrl.toLowerCase()) {
            dispatch(redirectTo(`/profile/${accountIdFromUrl.toLowerCase()}`));
        }

        (async () => {
            if (isOwner) {
                await dispatch(fetchRecoveryMethods({ accountId }));
                if (!ledgerKey) {
                    dispatch(getLedgerKey());
                }
                const balance = await dispatch(getBalance());
                dispatch(checkCanEnableTwoFactor(balance));
                dispatch(getProfileStakingDetails());
            }
        })();
    }, [loginAccountId]);

    useEffect(() => {
        if (userRecoveryMethods) {
            let id = Mixpanel.get_distinct_id();
            Mixpanel.identify(id);
            Mixpanel.people.set_once({create_date: new Date().toString(),});
            Mixpanel.people.set({
                relogin_date: new Date().toString(),
                enabled_2FA: account.has2fa
            });
            Mixpanel.alias(accountId);
            userRecoveryMethods.forEach((method) => Mixpanel.people.set({ ['recovery_with_' + method.kind]: true }));
        }
    },[userRecoveryMethods]);

    useEffect(() => {
        wallet.getLocalKeyPair(accountId).then(async (keyPair) => {
            const isFullAccessKey = keyPair && await wallet.isFullAccessKey(accountId, keyPair);
            setSecretKey(isFullAccessKey ? keyPair.toString() : null);
        });
    },[userRecoveryMethods]);

    useEffect(()=> {
        if (twoFactor) {
            let id = Mixpanel.get_distinct_id();
            Mixpanel.identify(id);
            Mixpanel.people.set({
                create_2FA_at: twoFactor.createdAt,
                enable_2FA_kind:twoFactor.kind,
                enabled_2FA: twoFactor.confirmed});
        }
    }, [twoFactor]);

    const shouldShowEmail = userRecoveryMethods.some(({ kind }) => kind === 'email');
    const shouldShowPhone = userRecoveryMethods.some(({ kind }) => kind === 'phone');

    return (
        <StyledContainer>
            <div className='split'>
                <div className='left'>
                    <h2>
                        <AccountIcon />
                        <Translate id='profile.pageTitle.default' />
                    </h2>
                    {profileBalance ? (
                        <BalanceContainer
                            account={account}
                            profileBalance={profileBalance}
                            hasLockup={hasLockup}
                            MIN_BALANCE_FOR_GAS_FORMATTED={formatNearAmount(MIN_BALANCE_FOR_GAS)}
                        />
                    ) : (
                        <SkeletonLoading
                            height='323px'
                            show={!profileBalance}
                            number={2}
                        />
                    )}
                    {profileBalance?.lockupIdExists && (
                        <SkeletonLoading
                            height='323px'
                            show={hasLockup === undefined}
                            number={1}
                        />
                    )}
                    {isOwner && authorizedApps?.length ? (
                        <>
                            <h2><CheckIcon /><Translate id='profile.authorizedApps.title'/></h2>
                            {authorizedApps.slice(0, 2).map((app, i) => (
                                <AuthorizedApp key={i} app={app}/>
                            ))}
                        </>
                    ) : null}
                </div>
                {isOwner && (
                    <div className='right'>
                        <h2><ShieldIcon/><Translate id='profile.security.title'/></h2>
                        <h4><Translate id='profile.security.mostSecure'/><Tooltip translate='profile.security.mostSecureDesc' icon='icon-lg'/></h4>
                        <RecoveryContainer type='phrase' recoveryMethods={userRecoveryMethods}/>
                        {(twoFactor || !hasLedger) && (
                            <>
                                <hr style={{background: '#2C2C2C'}} />
                                <h2><LockIcon/><Translate id='profile.twoFactor'/></h2>
                                {account.canEnableTwoFactor !== null ? (
                                    <>
                                        <div className='sub-heading'>
                                            Authenticate with Google 2-Step Verification when approving transactions and/or signing in to your account.
                                        </div>
                                        <TwoFactorAuth
                                            twoFactor={twoFactor}
                                        />
                                    </>
                                ) : (
                                    <SkeletonLoading
                                        height='80px'
                                        show={true}
                                    />
                                )}
                            </>
                        )}
                        <>
                            <hr style={{background: '#2C2C2C'}} />
                            {secretKey ? <ExportKeyWrapper secretKey={secretKey}/> : null}
                            <RemoveAccountWrapper/>
                        </>
                    </div>
                )}
                {accountExists === false && !accountIdFromUrl && (
                    <div className='right'>
                        <RemoveAccountWrapper/>
                    </div>
                )}
            </div>
            <ZeroBalanceAccountWrapper/>
        </StyledContainer>
    );
}
