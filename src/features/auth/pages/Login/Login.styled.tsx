import styled from 'styled-components'

export const StyledLoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    height: 100vh;

    label {
        color: ${({ theme }) => theme.text} !important;
    }
`
