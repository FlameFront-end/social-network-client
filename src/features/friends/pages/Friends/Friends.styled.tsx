import styled from 'styled-components'

export const StyledFriendsWrapper = styled.div`
    width: 100%;
    height: 100%;
    
    .tabs-content {
        max-width: 550px;
        width: 100%;
        
        .full-height {
            min-height: calc(100vh - 32px);
            margin-bottom: 16px;
        }

        @media screen and (max-width: 800px) {
            max-width: 100%;
        }
    }
    
    
    .spinner-wrapper {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center
    }
    
    .card-header {
        margin-bottom: 10px;
        padding: 0;
        
        h3 {
            font-size: 20px;
            color: ${({ theme }) => theme.text};
        }
    }
`
