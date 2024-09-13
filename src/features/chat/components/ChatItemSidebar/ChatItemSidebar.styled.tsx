import styled from 'styled-components'

export const StyledChatItemSidebarWrapper = styled.div`
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid gray;
    
    .image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
    
    .full_name {
        font-weight: 600;
        font-size: 17px;
        color: ${({ theme }) => theme.text};
    }

    .last_message {
        color: ${({ theme }) => theme.text_light};
        max-width: 180px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    &:hover {
        background-color: ${({ theme }) => theme.chat.hoverBackground};
    }

    &.last {
        border-bottom: none;
    }

    &.active {
        background-color: ${({ theme }) => theme.chat.selectBackground};

        .last_message {
            color: ${({ theme }) => theme.text};
        }
    }
`
