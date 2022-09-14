import React from 'react';
import { Translate } from 'react-localize-redux';
import { Textfit } from 'react-textfit';
import styled from 'styled-components';

import classNames from '../../../../utils/classNames';
import { COLORS } from '../../../../utils/theme';
import FormButton from '../../../common/FormButton';
import Information from '../entry_types/Information';
import RawTokenAmount from '../RawTokenAmount';
import TransactionDetails from '../TransactionDetails';

const StyledContainer = styled.div`
    .information {
        background-color: ${COLORS.darkGray};
        color: ${COLORS.lightText};
        border-radius: 8px;
        margin-bottom: 5px;

        > div { 
            color: ${COLORS.lightText}
        }
    }

    &:not(.sending-token) {
        .clickable {
            cursor: pointer;
        }
    }

    .token-amount {
        font-size: 48px;
        font-weight: 600;
        color: #272729;
        text-align: center;
        margin: 40px 0;

        @media (max-width: 767px) {
            font-size: 38px;
        }

        > div {
            white-space: normal;
            word-break: break-all;
            line-height: normal;
            color: ${COLORS.beige};
        }
    }
`;

const prefixTXEntryTitleId = (key) => `sendV2.TXEntry.title.${key}`;

const Review = ({
    onClickCancel,
    onClickContinue,
    amount,
    selectedToken,
    senderId,
    receiverId,
    estimatedFeesInNear,
    estimatedTotalInNear,
    sendingToken,
    onClickAmount,
    onClickReceiver,
    onClickSelectedToken
}) => {

    return (
        <StyledContainer className={classNames(['buttons-bottom', { 'sending-token': sendingToken === true }])}>
            <div className='header'>
                <Translate id='sendV2.review.title' />
            </div>
            <div className='token-amount clickable' onClick={() => sendingToken !== true && onClickAmount()}>
                <Textfit mode='single' max={38}>
                    <RawTokenAmount
                        amount={amount}
                        symbol={selectedToken.onChainFTMetadata?.symbol}
                        decimals={selectedToken.onChainFTMetadata?.decimals}
                        showFiatAmountForNonNearToken={false}
                    />
                </Textfit>
            </div>
            <Information
                id='information-from'
                translateIdTitle={prefixTXEntryTitleId('from')}
                informationValue={senderId}
            />
            <Information
                id='information-to'
                translateIdTitle={prefixTXEntryTitleId('to')}
                informationValue={receiverId}
                onClick={() => sendingToken !== true && onClickReceiver()}
            />
            <TransactionDetails
                selectedToken={selectedToken}
                estimatedFeesInNear={estimatedFeesInNear}
                estimatedTotalInNear={estimatedTotalInNear}
                amount={amount}
                onTokenClick={() => sendingToken !== true && onClickSelectedToken()}
            />
            <div className='buttons-bottom-buttons'>
                <FormButton
                    onClick={onClickContinue}
                    disabled={sendingToken === true}
                    sending={sendingToken === true}
                    data-test-id="sendMoneyPageConfirmButton"
                    color='light-green'
                >
                    <Translate id={`button.${sendingToken === 'failed' ? 'retry' : 'confirmAndSend'}`} />
                </FormButton>
                <FormButton
                    disabled={sendingToken === true}
                    onClick={onClickCancel}
                    className='link'
                    color='gray'
                >
                    <Translate id='button.cancel' />
                </FormButton>
            </div>
        </StyledContainer>
    );
};

export default Review;
