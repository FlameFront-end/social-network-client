import styled from 'styled-components'

export const StyledChatHeader = styled.div`
    position: fixed;
    z-index: 999;
    top: 0;
    padding: 20px;
    width: calc(100% - 270px);
    max-width: 900px;
    background-color: ${({ theme }) => theme.card.background};


    .back-mobile {
        display: none;
        
        .anticon-arrow-left {
            color: #1890ff;
            font-size: 20px;
        }
    }
    
    @media screen and (max-width: 800px){
        left: 0;
        width: 100%;
        
        .back-mobile {
            display: block ;
        }
    }

    
`
