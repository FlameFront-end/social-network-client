import styled from 'styled-components'

export const StyledAccentButton = styled.button`
    color: ${({ theme }) => theme.revert_text};
    background-color: ${({ theme }) => theme.revert_background};
    border-radius: 10px;
    padding: 3px 10px;
`
