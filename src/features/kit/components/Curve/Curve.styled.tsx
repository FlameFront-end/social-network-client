import styled from 'styled-components'

export const CurveStyled = styled.div`
    .svg, .background{
        position: fixed;
        height: calc(100vh + 600px);
        z-index: 990;
        width: 100vw;
        pointer-events: none;
        left: 0;
        top: 0;
    }
    
    .background{
        background-color: black;
        transition: opacity 0s linear 0.1s;
    }
    
    .route{
        position: absolute;
        left: 50%;
        top: 40%;
        color: white;
        font-size: 46px;
        z-index: 991;
        transform: translateX(-50%);
        text-align: center;
    }
`
