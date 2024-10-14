import styled from 'styled-components'
import Card from '../../../kit/components/Card'

export const StyledUserCard = styled(Card)`
    width: 100%;
    flex-basis: calc(50% - 16px);
    
    .info {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        
        .column {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .icon {
            font-size: 20px;
        }
    }
    
    &.padding {
        padding: 10px 0;
    }
    
    
    @media screen and (max-width: 800px) {
        flex-basis: 100%;
    }

    @media screen and (max-width: 800px) {
        border: none;
        padding: 0;
    }

    .info {
        flex-direction: row;
        justify-content: space-between;
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
