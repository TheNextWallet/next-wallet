import React, { useState } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../utils/theme';
import ClickToCopy from '../common/ClickToCopy';
import CopyIcon from '../svg/CopyIcon';
import ExpandDownIcon from '../svg/ExpandDownIcon';
import DaoItemProposal from './DaoItemProposal';
import DaoLogo from './DaoLogo';

const Styles = {
    Dao: styled.div({
        marginBottom: '40px',
    }),
    Header: styled.div({
        background: COLORS.darkGray,
        borderRadius: '30px',
        fontFamily: '\'Poppins\', sans-serif',
        padding: '35px 25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        boxShadow: '0 5px 10px black',
    }),
    Info: styled.div({
        display: 'flex',
    }),
    Name: styled.div({
        fontSize: '24px',
        fontWeight: 500,
        marginBottom: '10px',
        color: COLORS.beige,
    }),
    Id: styled.div({
        fontSize: '18px',
        color: COLORS.lightText,
        display: 'flex',
        alignItems: 'center',
        '& svg': {
            width: '24px',
            height: '24px',
            marginLeft: '8px',
        },
        '& path': {
            stroke: COLORS.lightText,
        },
    }),
    FundsTitle: styled.div({
        fontSize: '18px',
        marginBottom: '10px',
        color: COLORS.lightText,
    }),
    Funds: styled.div({
        fontSize: '24px',
        color: COLORS.green,
    }),
    Proposals: styled.div({
        fontSize: '24px',
        display: 'flex',
        alignItems: 'center',
        color: COLORS.beige,
        padding: '15px 20px',
        borderRadius: '15px',
        background: COLORS.darkGreen,
        cursor: 'pointer',
        outline: 'none',
        '& span': {
            color: COLORS.green,
            marginRight: '5px'
        },
    }),
    Members: styled.div({
        textAlign: 'right',
        fontSize: '24px',
        color: COLORS.beige,
        fontWeight: 'bold',
        '& div': {
            fontSize: '18px',
            color: COLORS.lightText,
            marginBottom: '5px',
            fontWeight: 'normal',
        }
    }),
    Body: styled.div(({ open }) => ({
        display: open ? 'block' : 'none',
        padding: '20px 50px',
        borderRadius: '30px',
        marginTop: '-10px',
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
        parsedMeta
    } = props;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen((state) => !state);

    return (
        <Styles.Dao>
            <Styles.Header>
                <Styles.Info>
                    <DaoLogo src={parsedMeta.flagLogo} />
                    <div>
                        <Styles.Name>{name}</Styles.Name>
                        <Styles.Id>
                            {id}
                            <ClickToCopy copy={id}>
                                <CopyIcon/>
                            </ClickToCopy>
                        </Styles.Id>
                    </div>
                </Styles.Info>
                <div>
                    <Styles.FundsTitle>
                        DAO funds
                    </Styles.FundsTitle>
                    <Styles.Funds>
                        {totalDaoFunds.toFixed(2)} USD
                    </Styles.Funds>
                </div>
                <Styles.Proposals onClick={activeProposalCount ? handleOpen : null}>
                    <span>{activeProposalCount}</span> active proposals
                    {activeProposalCount ? (
                        <ExpandDownIcon
                            style={{
                                rotate: open ? '0deg' : '180deg',
                                cursor: 'pointer',
                                transition: 'transform 0.3s'
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
                {activeProposalCount ?
                    proposal.data.filter(({ status }) => status === 'InProgress')
                        .map((item) => (
                            <DaoItemProposal key={item.id} {...item} />
                        )) : null
                }
            </Styles.Body>
        </Styles.Dao>
    );
};

export default DaoItem;
