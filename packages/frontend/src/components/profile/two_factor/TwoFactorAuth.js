import { utils } from 'near-api-js';
import React, {useState} from 'react';
import { Translate } from 'react-localize-redux';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { MULTISIG_MIN_AMOUNT } from '../../../config';
import { disableMultisig } from '../../../redux/actions/account';
import { selectAccountSlice } from '../../../redux/slices/account';
import { actions as recoveryMethodsActions } from '../../../redux/slices/recoveryMethods';
import { selectActionsPending } from '../../../redux/slices/status';
import { selectNearTokenFiatValueUSD } from '../../../redux/slices/tokenFiatValues';
import { COLORS } from '../../../utils/theme';
import { getNearAndFiatValue } from '../../common/balance/helpers';
import FormButton from '../../common/FormButton';
import Card from '../../common/styled/Card.css';
import SafeTranslate from '../../SafeTranslate';
import ConfirmDisable from '../hardware_devices/ConfirmDisable';

const { fetchRecoveryMethods } = recoveryMethodsActions;

const {
    parseNearAmount
} = utils.format;

const Container = styled(Card)`
    margin-top: 30px;
    border: unset;
    background: ${COLORS.darkGray};
    border-radius: 30px;
    padding: 28px 36px;

    .detail {
        color: #A1A1A9;
    }

    .method {
        .top {
            display: flex;
            align-items: center;
            justify-content: space-between;

            button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 176px;
                height: 40px;                
                background: ${COLORS.darkGreen} !important;
                border-radius: 15px;
                font-weight: 600;
                font-size: 20px;
                line-height: 103.4%;
                color: ${COLORS.green};
                font-family: 'Poppins', sans-serif;
                border: unset;
                margin: 0px;

            }
            button:disabled {
                color: ${COLORS.green} !important;
            }
        }

        .bottom {
            margin-top: 20px;
            color: #A1A1A9;
        }

        .color-red {
            margin-top: 20px;
        }

    }

    @media (max-width: 767px) {
    .method {
        .top {
            button {
                width: unset;
                height: unset;
                padding: 16px 32px;
            }
        }      
    }
`;

const TwoFactorAuth = ({ twoFactor, history }) => {
    const [confirmDisable, setConfirmDisable] = useState(false);
    const account = useSelector(selectAccountSlice);
    // const existingContract = !ALLOW_2FA_ENABLE_HASHES.includes(account?.code_hash);
    const nearTokenFiatValueUSD = useSelector(selectNearTokenFiatValueUSD);
    const dispatch = useDispatch();
    const confirmDisabling = useSelector((state) => selectActionsPending(state, { types: ['DISABLE_MULTISIG'] }));

    const handleConfirmDisable = async () => {
        await dispatch(disableMultisig());
        await dispatch(fetchRecoveryMethods({ accountId: account.accountId }));
        setConfirmDisable(false);
    };

    return (
        <Container>
            {twoFactor && !confirmDisable && (
                <div className='method'>
                    <div className='top'>
                        <div>
                            <div className='title'>
                                <Translate id={`twoFactor.${twoFactor.kind === '2fa-email' ? 'email' : 'phone'}`}/>
                            </div>
                            <div className='detail'>{twoFactor.detail}</div>
                        </div>
                        <FormButton onClick={() => setConfirmDisable(true)} className='gray-red'><Translate id='button.disable'/></FormButton>
                    </div>
                    <div className='bottom'>
                        <span className='color-green'>
                            <Translate id='twoFactor.active'/>
                        </span> <Translate id='twoFactor.since'/> {new Date(twoFactor.createdAt).toDateString().replace(/^\S+\s/,'')}
                    </div>
                </div>
            )}
            {twoFactor && confirmDisable && (
                <ConfirmDisable
                    onConfirmDisable={handleConfirmDisable}
                    onKeepEnabled={() => setConfirmDisable(false)}
                    accountId={account.accountId}
                    disabling={confirmDisabling}
                    component='twoFactor'
                    twoFactorKind={twoFactor.kind}
                />
            )}
            {!twoFactor && (
                <div className='method'>
                    <div className='top'>
                        <div className='title'><Translate id='twoFactor.notEnabled'/></div>
                        <FormButton
                            onClick={() => history.push('/enable-two-factor')}
                            trackingId="2FA Click enable button"
                            disabled={true}
                        >
                            <Translate id='button.enable'/>
                        </FormButton>
                    </div>
                    {!account.canEnableTwoFactor && (
                        <div className='color-red'>
                            <SafeTranslate
                                id='twoFactor.notEnoughBalance'
                                data={{
                                    amount: getNearAndFiatValue(parseNearAmount(MULTISIG_MIN_AMOUNT), nearTokenFiatValueUSD)
                                }}
                            />
                        </div>
                    )}
                </div>
            )}
        </Container>
    );
};

export default withRouter(TwoFactorAuth);
