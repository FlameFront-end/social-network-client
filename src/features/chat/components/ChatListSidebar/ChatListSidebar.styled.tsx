import styled from 'styled-components'

export const StyledChatListWrapper = styled.div`
    overflow-y: auto;
    min-width: 300px;
    max-width: 300px;
    padding: 0 8px;

    background-color: ${({ theme }) => theme.card.background};
    border: 1px solid ${({ theme }) => theme.card.border};

    border-right: none;
    border-radius: 10px 0 0 10px;

    .spinner-wrapper {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .no_chats {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`
