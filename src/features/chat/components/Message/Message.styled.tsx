import styled from 'styled-components'
import { List } from 'antd'

export const StyledMessage = styled(List.Item)`
    width: 100%;
    border: none !important;
    
    border-radius: 12px;
    margin-bottom: 5px;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.02);
    }
    
    .wrapper {
        width: 100%;
        padding: 5px !important;
    }
    
    .full-width {
        width: 100%;
    }
    
    
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
    
    .reply-message {
        margin-top: 5px;

        .message {
            margin-top: 0px;
        }
        
        .separator {
            grid-area: separator;
            width: 2px;
            border-radius: 2px;
            background-color: ${({ theme }) => theme.accent};
        }


        .author {
            color: ${({ theme }) => theme.accent};
        }
    }
`
