import styled from 'styled-components'
import { Flex } from 'antd'

export const ChatListStyledWrapper = styled(Flex)`
    width: 100%;
    height: calc(100vh - 40px);

    @media screen and (max-width: 800px) {
        height: calc(100vh - 70px);
    }
`
