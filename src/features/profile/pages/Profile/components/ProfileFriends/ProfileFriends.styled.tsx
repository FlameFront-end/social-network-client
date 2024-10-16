import styled from 'styled-components'

export const StyledProfileFriendsWrapper = styled.div`
    background-color: #19191a;
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 20px;
    border-radius: 12px;
    
    cursor: pointer;

    .left {
        position: relative; 
        display: flex;
        align-items: center;
        gap: 10px;

        .count {
            color: #e1e3e6;
            font-size: 15px;
            font-weight: 500;
        }
    }

    .right {
        position: relative;
        display: flex;
    }

    .avatar {
        position: absolute;
    }
`
