import React from 'react';
import styled from 'styled-components';

const Styles = {
    Field: styled.div({
        marginBottom: '30px'
    }),
    Title: styled.div({

    }),
    Input: styled.input({

    })
};

const InvoiceField = ({ title, ...props }) => {
    return (
        <Styles.Field>
            <Styles.Title>{title}</Styles.Title>
            <Styles.Input {...props} />
        </Styles.Field>
    );
};

export default InvoiceField;
