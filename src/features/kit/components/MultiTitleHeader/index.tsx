import { type ReactNode, type FC } from 'react'
import { Avatar, Row, Col, Typography, Space } from 'antd'

const styles = {
    avatar: {
        minWidth: '90px',
        minHeight: '90px',
        marginRight: '10px',
        borderColor: 'red',
        borderWidth: '3px',
        borderStyle: 'solid',
        background: '#fff',
        borderRadius: '50px'
    }
}

interface Props {
    avatarUrl?: string
    title: string
    description?: ReactNode
    rightBlock?: ReactNode
}

const MultiTitleHeader: FC<Props> = ({
    avatarUrl,
    title,
    description,
    rightBlock
}) => {
    return (
        <Row wrap={false} justify='space-between' align='middle' style={{ width: '100%' }}>
            <Col flex='auto' style={{ display: 'flex', alignItems: 'center' }}>
                {avatarUrl !== '' ? <Avatar style={styles.avatar} size='large' src={avatarUrl} alt='photo' /> : null}

                <div style={{ flexGrow: 1, marginRight: 15 }}>
                    <Typography.Title level={2}>{title}</Typography.Title>
                    <Space>{description}</Space>
                </div>
            </Col>
            <Col>{rightBlock}</Col>
        </Row>
    )
}

export default MultiTitleHeader
