import styled from 'styled-components'

export const StyledUserCard = styled.div`
    width: 100%;
    padding-bottom: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.card.border};
    
    &:last-child {
        border-bottom: none;
    }
    
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
