import {useState, useEffect, CSSProperties} from "react";

export const useAnimatedScale = (scGap : number = 0.01, delay : number = 20) =>{
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            clearInterval(interval)
                            setAnimated(false)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        const listener = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        window.addEventListener('resize', listener, false)
        return () => {
            window.removeEventListener('resize', listener, false)
        } 
    }, [])
    return {
        w, h
    }
}

export const useStyle = (w : number, h : number, scale : number) => {
    const size : number = Math.min(w, h) / 10
    const position = 'absolute'
    const background = 'white'
    const sf : number = Math.sin(scale * Math.PI)
    const border = `2px solid indigo`
    return {
        parentStyle() : CSSProperties {
            return {
                position, 
                left: `${w / 2}px`,
                top: `${h / 2}px`
            }
        },
        circleStyle(i : number) : CSSProperties {
            return {
                position, 
                left: `${(w / 2 - size / 2) * (1 - sf) * (1 - 2 * i)}px`,
                top: `${-(h / 2 - size / 2) * (1 - sf)}px`,
                width: `${size}px`,
                height: `${size}px`,
                border, 
                borderRadius: '50%'
            }
        }
    }
}