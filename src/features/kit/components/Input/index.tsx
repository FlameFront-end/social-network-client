import { type FC } from 'react'
import { StyledInput, StyledInputPassword } from './Input.styled.tsx'
import { type InputProps } from 'antd'

interface Props extends InputProps {
    password?: boolean
}

const Input: FC<Props> = (props) => {
    return (
        <>
            {(props.password === true) ? <StyledInputPassword {...props}/> : <StyledInput {...props}/>}
        </>
    )
}

export default Input
