import { type FC } from 'react'
import { StyledProfilePhotosWrapper } from './ProfilePhotos.styled.tsx'

const ProfilePhotos: FC = () => {
    const testImage = 'https://upcdn.io/W142ipT/raw/uploads/2024/10/13/4kGcKW858b-eec59b72-6acf-4ebd-9bed-751da7fc4700_ava.png'

    return (
        <StyledProfilePhotosWrapper>
            <div className="content">
                <img src={testImage} alt="Profile 2"/>
                <img src={testImage} alt="Profile 2"/>
                <img src={testImage} alt="Profile 2"/>
                <img src={testImage} alt="Profile 2"/>
                <img src={testImage} alt="Profile 2"/>
                <img src={testImage} alt="Profile 2"/>
            </div>
        </StyledProfilePhotosWrapper>
    )
}

export default ProfilePhotos
