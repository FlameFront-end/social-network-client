import { type FC, type ReactNode, useState } from 'react'
import { StyledFriendsWrapper } from './Friends.styled.tsx'
import { AccentButton, Flex } from '@/kit'
import { FriendsTab, PossibleTab, RequestsTab } from '../../components/Tabs'
import FriendsMenu from '../../components/FriendsMenu'

const Friends: FC = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const [showSelect, setShowSelect] = useState(false)

    const getTabByIndex = (activeTabIndex: number): ReactNode => {
        switch (activeTabIndex) {
            case 0:
                return <FriendsTab/>
            case 1:
                return <RequestsTab/>
            case 2:
                return <PossibleTab/>
            default:
                return <></>
        }
    }

    const getTabNameByIndex = (activeTabIndex: number): string => {
        switch (activeTabIndex) {
            case 0:
                return 'Мои друзья'
            case 1:
                return 'Заявки в друзья'
            case 2:
                return 'Поиск друзей'
            default:
                return ''
        }
    }

    return (
        <StyledFriendsWrapper>
            <div className="select-mobile">
                <AccentButton onClick={() => { setShowSelect(prevState => !prevState) }}>
                    {getTabNameByIndex(activeTabIndex)}
                </AccentButton>

                {showSelect && <FriendsMenu
                    className='mobile-select-content'
                    activeTabIndex={activeTabIndex}
                    setActiveTabIndex={setActiveTabIndex}
                    setShowSelect={setShowSelect}
                />}
            </div>

            <Flex gap={24}>
                <div className="tabs-content">
                    {getTabByIndex(activeTabIndex)}
                </div>

                <div className="desktop">
                    <FriendsMenu
                        activeTabIndex={activeTabIndex}
                        setActiveTabIndex={setActiveTabIndex}
                        setShowSelect={setShowSelect}
                    />
                </div>
            </Flex>
        </StyledFriendsWrapper>
    )
}

export default Friends
