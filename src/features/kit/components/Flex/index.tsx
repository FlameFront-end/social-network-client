import { type CSSProperties, type FC, type ReactNode } from 'react'

export interface FlexProps {
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
    gap?: 0 | 4 | 8 | 12 | 16 | 24 | 32 | 48 | 64 | 72
    justifyContent?: 'end' | 'flex-end' | 'start' | 'flex-start' | 'center' | 'space-around' | 'space-evenly' | 'space-between'
    alignItems?: 'baseline' | 'end' | 'flex-end' | 'start' | 'flex-start' | 'center'
    flexGrow?: number
    flexShrink?: number
    flexWrap?: 'wrap' | 'nowrap'
    style?: CSSProperties
    children: ReactNode
}

const Flex: FC<FlexProps> = ({
    direction = 'row',
    gap = 8,
    justifyContent,
    alignItems,
    flexGrow,
    flexShrink,
    flexWrap,
    style,
    children
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: `${direction}`, gap, justifyContent, alignItems, flexGrow, flexShrink, flexWrap, ...style }}>
            {children}
        </div>
    )
}

export default Flex
