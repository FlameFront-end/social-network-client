import styled from 'styled-components'
import Card from '../../../../kit/components/Card'

export const StyledEditProfileTab = styled(Card)`
    width: 100%;
    
    .content {
        margin: 0 auto;
        width: 100%;
    }
    
    .label {
        width: 300px;
        color: #939393;
        float: left;
        text-align: right;
        text-wrap: nowrap;
    }
    
    .ant-form-item {
        margin-bottom: 0;
    }
    
    .ant-form-item-control-input-content {
        display: flex;
    }
    
    *::placeholder {
        color: #939393 !important;
    }
    
    button {
        width: max-content !important;
    }
    
    .save {
        margin: 0 auto;
        width: max-content !important;
    }
    
    .divider {
        width: 100%;
        height: 1px;
        border-radius: 30px;
        background-color: #363738;
    }
    
    .space {
        display: flex;
        margin-bottom: 10px;
    }
    
    .ant-space-item:first-child {
        width: 100%;
    }
`
