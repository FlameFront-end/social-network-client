import styled from 'styled-components'

export const StyledFriendsWrapper = styled.div`
    width: 100%;
    height: 100%;
    
    .select-mobile {
        position: relative;
        padding: 12px;
        display: none;
    }
    
    .mobile-select-content {
        position: absolute;
        top: 45px;
        left: 10px;
        z-index: 1;
    }
    
    .tabs-content {
        max-width: 550px;
        width: 100%;
        
        .full-height {
            min-height: calc(100vh - 32px - 46px);
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

    .no-data {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: calc(100vh - 180px);
        margin: 0;

        text-align: center;

        font-size: 24px;
    }

    button {
        width: max-content;
    }

    @media screen and (max-width: 800px) {
        background-color: #19191a;

        .desktop {
            display: none;
        }

        .select-mobile {
            display: block;
        }
        
        .mobile-select-content {
            border: 1px solid ${({ theme }) => theme.card.border} !important;
            background-color: ${({ theme }) => theme.card.background};
            width: max-content;
        }
    }
`
