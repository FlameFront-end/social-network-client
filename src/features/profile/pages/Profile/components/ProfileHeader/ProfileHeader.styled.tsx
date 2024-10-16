import styled from 'styled-components'
import Card from '../../../../../kit/components/Card'

export const StyledProfileHeader = styled(Card)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    
    @media screen and (max-width: 800px) {
        justify-content: center;
    }
    
    .left {
        display: flex;
        gap: 12px;

        @media screen and (max-width: 800px) {
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 100%;
        }

        .info {
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;

            .name {
                font-size: 21px;
                color: #e1e3e6;
                font-weight: 600;
            }

            .status {
                font-size: 13px;
                font-weight: 400;
            }

            .list {
                display: flex;
                gap: 10px;

                .item {
                    color: #939393;
                }
                
                .public {
                    display: none;
                }

                @media screen and (max-width: 1000px) {
                    flex-direction: column;
                }

                @media screen and (max-width: 800px) {
                    flex-direction: row;
                    justify-content: center;
                    
                    .public {
                        display: block;
                    }
                }
            }
        }   
    }
    
    .right {
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

            @media screen and (max-width: 800px) {
                display: none;
            }
        }
    }
`
