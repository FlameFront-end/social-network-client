import styled from 'styled-components'

export const TextButtonWrapper = styled.button`
    display: inline-block;
    color: ${({ theme }) => theme.accent};
    text-decoration: none;
    cursor: pointer;
    
    &:hover {
        text-decoration: underline;
    }
`
