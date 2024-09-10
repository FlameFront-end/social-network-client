import { type FC } from 'react'
import { Button } from 'antd'
import type { ButtonProps as ButtonPropsAntd } from 'antd/es/button/button'
import { CloseOutlined } from '@ant-design/icons'
import './css/close.button.css'

type ButtonProps = ButtonPropsAntd

const Close: FC<ButtonProps> = ({ ...props }) => (
    <Button {...props} className={'close-button'}><CloseOutlined /></Button>
)

export default Close
