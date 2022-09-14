import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../utils/theme';

const Styles = {
    Invoice: styled.div({
        padding: '30px',
        borderRadius: '15px',
        background: COLORS.darkGreen,
        marginBottom: '15px',
        cursor: 'pointer',
        color: COLORS.green
    })
};

const FinanceInvoices = ({ invoices, onInvoice }) => {
    return (
        <div>
            {[...Array(invoices)].map((_, index) => (
                <Styles.Invoice key={index} onClick={onInvoice}>
                    Invoice No. {index + 1}
                </Styles.Invoice>
            ))}
        </div>
    );
};

export default FinanceInvoices;
