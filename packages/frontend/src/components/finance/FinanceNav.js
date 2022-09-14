import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { COLORS } from '../../utils/theme';

const Styles = {
    Nav: styled.div({
        maxWidth: '240px',
        width: '100%',
        marginRight: '40px'
    }),
    Link: styled(NavLink)({
        display: 'block',
        borderRadius: '15px',
        padding: '18px 40px',
        background: COLORS.darkGreen,
        color: COLORS.green,
        fontSize: '20px',
        textAlign: 'center',
        marginBottom: '20px',
        '&.active, &:hover': {
            background: COLORS.green,
            color: COLORS.black,
            textDecoration: 'none',
        }
    })
};

const FinanceNav = () => {
    return (
        <Styles.Nav>
            <Styles.Link to="/finance/invoices">
                Invoices
            </Styles.Link>
            <Styles.Link to="/finance/reports">
                Reports
            </Styles.Link>
            <Styles.Link to="/finance/subscriptions">
                Subscriptions
            </Styles.Link>
        </Styles.Nav>
    );
};

export default FinanceNav;
