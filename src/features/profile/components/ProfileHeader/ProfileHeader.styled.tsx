import styled from 'styled-components'
import Card from '../../../kit/components/Card'

export const StyledProfileHeader = styled(Card)`
    .item {
        color: #939393;
    }
    
    .detail {
        cursor: pointer;
    }
    
    .edit {
        color: #e1e3e6;
        align-items: center;
        display: flex;
        justify-content: center;
        text-align: center;
        
        border-radius: 8px;
        padding: 5px 10px;
        
        background-color: rgba(255, 255, 255, 0.10);
        transition: background-color .15s ease-out,color .15s ease-out;
    }
`
