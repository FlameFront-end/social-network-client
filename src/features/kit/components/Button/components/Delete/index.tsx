import { type FC } from 'react'
import { Button } from 'antd'
import type { ButtonProps as ButtonPropsAntd } from 'antd/es/button/button'
import { CloseOutlined, DeleteOutlined, DisconnectOutlined } from '@ant-design/icons'
import './css/delete.button.css'

type ButtonProps = ButtonPropsAntd & { color?: 'red' | 'orange' | 'black' }

const Delete: FC<ButtonProps> = ({ color = 'red', ...props }) => (
    <Button
        {...props}
        className={color === 'red' ? 'delete-button_red' : color === 'orange' ? 'delete-button_orange' : 'delete-button_black'}
    >
        {color === 'black' ? <CloseOutlined /> : color === 'orange' ? <DisconnectOutlined /> : <DeleteOutlined />}
    </Button>
)

export default Delete
