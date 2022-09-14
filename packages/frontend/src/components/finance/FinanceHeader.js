import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../utils/theme';

const Styles = {
    Container: styled.div({
        width: '100%',
        padding: '15px 30px',
        background: COLORS.darkGray,
        borderRadius: '15px',
        marginBottom: '30px',
        display: 'flex'
    }),
    New: styled.div({
        cursor: 'pointer',
        borderRadius: '15px',
        marginLeft: 'auto',
        background: COLORS.darkGreen,
        color: COLORS.green,
        padding: '15px'
    })
};

const FinanceHeader = () => {
    return (
        <Styles.Container>
            <Styles.New>New</Styles.New>
        </Styles.Container>
    );
};

export default FinanceHeader;
