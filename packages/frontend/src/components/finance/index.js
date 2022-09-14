import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import FinanceHeader from './FinanceHeader';
import FinanceInvoices from './FinanceInvoices';
import FinanceNav from './FinanceNav';

const Styles = {
    Container: styled.div({
        display: 'flex',
        maxWidth: '1440px',
        margin: '30px auto',
        padding: '0 30px',
    }),
    Router: styled.div({
        width: '100%'
    }),
};

const Finance = ({ match }) => {
    const [invoices, setInvoices] = useState(2);
    const [newInvoice, setNewInvoice] = useState(false);

    const onAdd = () => {
        setInvoices((state) => state + 1);
    };

    return (
        <Styles.Container>
            <FinanceNav />
            <Styles.Router>
                <FinanceHeader
                    onAdd={onAdd}
                    newInvoice={newInvoice}
                    setNewInvoice={setNewInvoice}
                />
                <Switch>
                    <Route
                        path={`${match.url}/invoices`}
                        render={() => (
                            <FinanceInvoices
                                invoices={invoices}
                                onInvoice={() => setNewInvoice(true)}
                            />
                        )}
                    />
                </Switch>
            </Styles.Router>
        </Styles.Container>
    );
};

export default Finance;
