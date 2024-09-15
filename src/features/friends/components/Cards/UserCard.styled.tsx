import styled from 'styled-components'
import Card from '../../../kit/components/Card'

export const StyledUserCard = styled(Card)`
    width: 100%;
    flex-basis: calc(33.33% - 16px);
    
    .full_name {
        color: ${({ theme }) => theme.text};
    }
`
