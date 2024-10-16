import styled from 'styled-components'
import { Card } from '@/kit'

export const StyledProfileFriendsDesktopWrapper = styled(Card)`
    position: sticky;
    top: 12px;
    height: 260px;
    width: 345px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .count {
        span {
            color: #e1e3e6;
            font-size: 15px;
            font-weight: 500;
            margin-right: 3px;
        }
    }
    
    .list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, auto);
        gap: 4px;
        
        .friend {
            cursor: pointer;
            width: max-content;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
`
