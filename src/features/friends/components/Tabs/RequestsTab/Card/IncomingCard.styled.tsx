import styled from 'styled-components'

export const StyledIncomingCard = styled.div`
    width: 100%;
    padding-bottom: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.card.border};

    &:last-child {
        border-bottom: none;
    }

    &.padding {
        padding: 10px 0;
    }


    .info {
        width: 100%;
        display: flex;
        justify-content: space-between;
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
    
    .left {
        display: flex;
        flex-direction: column;
        gap: 7px;
    }

    .full_name {
        font-weight: 700;
        text-overflow: ellipsis;
        color: #e1e3e6;
        cursor: pointer;
    }
    
    .organization {
        color: #939393;
        font-size: 13px;
    }
    
    .chat-mobile {
        display: none;
    }
    
    @media screen and (max-width: 800px){
        .chat-mobile {
            display: block;
        }
        
        .chat-desktop {
            display: none;
        }

        .organization {
            display: none;
        }
    }
`
