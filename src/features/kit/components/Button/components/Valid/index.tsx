import { type FC } from 'react'
import { Switch } from 'antd'
import { type SwitchProps } from 'antd/es/switch'
import './css/valid.button.css'

const Valid: FC<SwitchProps> = ({ ...props }) => (
    <Switch {...props} className={'valid-button'} checkedChildren='Valid' unCheckedChildren='Invalid' />
)

export default Valid
