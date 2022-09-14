import React, { useState } from 'react';
import { Translate } from 'react-localize-redux';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { switchAccount } from '../../../redux/actions/account';
import { selectAccountId } from '../../../redux/slices/account';
import { COLORS } from '../../../utils/theme';
import { wallet } from '../../../utils/wallet';
import FormButton from '../../common/FormButton';
import Container from '../../common/styled/Container.css';
import RemoveIcon from '../../svg/RemoveIcon';
import RemoveAccountModal from './RemoveAccountModal';

const StyledContainer = styled(Container)`
    margin-top: 16px;
    padding-top: 0;
    padding-bottom: 0;


    &&& {
        > button {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 515px;
            height: 74px;
        
            background: #3E2B2F;
            border-radius: 15px;
            border: 0px;
            font-weight: 500;
            font-size: 20px;
            line-height: 103.4%;
            font-family: 'Poppins', sans-serif;

            svg {
                width: 28px;
                height: 28px;
                margin: 0px 10px 0px 0px;
            } 

            :hover {
                > svg {
                    path {
                        stroke: #E5484D;
                    }
                }
            }
        }
    }
    @media (max-width: 991px) {
        &&& {
            padding: 0px;
            > button {
                width: 100%;
                font-size: 16px !important;

                svg {
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }
`;

export default () => {
    const dispatch = useDispatch();
    const [showRemoveAccountModal, setShowRemoveAccountModal] = useState(false);
    const accountId = useSelector(selectAccountId);
    return (
        <StyledContainer>
            <FormButton 
                color='dark-red'
                onClick={() => setShowRemoveAccountModal(true)}
                style={{marginTop: 0}}
            >
                <RemoveIcon className='remove-account-icon' color={COLORS.lightRed} />
                <Translate id='removeAccount.button' />
            </FormButton>
            {showRemoveAccountModal && (
                <RemoveAccountModal
                    onClose={() => setShowRemoveAccountModal(false)}
                    onRemoveAccount={async () => {
                        const walletAccounts = await wallet.removeWalletAccount(accountId);
                        if (Object.keys(walletAccounts).length === 0) {
                            location.reload();
                        } else {
                            dispatch(switchAccount({ accountId: Object.keys(walletAccounts)[0] }));
                        }
                        setShowRemoveAccountModal(false);
                    }}
                    isOpen={showRemoveAccountModal}
                    accountId={accountId}
                />
            )}
        </StyledContainer>
    );
};
