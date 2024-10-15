import styled from 'styled-components'

export const AvatarStyledWrapper = styled.div`
    position: relative;
    
    .absolute-content {
        position: absolute;
        bottom: 15%;
        right: 15%;
        transform: translate(50%, 50%);
        z-index: 1;
    }
    
    .online {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #4bb34b;
    }
    
    .last {
        border-radius: 9px;
        background-color: #656565;
        font-weight: 700;
        font-size: 12px;
        padding: 2px 4px 2px;
    }
    
`
