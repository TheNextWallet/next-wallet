import React from 'react';
import { Translate } from 'react-localize-redux';
import styled from 'styled-components';

import { COLORS } from '../../utils/theme';
import FormButton from '../common/FormButton';
import NearCircleIcon from '../svg/NearCircleIcon.js';
import NFTBox from './NFTBox';

const StyledContainer = styled.div`
    &&& {
        width: 100%;

        .nft-box {
            background-color: ${COLORS.darkGray};
            margin-top: 15px;
            border-radius: 30px;

            :first-of-type {
                border-top: none;
            }
        }

        .empty-state {
            display: flex;
            align-items: center;
            flex-direction: column;
            text-align: center;
            padding: 50px 20px;
            background-color: ${COLORS.darkGray};
            border-radius: 8px;

            @media (max-width: 991px) {
                margin-top: 15px;
            }

            @media (min-width: 992px) {
                margin: 15px 15px 50px 15px;
            }

            > div {
                color: #B4B4B4;
            }

            svg {
                margin-bottom: 30px;
            }

            button {
                width: 100%;
                margin: 25px auto 0 auto;
            }
        }
    }
`;

const NFTs = ({ tokens }) => {
    const ownedTokens = tokens.filter((tokenDetails) => tokenDetails.ownedTokensMetadata && tokenDetails.ownedTokensMetadata.length);
    if (ownedTokens.length) {
        return (
            <StyledContainer>
                {ownedTokens.map((tokenDetails) => (
                    <NFTBox
                        key={tokenDetails.contractName}
                        tokenDetails={tokenDetails}
                    />
                ))}
            </StyledContainer>
        );
    }
    return (
        <StyledContainer>
            <div className='empty-state'>
                <NearCircleIcon color={COLORS.green}/>
                <div><Translate id='NFTs.emptyState' /></div>
                <FormButton color='dark-green' linkTo='https://awesomenear.com/categories/nft/'>
                    <Translate id='exploreApps.exploreApps' />
                </FormButton>
            </div>
        </StyledContainer>
    );
};

export default NFTs;
