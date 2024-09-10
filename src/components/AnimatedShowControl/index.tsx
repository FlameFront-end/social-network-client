import { type FC, type ReactNode, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import './css/AnimatedShowControl.css'
interface AnimatedShowControlProps {
    children: ReactNode
    show: boolean
}

const AnimatedShowControl: FC<AnimatedShowControlProps> = ({ children, show }) => {
    const nodeRef = useRef(null)

    return (
        <CSSTransition
            in={show}
            nodeRef={nodeRef}
            timeout={350}
            classNames='showControl'
            unmountOnExit
        >
            <div ref={nodeRef}>
                {children}
            </div>
        </CSSTransition>
    )
}

export default AnimatedShowControl
