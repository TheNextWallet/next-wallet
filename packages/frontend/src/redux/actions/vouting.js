import { transactions } from 'near-api-js';
import { createActions } from 'redux-actions';

import { showAlert } from '../../utils/alerts';
import {
    signAndSendTransaction
} from '../../utils/staking';

import {
    VOUTING_GAS_BASE
} from '../../config';
import { last } from 'lodash';

const {
    functionCall
} = transactions;

export const { vouting } = createActions({
    VOUTING: {
        VOTE: [
            async (daoId, proposalNumber, vote, amount) => {
                return await signAndSendTransaction({
                    receiverId: daoId,
                    actions: [
                        functionCall(
                            'act_proposal',
                            { id: proposalNumber, action: vote }, // "VoteApprove" | "VoteRemove" | "VoteReject"
                            VOUTING_GAS_BASE * 5,
                            amount || '0'
                        ),
                    ],
                });
            },
            () => showAlert({ onlyError: true })
        ],
    }
});


export const handleVoutingAction = ({ daoId, proposalId, vote, amount }) => async (dispatch, getState) => {
    //TODO: handle case with no auth
    const proposalNumber = Number(last(proposalId.split('-')));
    await dispatch(vouting.vote(daoId, proposalNumber, vote, amount));
};
