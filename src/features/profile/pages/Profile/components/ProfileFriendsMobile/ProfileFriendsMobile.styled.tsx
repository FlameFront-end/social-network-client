import styled from 'styled-components'
import { Card } from '@/kit'

export const StyledProfileFriendsMobileWrapper = styled(Card)`
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 20px;
    
    cursor: pointer;

    .left-friends-mobile {
        position: relative; 
        display: flex;
        align-items: center;
        gap: 10px;

        .count {
            color: #e1e3e6;
            font-size: 15px;
            font-weight: 500;
        }
    }

    .right-friends-mobile {
        position: relative;
        display: flex;
    }

    .avatar {
        position: absolute;
    }
`
