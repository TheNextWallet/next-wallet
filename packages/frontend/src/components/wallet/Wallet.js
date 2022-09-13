import React from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';

import { isWhitelabel } from '../../config/whitelabel';
import getCurrentLanguage from '../../hooks/getCurrentLanguage';
import classNames from '../../utils/classNames';
import { COLORS } from '../../utils/theme';
import { SHOW_NETWORK_BANNER } from '../../utils/wallet';
import { getTotalBalanceInFiat } from '../common/balance/helpers';
import RemoveLinkRecoveryBanner from '../common/RemoveLinkRecoveryBanner';
import Container from '../common/styled/Container.css';
import ActivitiesWrapper from './ActivitiesWrapper';
import CreateCustomNameModal from './CreateCustomNameModal';
import CreateFromImplicitSuccessModal from './CreateFromImplicitSuccessModal';
import FungibleTokens from './FungibleTokens';
import LinkDropSuccessModal from './LinkDropSuccessModal';
import NFTs from './NFTs';
import { ZeroBalanceAccountImportedModal } from './ZeroBalanceAccountImportedModal';

const StyledContainer = styled(Container)`
    font-family: 'Poppins', sans-serif;
    @media (max-width: 991px) {
        margin: -5px auto 0 auto;
        &.showing-banner {
            margin-top: -15px;
            margin-bottom: 30px;
        }
    }
    
    .coingecko {
        color: #B4B4B4;
        align-self: end;
        margin: 20px;
        @media (max-width: 991px) {
            margin: -25px 0 25px 0;
        }
    }

    .sub-title {
        font-size: 14px;
        margin-bottom: 80px;

        &.balance {
            margin-top: 0;
            display: flex;
            align-items: center;
            font-size: 18px;
            line-height: 24px;
            color: ${COLORS.lightText};
            z-index: 1;
        }

        &.tokens {
            color: #72727a;
            margin-top: 20px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            max-width: unset;

            @media (min-width: 768px) {
                padding: 0 20px;
            }

            .dots {
                :after {
                    position: absolute;
                    content: ".";
                    animation: link 1s steps(5, end) infinite;

                    @keyframes link {
                        0%,
                        20% {
                            color: rgba(0, 0, 0, 0);
                            text-shadow: 0.3em 0 0 rgba(0, 0, 0, 0),
                                0.6em 0 0 rgba(0, 0, 0, 0);
                        }
                        40% {
                            color: #24272a;
                            text-shadow: 0.3em 0 0 rgba(0, 0, 0, 0),
                                0.6em 0 0 rgba(0, 0, 0, 0);
                        }
                        60% {
                            text-shadow: 0.3em 0 0 #24272a,
                                0.6em 0 0 rgba(0, 0, 0, 0);
                        }
                        80%,
                        100% {
                            text-shadow: 0.3em 0 0 #24272a, 0.6em 0 0 #24272a;
                        }
                    }
                }
            }
        }
    }

    .left {
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 730px;
        background: ${COLORS.darkGray};
        border-radius: 30px;
        position: relative;
        padding: 30px;

        .bg-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        > svg {
            margin-top: 25px;
        }

        .total-balance {
            margin: 80px 0 20px 0;
            width: 100%;
            text-align: center;
            font-weight: 700;
            font-size: 54px;
            line-height: 103.4%;
            color: ${COLORS.beige};
            z-index: 1;
        }

        @media (min-width: 992px) {
            height: max-content;
        }

        .buttons {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            z-index: 1;
            margin-bottom: 20px;

            .send {
                margin-bottom: 0;
                > div {
                    background-color: #FF7294;
                }
                :hover {
                    > div {
                        filter: drop-shadow(0px 10px 30px #FF7294);
                    }
                }
            }

            .receive {
                margin-bottom: 0;
                > div {
                    background-color: ${COLORS.green};
                }
                :hover {
                    > div {
                        filter: drop-shadow(0px 10px 30px ${COLORS.green});
                    }
                }
            }

            .dao {
                > div {
                    background-color: #7C56F6;
                }
                :hover {
                    > div {
                        filter: drop-shadow(0px 10px 30px #7C56F6);
                    }
                }
            }

            .report {
                > div {
                    background-color: #C6FA5A;
                }
                :hover {
                    > div {
                        filter: drop-shadow(0px 10px 30px #C6FA5A);
                    }
                }
            }

            button {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: auto;
                height: auto;
                background-color: transparent !important;
                border: 0;
                padding: 0;
                margin: 0 30px;
                border-radius: 0;
                font-size: 16px;
                line-height: 24px;
                font-weight: 400;
                color: ${COLORS.lightText} !important;

                > div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 64px;
                    height: 64px;
                    min-width: 64px;
                    width: 64px;
                    border-radius: 50%;
                    margin-bottom: 10px;
                    transition: 100ms;
                }

                svg {
                    width: 24px !important;
                    height: 24px !important;
                    margin: 0 !important;
                    path, rect {
                        stroke: rgb(0, 5, 3);
                    }
                }
            }
        }

        .tab-selector {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            padding: 10px;
            z-index: 1;
            background: ${COLORS.black};
            border-radius: 20px;

            > div {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 18px 0;
                color: ${COLORS.black};
                font-size: 18px;
                line-height: 24px;
                background-color: ${COLORS.green};

                &.inactive {
                    background-color: transparent;
                    cursor: pointer;
                    color: ${COLORS.lightText};
                    transition: color 100ms;

                    :hover {
                        color: ${COLORS.green};
                    }
                }
            }

            .tab-balances {
                border-radius: 15px;
            }

            .tab-collectibles {
                border-radius: 15px;
            }
        }
    }

    button {
        &.gray-blue {
            width: 100% !important;
            margin-top: 35px !important;
        }
    }

    h2 {
        font-weight: 900;
        font-size: 22px;
        align-self: flex-start;
        margin: 50px 0 30px 0;
        text-align: left;
        color: #24272a;
    }

    .deposit-banner-wrapper {
        width: 100%;
        .deposit-near-banner {
            > div {
                border-top: 1px solid #F0F0F1;
                padding: 20px;
        
                @media (max-width: 991px) {
                    margin: 0 -14px;
                    padding: 20px 0;
                    border-bottom: 15px solid #F0F0F1;
                }
        
                @media (max-width: 767px) {
                    padding: 20px 14px 20px 14px;
                }
            }
        }
    }

    @media (max-width: 1199px) {
        .left {
            .buttons {
                .send, .receive {
                    margin-bottom: 30px;
                }
            }
        }
    }
    @media (max-width: 991px) {
        .left {
            margin-bottom: 64px;
        }
    }
`;

const Wallet = (
    {
        tab,
        setTab,
        accountId,
        accountExists,
        balance,
        linkdropAmount,
        createFromImplicitSuccess,
        createCustomName,
        zeroBalanceAccountImportMethod,
        fungibleTokensList,
        tokensLoading,
        sortedNFTs,
        handleCloseLinkdropModal,
        handleSetCreateFromImplicitSuccess,
        handleSetCreateCustomName,
        handleSetZeroBalanceAccountImportMethod,
        userRecoveryMethods
    }
) => {
    const currentLanguage = getCurrentLanguage();
    const totalAmount = getTotalBalanceInFiat(
        fungibleTokensList,
        currentLanguage
    );

    const shouldShowRemoveLinkRecoveryBanner = !isWhitelabel() && (userRecoveryMethods.some(({ kind }) => kind === 'email')
        || userRecoveryMethods.some(({ kind }) => kind === 'phone'));

    return (
        <StyledContainer className={SHOW_NETWORK_BANNER ? 'showing-banner' : ''}>
            {shouldShowRemoveLinkRecoveryBanner && <RemoveLinkRecoveryBanner />}
            <div className="split">
                <div className="left">
                    <div className="tab-selector">
                        <div
                            className={classNames([
                                'tab-balances',
                                tab === 'collectibles' ? 'inactive' : '',
                            ])}
                            onClick={() => setTab('')}
                        >
                            <Translate id="wallet.balances" />
                        </div>
                        <div
                            className={classNames([
                                'tab-collectibles',
                                tab !== 'collectibles' ? 'inactive' : '',
                            ])}
                            onClick={() => setTab('collectibles')}
                        >
                            <Translate id="wallet.collectibles" />
                        </div>
                    </div>
                    {tab === 'collectibles' ? (
                        <NFTs tokens={sortedNFTs} />
                    ) : (
                        <FungibleTokens
                            currentLanguage={currentLanguage}
                            totalAmount={totalAmount}
                            balance={balance}
                            tokensLoading={tokensLoading}
                            fungibleTokens={fungibleTokensList}
                            accountExists={accountExists}
                            fungibleTokensList={fungibleTokensList}
                        />
                    )}
                </div>
                <div className="right">
                    <ActivitiesWrapper />
                </div>
            </div>
            {linkdropAmount !== '0' && (
                <LinkDropSuccessModal
                    onClose={handleCloseLinkdropModal}
                    linkdropAmount={linkdropAmount}
                />
            )}
            {createFromImplicitSuccess && (
                <CreateFromImplicitSuccessModal
                    onClose={handleSetCreateFromImplicitSuccess}
                    isOpen={createFromImplicitSuccess}
                    accountId={accountId}
                />
            )}
            {createCustomName && (
                <CreateCustomNameModal
                    onClose={handleSetCreateCustomName}
                    isOpen={createCustomName}
                    accountId="satoshi.near"
                />
            )}
            {zeroBalanceAccountImportMethod && (
                <ZeroBalanceAccountImportedModal
                    onClose={handleSetZeroBalanceAccountImportMethod}
                    importMethod={zeroBalanceAccountImportMethod}
                    accountId={accountId}
                />
            )}
        </StyledContainer>
    );
};

export default Wallet;
