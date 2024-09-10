import { type FC, type ReactNode, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import './css/AnimatedShow.css'

interface AnimatedShowProps {
    children: ReactNode
}

const AnimatedShow: FC<AnimatedShowProps> = ({ children }) => {
    const nodeRef = useRef(null)

    return (
        <CSSTransition
            nodeRef={nodeRef}
            classNames='show'
            timeout={{
                appear: 500,
                enter: 500,
                exit: 300
            }}
        >
            <div ref={nodeRef}>
                {children}
            </div>
        </CSSTransition>
    )
}

export default AnimatedShow
