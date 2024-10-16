import styled from 'styled-components'
import { Card } from '@/kit'

export const StyledProfilePhotosWrapper = styled(Card)`
    .content {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, auto);
        gap: 4px;

        border-radius: 12px;
        overflow: hidden;
    }
    
    img {
        width: 100%;
        aspect-ratio: 1 / 1; 
        object-fit: cover; 
    }
    
`
