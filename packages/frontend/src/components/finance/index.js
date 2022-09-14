import React from 'react';
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
    return (
        <Styles.Container>
            <FinanceNav />
            <Styles.Router>
                <FinanceHeader />
                <Switch>
                    <Route path={`${match.url}/invoices`} component={FinanceInvoices} />
                </Switch>
            </Styles.Router>
        </Styles.Container>
    );
};

export default Finance;
