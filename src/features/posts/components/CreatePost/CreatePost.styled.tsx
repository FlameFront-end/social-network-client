import styled from 'styled-components'
import { Card } from '@/kit'

export const StyledCreatePostWrapper = styled(Card)`
    display: flex;
    flex-direction: column;
    gap: 12px;

    .top {
        display: flex;
        gap: 12px;
    }

    .description {
        width: 100%;
        background-color: transparent !important;
        border: none;
        resize: none; 

        &:focus {
            border: none;
            outline: none;
        }
    }
    .preview {
        width: 100%;
        height: auto;
        margin-bottom: 15px;
        object-fit: cover;
        border-radius: 12px;
    }

    
    .buttons-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        button {
            width: max-content;
        }
    }
`
