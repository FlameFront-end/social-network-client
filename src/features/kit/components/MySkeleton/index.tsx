import { type FC } from 'react'

import Skeleton from 'react-loading-skeleton'

interface Props {
    height: number
    borderRadius?: number
}

const MySkeleton: FC<Props> = ({ height, borderRadius = 10 }) => {
    return <Skeleton baseColor="#202020" highlightColor="#444" style={{ borderRadius, height }}/>
}

export default MySkeleton
