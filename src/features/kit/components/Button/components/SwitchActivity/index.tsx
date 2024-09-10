import { type FC } from 'react'
import { Switch } from 'antd'
import { type SwitchProps } from 'antd/es/switch'
import './css/switchActivity.button.css'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'

const SwitchActivity: FC<SwitchProps> = ({ ...props }) => (
    <Switch
        {...props}
        className={'switchActivity-button'}
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
    />
)

export default SwitchActivity
