import styled from 'styled-components'

export const StyledChatWrapper = styled.div`
    position: relative;
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
        word-wrap: anywhere;
        max-width: 700px;
    }

    .wrapper {
        width: 100%;
        height: calc(100vh - 70px);
        overflow-y: auto;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .bottom_wrapper {
        position: relative;
        margin: 10px 0;
    }
    
    .icon {
        svg {
            font-size: 20px;
            fill: ${({ theme }) => theme.text} !important;
        }
    }
    
    .emoji-picker {
        position: absolute;
        right: 0;
        bottom: 60px;
        z-index: 700;
    }
    
    .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3px;
        background-color: ${({ theme }) => theme.card.background};
        color: ${({ theme }) => theme.text};
        border: none;
        &:hover {
            background-color: ${({ theme }) => theme.card.background} !important;
            border: none
        }
    }
    
    .scroll-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        
        width: 38px;
        height: 38px;
        position: absolute;
        right: 40px;
        bottom: 40px;
        border: 1px solid #363738;
        border-radius: 50%;

        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20height%3D%227%22%20viewBox%3D%220%200%2014%207%22%20width%3D%2214%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1.64.232c-.424-.354-1.055-.296-1.408.128s-.296%201.055.128%201.408l6%205c.371.309.91.309%201.28%200l6-5c.424-.354.482-.984.128-1.408s-.984-.482-1.408-.128l-5.36%204.467z%22%20fill%3D%22%23656565%22%2F%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: center center;


        &:hover {
            background-color: rgba(255, 255, 255, 0.08) !important;
            border: 1px solid #363738;
        }
    }
    
    .send {
        &:hover {
            outline: none;
            border: none !important;
        }
    }
    
    .no_select_chat {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`
