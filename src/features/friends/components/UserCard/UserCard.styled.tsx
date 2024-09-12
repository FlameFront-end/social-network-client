import styled from 'styled-components'

export const StyledUserCard = styled.div`
    width: 100%;
    height: 100%;
    
    .full_name {
        color: ${({ theme }) => theme.text};
    }
`
