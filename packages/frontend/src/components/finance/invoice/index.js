import React, { useState } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../utils/theme';
import InvoiceField from './InvoiceField';
import InvoiceSheet from './InvoiceSheet';

const Styles = {
    Container: styled.form({
        position: 'fixed',
        width: '100%',
        height: '100%',
        background: COLORS.black,
        left: 0,
        top: 0,
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
    }),
    Header: styled.div({
        padding: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        color: COLORS.green,
        fontWeight: 'bold',
        fontSize: '24px',
        marginBottom: '30px'
    }),
    Close: styled.div({
        cursor: 'pointer',
    }),
    Body: styled.div({
        padding: '0 30px',
        display: 'flex',
        justifyContent: 'space-around',
    }),
    Cell: styled.div({
        width: '40%',
    }),
    Button: styled.div({
        background: COLORS.darkGreen,
        borderRadius: '15px',
        padding: '18px 40px',
        lineHeight: '24px',
        cursor: 'pointer',
        fontWeight: 500,
        fontSize: '18px',
        color: COLORS.green,
    }),
    Footer: styled.div({
        position: 'sticky',
        background: COLORS.darkGray,
        bottom: 0,
        marginTop: 'auto',
        padding: '30px',
        display: 'flex',
        justifyContent: 'space-between',
    })
};

const Invoice = ({ open, onClose, onAdd }) => {
    const [invoiceNo, setInvoiceNo] = useState(1001);

    if (!open) {
        return null;
    }

    const onSave = () => {
        onAdd();
        onClose();
    };

    return (
        <Styles.Container>
            <Styles.Header>
                Invoice no. {invoiceNo}
                <Styles.Close onClick={onClose}>x</Styles.Close>
            </Styles.Header>
            <Styles.Body>
                <Styles.Cell>
                    <InvoiceField
                        title="Invoice No."
                        type="number"
                        min={0}
                        defaultValue={invoiceNo}
                        onChange={(e) => setInvoiceNo(e.target.value)}
                    />
                    <InvoiceField
                        title="Customer ID"
                        type="text"
                    />
                    <InvoiceField
                        title="Billing address"
                        type="textarea"
                    />
                </Styles.Cell>
                <Styles.Cell>
                    <InvoiceField
                        title="Terms"
                        type="number"
                        min={0}
                    />
                    <InvoiceField
                        title="Invoice date"
                        type="date"
                    />
                    <InvoiceField
                        title="Due date"
                        type="date"
                    />
                </Styles.Cell>
            </Styles.Body>
            <InvoiceSheet />
            <Styles.Footer>
                <Styles.Button onClick={onClose}>Cancel</Styles.Button>
                <Styles.Button onClick={onSave}>Save</Styles.Button>
            </Styles.Footer>
        </Styles.Container>
    );
};

export default Invoice;
