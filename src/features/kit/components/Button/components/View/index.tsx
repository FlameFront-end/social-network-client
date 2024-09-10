import { type FC } from 'react'
import { Button } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import type { ButtonProps } from 'antd/es/button/button'
import './css/view.button.css'

const View: FC<ButtonProps> = ({ ...props }) => (
    <Button {...props} className={'view-button'}><EyeOutlined /></Button>
)

export default View
