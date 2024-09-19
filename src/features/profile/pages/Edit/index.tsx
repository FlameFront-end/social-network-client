import { type FC, type ReactNode, useState } from 'react'
import EditProfileMenu from '../../components/EditProfileMenu'
import { EditProfile } from '../../components/tabs'
import Flex from '../../../kit/components/Flex'

const Edit: FC = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const getTabByIndex = (activeTabIndex: number): ReactNode => {
        switch (activeTabIndex) {
            case 0:
                return <EditProfile />
            default:
                return <></>
        }
    }

    return (
        <Flex gap={16}>
            {getTabByIndex(activeTabIndex)}
            <EditProfileMenu activeTabIndex={activeTabIndex} setActiveTabIndex={setActiveTabIndex}/>
        </Flex>
    )
}

export default Edit
