import { type Dispatch, type FC, type SetStateAction } from 'react'
import { StyledFriendsMenu } from './FriendsMenu.styled.tsx'

interface Props {
    activeTabIndex: number
    setActiveTabIndex: Dispatch<SetStateAction<number>>
    setShowSelect: Dispatch<SetStateAction<boolean>>
    className?: string
}

const FriendsMenu: FC<Props> = ({ activeTabIndex, setActiveTabIndex, setShowSelect, className }) => {
    const tabs = ['Мои друзья', 'Заявки в друзья', 'Поиск друзей']

    const handleClick = (index: number): void => {
        setActiveTabIndex(index)
        setShowSelect(false)
    }

    return (
        <StyledFriendsMenu className={className}>
            {tabs.map((tab, index) => (
                <button
                    key={`${index}_${tab}`}
                    onClick={() => { handleClick(index) }}
                    className={`${activeTabIndex === index ? 'active' : ''}`}
                >
                    {tab}
                </button>
            ))}
        </StyledFriendsMenu>
    )
}

export default FriendsMenu
