import React from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';

import { COLORS, BACKGROUND } from '../../../utils/theme';
import Balance from '../../common/balance/Balance';
import FormButton from '../../common/FormButton';

const Container = styled.div`
    &&& {
        background: ${COLORS.darkGray};
        border-radius: 30px;
        padding: 30px;
        font-family: 'Poppins', sans-serif;
        position: relative;
        background-image: ${BACKGROUND.bubbles};
        background-size: 140%;
    
        .img-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .title {
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 1;
            position: relative;

            font-weight: 500;
            font-size: 20px;
            line-height: 103.4%;
            color: ${COLORS.white};

            > button {
                margin: 0;
            }
        }

        .key {
            font-weight: 400;
            font-size: 16px;
            line-height: 103.4%;
            color: ${COLORS.lightText};
            background: ${COLORS.darkGray};
            border-radius: 15px;
            padding: 15px 20px;
            word-break: break-all;
            z-index: 1;
            position: relative;
        }

        .fee {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 30px;
            z-index: 1;
            position: relative;
            span {
                :first-of-type {
                    font-weight: 500;
                    font-size: 20px;
                    line-height: 103.4%;
                    color: ${COLORS.white};
                }
                :last-of-type {
                    font-weight: 600;
                    font-size: 20px;
                    line-height: 103.4%;
                    color: ${COLORS.beige};
                    text-align: right;
                }
            }
        }
        @media (max-width: 767px) {
            background-image: none;
            .title {
                font-weight: 500;
                font-size: 18px;
            }

            .key {
                background: #293933;
                border-radius: 30px;
            }

            .fee {
                span {
                    :first-of-type {
                        font-weight: 500;
                        font-size: 18px;
                    }
                    :last-of-type {
                        font-weight: 500;
                        font-size: 18px;
                    }
                }
            }
        }
    }
`;

const AuthorizedApp = ({ app, onClick, deAuthorizing }) => {
    return (
        <Container className='authorized-app-box'>
            <div className='title'>
                {app.access_key.permission.FunctionCall.receiver_id}
                {onClick && (
                    <FormButton color='gray-red' className='small'
                        onClick={onClick}
                        disabled={deAuthorizing}
                        sending={deAuthorizing}
                        sendingString='button.deAuthorizing'
                    >
                        <Translate id='button.deauthorize' />
                    </FormButton>
                )}
            </div>
            <div className='key font-monospace'>{app.public_key}</div>
            <div className='fee'>
                <span><Translate id='authorizedApps.feeAllowance' /></span>
                <span><Balance amount={app.access_key.permission.FunctionCall.allowance} showBalanceInUSD={false}/></span>
            </div>
        </Container>
    );
};

export default AuthorizedApp;
