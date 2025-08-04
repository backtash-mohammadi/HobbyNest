"use client"
import { motion, useTime, useTransform } from "framer-motion"

export default function BackgroundAnimation() {
    const time = useTime()

    // Rotation speeds
    const rotateMain = useTransform(time, [0, 4000], [0, 360])
    const rotateSmall = useTransform(time, [0, 4000], [0, 540])  // 1.5x
    const rotateTiny = useTransform(time, [0, 4000], [0, 720])   // 2x

    return (
        <>
            <div style={{ ...layer, filter: "blur(4px)" }}>
                <div style={{ ...boxContainer, width: 500, gap: 80 }}>
                    {Array.from({ length: 16 }).map((_, i) => (
                        <motion.div
                            key={i}
                            style={{
                                width: 40,
                                height: 40,
                                backgroundColor: "#9911ff",
                                borderRadius: 5,
                                rotate: rotateTiny,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div style={{ ...layer, filter: "blur(2px)" }}>
                <div style={{ ...boxContainer, width: 300 }}>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <motion.div
                            key={i}
                            style={{
                                width: 80,
                                height: 80,
                                backgroundColor: "#00a2b2",
                                borderRadius: 5,
                                rotate: rotateSmall,
                            }}
                        />
                    ))}
                </div>
            </div>

            <div style={layer}>
                <div style={boxContainer}>
                    <motion.div
                        style={{
                            width: 100,
                            height: 100,
                            backgroundColor: "#008086",
                            borderRadius: 5,
                            rotate: rotateMain,
                        }}
                    />
                </div>
            </div>
        </>
    )
}

const layer = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
}

const boxContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
    flexWrap: "wrap",
}
