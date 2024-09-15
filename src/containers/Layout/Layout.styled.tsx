import styled from 'styled-components'
import { Layout } from 'antd'

export const StyledLayout = styled(Layout)`
    min-height: calc(100vh - 50px - 16px);
    max-width: 1300px;
    display: flex;
    gap: 16px;
    background-color: #141414;
    margin: 16px auto;
`

export const StyledContent = styled(Layout.Content)`
    margin-bottom: 16px;
    input {
        color: ${({ theme }) => theme.text} !important;
        background-color: ${({ theme }) => theme.card.background} !important;
        caret-color: ${({ theme }) => theme.text} !important;
    }

    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.card.background} inset !important;
        -webkit-text-fill-color: ${({ theme }) => theme.text} !important;
        caret-color: ${({ theme }) => theme.text} !important;
    }

    input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.card.background} inset !important;
        -webkit-text-fill-color: ${({ theme }) => theme.text} !important;
        caret-color: ${({ theme }) => theme.text} !important;
    }

    input:-webkit-autofill:hover {
        -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.card.background} inset !important;
        -webkit-text-fill-color: ${({ theme }) => theme.text} !important;
        caret-color: ${({ theme }) => theme.text} !important;
    }
`
