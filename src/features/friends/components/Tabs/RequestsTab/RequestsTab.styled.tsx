import styled from 'styled-components'
import { Card } from '@/kit'

export const StyledRequestsTabWrapper = styled(Card)`
    .tabs {
        display: flex;
        gap: 12px;
        margin-bottom: 12px;
        
        .tab-btn {
            display: flex;
            justify-content: center;
            width: 110px;
            font-weight: 500;

            &.active {
                font-weight: 700;
                background-color: rgba(255, 255, 255, 0.04);
            }
        }
    }
`
