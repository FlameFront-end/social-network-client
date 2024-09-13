import styled from 'styled-components'

export const StyledFriendsWrapper = styled.div`
    width: 100%;
    height: 100%;
    
    .card {
        width: 100%;
        height: 100%;
    }
    
    .spinner-wrapper {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center
    }
    
    .title {
        font-size: 20px;
        color: ${({ theme }) => theme.text};
        margin-bottom: 15px;
    }
`
