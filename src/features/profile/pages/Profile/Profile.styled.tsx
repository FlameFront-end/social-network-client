import styled from 'styled-components'

export const StyledProfileWrapper = styled.main`
    padding-bottom: 100px;
    
    .grid {
        display: grid;
        grid-template-columns: 10fr 5fr;
        gap: 15px;
    }

    .left {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    @media screen and (max-width: 800px){
        .grid {
            display: block;
        }
        
        .right {
            display: none;
        }
    }
`
