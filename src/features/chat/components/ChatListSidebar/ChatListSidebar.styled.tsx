import styled from 'styled-components'

export const StyledChatListWrapper = styled.div`
    overflow-y: auto;
    width: 400px;

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
`
