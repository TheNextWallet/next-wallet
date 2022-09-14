import React from "react";
import styled from "styled-components";
import { DAO_VOUTING_OPTIONS } from "../../utils/constants";

import getDistance from "../../utils/getDistance";
import { COLORS, MEDIA_QUERY } from "../../utils/theme";
import { formatNearAmount } from "../common/balance/helpers";
import OutIcon from "../svg/OutIcon";
import ThumbsDown from "../svg/ThumbsDown";
import ThumbsUp from "../svg/ThumbsUp";

const Styles = {
    Proposal: styled.div(({ index }) => ({
        padding: "20px 50px",
        borderRadius: "30px",
        background: COLORS.darkGray,
        boxShadow: "0 5px 10px black",
        marginTop: "-10px",
        position: 'relative',
        zIndex: index
    })),
    Row: styled.div({
        padding: "30px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(165,165,165,0.5)",
        "&:last-child": {
            borderBottom: 0,
        },
        [MEDIA_QUERY.mobile]: {
            flexDirection: "column",
        },
    }),
    Cell: styled.div(({ align, display, padding }) => ({
        display,
        padding,
        maxWidth: `${100 / 3}%`,
        width: "100%",
        textAlign: align,
        justifyContent: "space-between",
        alignItems: 'center',
        [MEDIA_QUERY.mobile]: {
            maxWidth: "100%",
            textAlign: "center",
            marginBottom: "15px",
            "&:last-child": {
                marginBottom: 0,
            },
        },
    })),
    Title: styled.div({
        fontSize: "18px",
        marginBottom: "10px",
        color: COLORS.lightText,
    }),
    Value: styled.div(({ color = COLORS.beige }) => ({
        fontSize: "24px",
        fontWeight: "bold",
        color,
    })),
    Vote: styled.div(({ positive = true, isVoted = false, vote }) => {
        return ({
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: positive ? COLORS.darkGreen : COLORS.darkRed,
            cursor: isVoted ? "default" : "pointer",
            opacity: isVoted ? 0.5 : 1,
            border: isVoted && positive && vote === "Approve"
                ? `3px solid ${COLORS.darkGreen}`
                : !positive && vote === "Reject"
                    ? `3px solid ${COLORS.darkRed}`
                    : "none",
        });
    }),
    Description: styled.div({
        maxWidth: "90%",
        width: "100%",
        fontSize: "24px",
        color: COLORS.beige,
        [MEDIA_QUERY.mobile]: {
            maxWidth: "100%",
            wordBreak: "break-word",
        },
    }),
    Out: styled.div({
        alignSelf: "flex-start",
        marginTop: "15px",
    }),
    VoteAmount: styled.div({
        fontSize: "24px",
        fontWeight: "bold",
        color: COLORS.beige,
    }),
};

const DaoItemProposal = ({
    type,
    proposer,
    description,
    votePeriodEnd,
    kind,
    handleVote,
    onClose,
    daoId,
    id,
    votes,
    accountId,
    index
}) => {
    const { approve, reject } = DAO_VOUTING_OPTIONS;
    const isVoted = !!votes[accountId];

    const voteParams = {
        daoId: daoId,
        proposalId: id,
        amount: 0,
    };
    const parsedVotes = Object.keys(votes).reduce(
        (acc, cur) => {
            switch (votes[cur]) {
                case "Approve":
                    return { ...acc, approve: acc.approve + 1 };
                case "Reject":
                    return { ...acc, reject: acc.reject + 1 };
                default:
                    return { ...acc, remove: acc.remove + 1 };
            }
        },
        { approve: 0, reject: 0, remove: 0 }
    );

    return (
        <Styles.Proposal index={index}>
            <Styles.Row>
                <Styles.Cell>
                    <Styles.Title>Proposal type</Styles.Title>
                    <Styles.Value>{type}</Styles.Value>
                </Styles.Cell>
                <Styles.Cell align="center">
                    <Styles.Title>Proposer</Styles.Title>
                    <Styles.Value>{proposer}</Styles.Value>
                </Styles.Cell>
                <Styles.Cell align="right">
                    <Styles.Title>Time</Styles.Title>
                    <Styles.Value color={COLORS.green}>
                        {getDistance(votePeriodEnd)}
                    </Styles.Value>
                </Styles.Cell>
            </Styles.Row>
            <Styles.Row>
                <Styles.Cell>
                    <Styles.Title>Amount</Styles.Title>
                    <Styles.Value>
                        {formatNearAmount(kind?.amount)} NEAR
                    </Styles.Value>
                </Styles.Cell>
                <Styles.Cell display="flex" padding="0 5%">
                    <Styles.Vote
                        onClick={() =>
                            !isVoted &&
                            handleVote({ ...voteParams, vote: approve })
                        }
                        isVoted={isVoted}
                        vote={votes[accountId]}
                    >
                        <ThumbsUp />
                    </Styles.Vote>
                    <Styles.VoteAmount>{parsedVotes.approve}</Styles.VoteAmount>
                    <Styles.Vote
                        onClick={() =>
                            !isVoted &&
                            handleVote({ ...voteParams, vote: reject })
                        }
                        positive={false}
                        isVoted={isVoted}
                        vote={votes[accountId]}
                    >
                        <ThumbsDown />
                    </Styles.Vote>
                    <Styles.VoteAmount>{parsedVotes.reject}</Styles.VoteAmount>
                </Styles.Cell>
                <Styles.Cell align="right">
                    <Styles.Title>Target</Styles.Title>
                    <Styles.Value>{kind?.receiverId}</Styles.Value>
                </Styles.Cell>
            </Styles.Row>
            <Styles.Row>
                <Styles.Description>
                    <Styles.Title>Description</Styles.Title>
                    {description.split("$$$$")[0]}
                </Styles.Description>
                <Styles.Out onClick={onClose}>
                    <OutIcon />
                </Styles.Out>
            </Styles.Row>
        </Styles.Proposal>
    );
};

export default DaoItemProposal;
