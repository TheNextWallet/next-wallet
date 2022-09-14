import React from 'react';
import { Translate } from 'react-localize-redux';
import { Textfit } from 'react-textfit';
import styled from 'styled-components';

import Balance from '../common/balance/Balance';
import Modal from '../common/modal/Modal';
import FormButton from '../common/FormButton';
import { COLORS } from '../../utils/theme';
import { DAO_VOUTING_OPTIONS } from '../../utils/constants';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h2 {
        color: ${COLORS.beige} !important;
        margin-bottom: 10px;
    }

    @media (max-width: 500px) {
        padding: 40px 25px;
    }

    .validator-box {
        width: 100%;
        max-width: 400px;

        .left {
            > div {
                :first-of-type {
                    max-width: 150px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: left;
                }
            }
        }
    }
    
    .buttons {
        display: flex;
        width: 100%;
        justify-content: space-around;
        
        button {
            width: 40%;

            @media (max-width: 768px) {
                width: auto;
            }
        }

        @media (max-width: 768px) {
            display: block;
        }
    }

    .amount {
        width: 100%;
        max-width: 400px;
    }

    .voute-amount {
        color: #24272a;
        font-weight: 500;
        margin: 40px 0 !important;

        .fiat-amount {
            font-size: 14px;
        }
    }

    .green {
        margin-top: 50px !important;
        width: 100%;
        max-width: 400px;
    }

    .link {
        margin-top: 30px !important;
    }

    .ledger-disclaimer {
        font-style: italic;
        margin-top: 50px;
        max-width: 400px;
    }

    .divider {
        width: 100%;
        border-top: 1px solid #F2F2F2;
        position: relative;
        margin-bottom: 40px;
        max-width: 400px;

        div {
            background-color: white;
            padding: 0 10px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
        }
    }

`;

const VouteConfirmModal = ({ open, onClose, onConfirm, loading, label, sendingString, vote }) => {
    const voteText = vote === DAO_VOUTING_OPTIONS.approve ? 'Approving' : 'Rejecting';
    return (
        <Modal
            id='vouting-confirm-modal'
            isOpen={open}
            onClose={onClose}
            closeButton='desktop'
        >
            <Container>
                <h2>{voteText} proposal</h2>
                <Textfit mode='single' max={40}>
                    You are about to voute for the proposal. Please confirm the details.
                </Textfit>
                {label && <div className='divider'><div><Translate id={label}/></div></div>}
                <div className="buttons">
                    <FormButton
                        disabled={loading}
                        sending={loading}
                        color='light-green'
                        onClick={onConfirm}
                        sendingString={`button.${vote}`}
                        data-test-id="confirmVouteOnModalButton"
                    >
                        <Translate id='button.confirm'/>
                    </FormButton>
                    <FormButton disabled={loading} color='dark-red' id='close-button'>
                        <Translate id='button.cancel'/>
                    </FormButton>
                </div>
            </Container>
        </Modal>
    );
};

export default VouteConfirmModal;
