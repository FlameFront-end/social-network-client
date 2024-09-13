import styled from 'styled-components'
import { Input } from 'antd'

export const StyledInput = styled(Input)`
    color: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.card.border};
    background-color: ${({ theme }) => theme.card.background} !important;
    
    &::placeholder {
        color: ${({ theme }) => theme.text};
    }
    
    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    input {
        color: ${({ theme }) => theme.text};
        background-color: ${({ theme }) => theme.card.background} !important;
    }

    .anticon-eye-invisible {
        svg {
            fill: ${({ theme }) => theme.text} !important;
        }
    }
`

export const StyledInputPassword = styled(Input.Password)`
    color: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.card.border};
    background-color: ${({ theme }) => theme.card.background} !important;
    
    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    input {
        color: ${({ theme }) => theme.text};
        background-color: ${({ theme }) => theme.card.background} !important;
    }

    .anticon-eye-invisible {
        svg {
            fill: ${({ theme }) => theme.text} !important;
        }
    }

    &::placeholder {
        color: ${({ theme }) => theme.text};
    }
`
