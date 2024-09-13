import styled from 'styled-components'

export const StyledRegisterWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    height: 100vh;

    label {
        color: ${({ theme }) => theme.text} !important;
    }
    
    .upload-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`
