import styled from 'styled-components'

export const StyledChatWrapper = styled.div`
    padding: 20px;
    background-color: ${({ theme }) => theme.card.background};
    border: 1px solid ${({ theme }) => theme.card.border};
    border-radius: 0 10px 10px 0;
    width: 100%;

    .nick {
        font-size: 16px;
        cursor: pointer;
        color: ${({ theme }) => theme.accent};
    }

    .time {
        font-size: 12px;
        color: ${({ theme }) => theme.text_light};
    }

    .message {
        margin-top: 10px;
        color: ${({ theme }) => theme.text};
    }

    .wrapper {
        width: 100%;
        height: calc(100vh - 30px);
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .bottom_wrapper {
        margin: 10px 0;
    }
`
