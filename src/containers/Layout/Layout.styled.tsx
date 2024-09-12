import styled from 'styled-components'

export const StyledLayoutWrapper = styled.div`
    background-color: ${({ theme }) => theme.card.border};
    color: ${({ theme }) => theme.text};
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
`
