import React from 'react'
import {useStyle} from './hooks'
import withContext from './withContext'

interface BCMDProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : () => void 
}
const BCMDComponent : React.FC<BCMDProps> = (props : BCMDProps) => {
    const {parentStyle, circleStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <div style = {parentStyle()}>
            {[0, 1].map((i : number) => (<div style = {circleStyle(i)}></div>))}
        </div>
    )
}

export default withContext(BCMDComponent)