import styled from 'styled-components'
import { Card } from '@/kit'

export const StyledPostWrapper = styled(Card)`
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    .top {
        display: flex;
        gap: 12px;
    }
    
    .image-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        
        gap: 12px;
        
        img {
            width: 100%;
            border-radius: 12px;
        }
    }
`
