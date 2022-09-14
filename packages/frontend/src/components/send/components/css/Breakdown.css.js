import styled from 'styled-components';

import { COLORS } from '../../../../utils/theme';

const Breakdown = styled.div`
    background-color: ${COLORS.darkGray};
    color: ${COLORS.beige};
    border-radius: 8px;

    > div {
        color: ${COLORS.beige};
        .amount {
            color: ${COLORS.green};
        }

        .currency {
            color: ${COLORS.beige};
        }
    }

    .breakdown {
        background-color: ${COLORS.darkGray};

        > div {
            > div {
                border-bottom: 1px solid;

                :last-of-type {
                    border-bottom: 0;
                }
            }
        }
    }

    .amount {
        color: ${COLORS.green};
    }

    &.transaction-details-breakdown {
        color: ${COLORS.green};
    }
`;

export default Breakdown;
