import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../utils/theme';
import Invoice from './invoice';

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

const FinanceHeader = ({ onAdd, newInvoice, setNewInvoice }) => {
    return (
        <>
            <Styles.Container>
                <Styles.New onClick={() => setNewInvoice(true)}>New invoice</Styles.New>
            </Styles.Container>
            <Invoice
                onAdd={onAdd}
                open={newInvoice}
                onClose={() => setNewInvoice(false)}
            />
        </>
    );
};

export default FinanceHeader;
