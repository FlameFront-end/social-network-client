import styled from 'styled-components'
import Card from '../../../kit/components/Card'

export const StyledUserCard = styled(Card)`
    width: 100%;
    flex-basis: calc(33.33% - 16px);

    @media screen and (max-width: 1000px) {
        flex-basis: calc(33.33% - 16px);
    }
    
    @media screen and (max-width: 800px) {
        flex-basis: 100%;
    }

    
    .full_name {
        max-width: 170px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: ${({ theme }) => theme.text};
        cursor: pointer;
    }
`
