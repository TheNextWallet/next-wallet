import React, { useState } from 'react';
import styled from 'styled-components';

import { COLORS } from '../../../utils/theme';

const Styles = {
    Table: styled.table({
        width: '100%',
        padding: '0 30px',
        background: COLORS.darkGray,
        borderCollapse: 'collapse'
    }),
    Head: styled.thead({
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }),
    Body: styled.tbody({

    }),
    Cell: styled.td({
        color: COLORS.green,
        border: `1px solid ${COLORS.darkGreen}`,
        padding: '5px',
    }),
    Button: styled.div({
        cursor: 'pointer',
        padding: '10px 15px',
        background: COLORS.darkGreen,
        borderRadius: '15px',
        marginRight: '15px',
        display: 'inline-block',
        color: COLORS.green,
        marginTop: '15px',
        marginBottom: '15px'
    })
};

const InvoiceSheet = () => {
    const [lines, setLines] = useState(2);

    return (
        <>
            <Styles.Table>
                <Styles.Head>
                    <tr>
                        <Styles.Cell />
                        <Styles.Cell>#</Styles.Cell>
                        <Styles.Cell>Product/Service</Styles.Cell>
                        <Styles.Cell>Description</Styles.Cell>
                        <Styles.Cell>QTY</Styles.Cell>
                        <Styles.Cell>Rate</Styles.Cell>
                        <Styles.Cell>Amount</Styles.Cell>
                        <Styles.Cell />
                    </tr>
                </Styles.Head>
                <Styles.Body>
                    {[...Array(lines)].map((_, index) => (
                        <tr key={index}>
                            <Styles.Cell />
                            <Styles.Cell>{index + 1}</Styles.Cell>
                            <Styles.Cell>
                                <input type="text"/>
                            </Styles.Cell>
                            <Styles.Cell>
                                <input type="text"/>
                            </Styles.Cell>
                            <Styles.Cell>
                                <input type="text"/>
                            </Styles.Cell>
                            <Styles.Cell>
                                <input type="text"/>
                            </Styles.Cell>
                            <Styles.Cell>
                                <input type="text"/>
                            </Styles.Cell>
                            <Styles.Cell />
                        </tr>
                    ))}
                </Styles.Body>
            </Styles.Table>
            <div>
                <Styles.Button onClick={() => setLines((state) => state + 1)}>
                    Add line
                </Styles.Button>
                <Styles.Button onClick={() => setLines(2)}>
                    Clear all lines
                </Styles.Button>
            </div>
        </>
    );
};

export default InvoiceSheet;
