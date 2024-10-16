import { type Dispatch, type FC, type SetStateAction } from 'react'
import { StyledEditProfileMenu, StyledEditProfileMenuItem } from './EditProfileMenu.styled.tsx'

interface Props {
    activeTabIndex: number
    setActiveTabIndex: Dispatch<SetStateAction<number>>
}

const EditProfileMenu: FC<Props> = ({ activeTabIndex, setActiveTabIndex }) => {
    const tabs = [
        'Личные даннные',
        'Профиль',
        'Интересы',
        'Образование',
        'Карьера',
        'Военная служба',
        'Жизненная позиция'
    ]

    return (
        <StyledEditProfileMenu>
            {tabs.map((tab, index) => (
                <StyledEditProfileMenuItem
                    key={`${index}_${tab}`}
                    onClick={() => { setActiveTabIndex(index) }}
                    className={`${activeTabIndex === index ? 'active' : ''}`}
                >
                    {tab}
                </StyledEditProfileMenuItem>
            ))}
        </StyledEditProfileMenu>
    )
}

export default EditProfileMenu
