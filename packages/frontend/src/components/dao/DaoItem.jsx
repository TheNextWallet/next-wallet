import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { handleVoutingAction } from "../../redux/actions/vouting";
import { selectAccountId } from "../../redux/slices/account";
import { COLORS, MEDIA_QUERY } from "../../utils/theme";
import ClickToCopy from "../common/ClickToCopy";
import CopyIcon from "../svg/CopyIcon";
import ExpandDownIcon from "../svg/ExpandDownIcon";
import DaoItemProposal from "./DaoItemProposal";
import DaoLogo from "./DaoLogo";
import VouteConfirmModal from "./VouteConfirmModal";

const Styles = {
    Dao: styled.div({
        marginBottom: "40px",
        [MEDIA_QUERY.mobile]: {
            padding: "0 15px",
        },
    }),
    Header: styled.div({
        background: COLORS.darkGray,
        borderRadius: "30px",
        fontFamily: "'Poppins', sans-serif",
        padding: "35px 25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        boxShadow: "0 5px 10px black",
        [MEDIA_QUERY.mobile]: {
            padding: "30px 15px",
            display: "block",
        },
    }),
    Info: styled.div({
        display: "flex",
        [MEDIA_QUERY.mobile]: {
            width: "100%",
        },
    }),
    Identity: styled.div({
        display: "flex",
        "& svg": {
            width: "24px",
            height: "24px",
            marginLeft: "8px",
        },
        "& path": {
            stroke: COLORS.lightText,
        },
        [MEDIA_QUERY.mobile]: {
            background: COLORS.darkGreen,
            borderRadius: "15px",
            padding: "15px 10px",
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "15px",
        },
    }),
    Name: styled.div({
        fontSize: "24px",
        fontWeight: 500,
        marginBottom: "10px",
        color: COLORS.beige,
    }),
    Id: styled.div({
        fontSize: "18px",
        color: COLORS.lightText,
        display: "flex",
        alignItems: "center",
    }),
    Copy: styled.div({
        display: "flex",
        alignSelf: "flex-end",
        [MEDIA_QUERY.mobile]: {
            alignSelf: "center",
        },
    }),
    FundsInfo: styled.div({
        [MEDIA_QUERY.mobile]: {
            float: "left",
            marginBottom: "15px",
        },
    }),
    FundsTitle: styled.div({
        fontSize: "18px",
        marginBottom: "10px",
        color: COLORS.lightText,
    }),
    Funds: styled.div({
        fontSize: "24px",
        color: COLORS.green,
    }),
    Proposals: styled.div({
        fontSize: "24px",
        display: "flex",
        alignItems: "center",
        color: COLORS.beige,
        padding: "15px 20px",
        borderRadius: "15px",
        background: COLORS.darkGreen,
        cursor: "pointer",
        outline: "none",
        "& span": {
            color: COLORS.green,
            marginRight: "5px",
        },
        [MEDIA_QUERY.mobile]: {
            float: "right",
            padding: 0,
            background: "none",
            fontSize: "16px",
            maxHeight: "16px",
        },
    }),
    Members: styled.div({
        textAlign: "right",
        fontSize: "24px",
        color: COLORS.beige,
        fontWeight: "bold",
        "& div": {
            fontSize: "18px",
            color: COLORS.lightText,
            marginBottom: "5px",
            fontWeight: "normal",
        },
        [MEDIA_QUERY.mobile]: {
            textAlign: "left",
            clear: "both",
        },
    }),
    Body: styled.div(({ open }) => ({
        display: open ? "block" : "none",
        padding: "20px 50px",
        borderRadius: "30px",
        marginTop: "-10px",
        background: COLORS.darkGray,
    })),
};

const DaoItem = (props) => {
    const {
        config: { name },
        id,
        totalDaoFunds,
        activeProposalCount,
        numberOfGroups,
        numberOfMembers,
        proposal,
        parsedMeta,
    } = props;

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState();
    const [loading, setLoading] = useState();
    const [voutingParams, setVoutingParams] = useState({
        daoId: "",
        proposalId: "",
        vote: "",
        amount: "",
    });
    const handleOpen = () => setOpen((state) => !state);

    const accountId = useSelector(selectAccountId);

    const handleVote = async ({ daoId, proposalId, vote, amount }) => {
        setVoutingParams({ daoId, proposalId, vote, amount });
        setConfirm(true);
    };

    const onVoutingAction = async () => {
        setLoading(true);
        try {
            await dispatch(handleVoutingAction(voutingParams));
            setConfirm(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Styles.Dao>
                <Styles.Header>
                    <Styles.Info>
                        <DaoLogo src={parsedMeta.flagLogo} />
                        <Styles.Identity>
                            <div>
                                <Styles.Name>{name}</Styles.Name>
                                <Styles.Id>{id}</Styles.Id>
                            </div>
                            <Styles.Copy>
                                <ClickToCopy copy={id}>
                                    <CopyIcon />
                                </ClickToCopy>
                            </Styles.Copy>
                        </Styles.Identity>
                    </Styles.Info>
                    <Styles.FundsInfo>
                        <Styles.FundsTitle>DAO funds</Styles.FundsTitle>
                        <Styles.Funds>
                            {totalDaoFunds.toFixed(2)} USD
                        </Styles.Funds>
                    </Styles.FundsInfo>
                    <Styles.Proposals
                        onClick={activeProposalCount ? handleOpen : null}
                    >
                        <span>{activeProposalCount}</span> active proposals
                        {activeProposalCount ? (
                            <ExpandDownIcon
                                style={{
                                    rotate: open ? "0deg" : "180deg",
                                    cursor: "pointer",
                                    transition: "transform 0.3s",
                                }}
                            />
                        ) : null}
                    </Styles.Proposals>
                    <Styles.Members>
                        <div>Members\Groups</div>
                        {numberOfMembers}\{numberOfGroups}
                    </Styles.Members>
                </Styles.Header>
                <Styles.Body open={open}>
                    {activeProposalCount
                        ? proposal.data
                              .filter(({ status }) => status === "InProgress")
                              .map((item) => (
                                  <DaoItemProposal
                                      key={item.id}
                                      onClose={() => setConfirm(false)}
                                      handleVote={handleVote}
                                      accountId={accountId}
                                      {...item}
                                  />
                              ))
                        : null}
                </Styles.Body>
            </Styles.Dao>
            {confirm && (
                <VouteConfirmModal
                    open={confirm}
                    onConfirm={onVoutingAction}
                    onClose={() => {
                        setConfirm(false);
                    }}
                    loading={loading}
                    {...voutingParams}
                />
            )}
        </div>
    );
};

export default DaoItem;
