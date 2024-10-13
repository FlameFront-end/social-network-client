import { type FC, type ReactNode, useState } from 'react'
import EditProfileMenu from '../../components/EditProfileMenu'
import { EditContacts, EditProfile, EditInterests } from '../../components/tabs'
import { Flex } from '@/kit'

const Edit: FC = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)

    const getTabByIndex = (activeTabIndex: number): ReactNode => {
        switch (activeTabIndex) {
            case 0:
                return <EditProfile/>
            case 1:
                return <EditContacts/>
            case 2:
                return <EditInterests/>
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
