import { type FC } from 'react'
import { Button } from 'antd'
import type { ButtonProps } from 'antd/es/button/button'
import { EditOutlined } from '@ant-design/icons'
import './css/edit.button.css'

const Edit: FC<ButtonProps> = ({ ...props }) => (
    <Button {...props} className={'edit-button'}><EditOutlined /></Button>
)

export default Edit
