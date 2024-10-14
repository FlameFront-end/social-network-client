import styled from 'styled-components'

export const StyledFriendsWrapper = styled.div`
    width: 100%;
    height: 100%;
    
    .card {
        width: 100%;
        height: 100%;

        @media screen and (max-width: 800px) {
            border: none;
        }
    }
    
    .card-wrapper {
        @media screen and (max-width: 800px) {
            border: none;
            padding: 0;
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

    p {
        font-size: 14px;
        color: ${({ theme }) => theme.text};
        margin-bottom: 0;
    }   
`
