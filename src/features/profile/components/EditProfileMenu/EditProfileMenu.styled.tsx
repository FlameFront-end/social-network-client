import styled from 'styled-components'
import Card from '../../../kit/components/Card'

export const StyledEditProfileMenu = styled(Card)`
    width: 350px; 
    
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 5px;
`

export const StyledEditProfileMenuItem = styled.button`
    width: 100%;
    text-align: start;
    border-radius: 8px;
    padding: 5px;
    transition: background-color .2s ease;

    &.active, &:hover {
        background-color: rgba(255, 255, 255, 0.08);
    }
`
