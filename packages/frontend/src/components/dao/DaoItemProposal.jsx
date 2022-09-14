import React from 'react';
import styled from 'styled-components';

import getDistance from '../../utils/getDistance';
import { COLORS, MEDIA_QUERY } from '../../utils/theme';
import { formatNearAmount } from '../common/balance/helpers';
import OutIcon from '../svg/OutIcon';
import ThumbsDown from '../svg/ThumbsDown';
import ThumbsUp from '../svg/ThumbsUp';

const Styles = {
    Row: styled.div({
        padding: '30px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(165,165,165,0.5)',
        '&:last-child': {
            borderBottom: 0
        },
        [MEDIA_QUERY.mobile]: {
            flexDirection: 'column'
        }
    }),
    Cell: styled.div(({ align, display, padding }) => ({
        display,
        padding,
        maxWidth: `${100 / 3}%`,
        width: '100%',
        textAlign: align,
        justifyContent: 'space-between',
        [MEDIA_QUERY.mobile]: {
            maxWidth: '100%',
            textAlign: 'center',
            marginBottom: '15px',
            '&:last-child': {
                marginBottom: 0
            }
        }
    })),
    Title: styled.div({
        fontSize: '18px',
        marginBottom: '10px',
        color: COLORS.lightText,
    }),
    Value: styled.div(({ color = COLORS.beige }) => ({
        fontSize: '24px',
        fontWeight: 'bold',
        color,
    })),
    Vote: styled.div(({ positive = true }) => ({
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: positive ? COLORS.darkGreen : COLORS.darkRed
    })),
    Description: styled.div({
        maxWidth: '90%',
        width: '100%',
        fontSize: '24px',
        color: COLORS.beige,
        [MEDIA_QUERY.mobile]: {
            maxWidth: '100%',
            wordBreak: 'break-word'
        }
    }),
    Out: styled.div({
        alignSelf: 'flex-start',
        marginTop: '15px'
    })
};

const DaoItemProposal = ({ type, proposer, description, votePeriodEnd, kind }) => {
    const onVoteFor = () => {};
    const onVoteAgainst = () => {};
    const onOut = () => {};

    return (
      <>
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
                  <Styles.Vote onClick={onVoteFor}>
                      <ThumbsUp />
                  </Styles.Vote>
                  <Styles.Vote onClick={onVoteAgainst} positive={false}>
                      <ThumbsDown />
                  </Styles.Vote>
              </Styles.Cell>
              <Styles.Cell align="right">
                  <Styles.Title>Target</Styles.Title>
                  <Styles.Value>{kind?.receiverId}</Styles.Value>
              </Styles.Cell>
          </Styles.Row>
          <Styles.Row>
              <Styles.Description>
                  <Styles.Title>Description</Styles.Title>
                  {description}
              </Styles.Description>
              <Styles.Out onClick={onOut}>
                  <OutIcon />
              </Styles.Out>
          </Styles.Row>
      </>
    );
};

export default DaoItemProposal;
