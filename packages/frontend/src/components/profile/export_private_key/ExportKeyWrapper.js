import React, { useState } from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';

// import ExportPrivateKeyImage from '../../../images/icon-key.svg';
import { COLORS } from '../../../utils/theme';
import FormButton from '../../common/FormButton';
import Container from '../../common/styled/Container.css';
import KeyIcon from '../../svg/KeyIcon';
import ExportKeyModal from './ExportKeyModal';

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
            background: ${COLORS.green};
            border-radius: 15px !important;
            width: 515px;
            height: 74px !important;
            font-weight: 500 !important;
            font-size: 20px !important;
            line-height: 103.4%;
            color: ${COLORS.black} !important;
            font-family: 'Poppins', sans-serif;
            border: unset !important;

            : hover {
                color: ${COLORS.green} !important;
                background: ${COLORS.darkGreen};
                > svg {
                    path {
                        stroke: ${COLORS.green};
                    }
                }
            }

            svg {
                margin: 0px 10px 0px 0px;
                width: 28px;
                height: 28px;
                path {
                    stroke: ${COLORS.darkGreen};
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

export default ({ secretKey }) => {
    const [showExportKeyModal, setShowExportKeyModal] = useState(false);

    return (
        <StyledContainer>
            <FormButton 
                color='light-green'
                onClick={() => setShowExportKeyModal(true)}
            >
                <KeyIcon />
                <Translate id='exportPrivateKey.button' />
            </FormButton>
            {showExportKeyModal && (
                <ExportKeyModal
                    onClose={() => setShowExportKeyModal(false)}
                    isOpen={showExportKeyModal}
                    secretKey={secretKey}
                />
            )}
        </StyledContainer>
    );
};
