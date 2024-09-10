import { type FC, type ReactNode } from 'react'
import { Avatar, Typography } from 'antd'
import { PictureOutlined, LoadingOutlined } from '@ant-design/icons'
import type { Styles } from '@/globalTypes'

import './css/heading.css'

const styles: Styles = {
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 8
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
    },
    avatar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        background: '#1677ff',
        borderWidth: '2px',
        borderColor: '#1677ff'
    },
    buttons: {
        display: 'flex',
        alignItems: 'end',
        gap: 8,
        marginLeft: 'auto'
    }
}

interface HeadingProps {
    title?: string | null
    description?: string | null
    buttons?: ReactNode
    isLoading?: boolean
    isImage?: boolean
    src?: string
}

const Heading: FC<HeadingProps> = ({ title, description, buttons, isLoading = false, isImage = true, src }) => {
    return (
        <div style={styles.heading}>
            <div style={styles.title}>
                {isImage && (
                    <Avatar
                        icon={isLoading ? <LoadingOutlined /> : <PictureOutlined />}
                        src={src}
                        size={90}
                        alt='photo'
                        style={styles.avatar}
                        draggable={false}
                    />
                )}
                <div>
                    <Typography.Title level={2} className={'heading__ellipses'}>
                        {title}
                    </Typography.Title>
                    <Typography.Text type='secondary' className={'heading__ellipses'}>
                        {description}
                    </Typography.Text>
                </div>
            </div>
            <div style={styles.buttons}>{buttons}</div>
        </div>
    )
}

export default Heading
