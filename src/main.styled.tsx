import styled from 'styled-components'

export const StyledContainer = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 15px;
    background-color: #141414;
    
    input {
        color: ${({ theme }) => theme.text};
        background-color: ${({ theme }) => theme.card.background} !important;
        caret-color: ${({ theme }) => theme.text}; 
    }

    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.card.background} inset;
        -webkit-text-fill-color: ${({ theme }) => theme.text};
        caret-color: ${({ theme }) => theme.text}; 
    }

    input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.card.background} inset;
        -webkit-text-fill-color: ${({ theme }) => theme.text};
        caret-color: ${({ theme }) => theme.text};
    }

    input:-webkit-autofill:hover {
        -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.card.background} inset;
        -webkit-text-fill-color: ${({ theme }) => theme.text};
        caret-color: ${({ theme }) => theme.text}; 
    }
`
