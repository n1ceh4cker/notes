export const particleConfig = {
    autoPlay: true,
    fullScreen: {
        enable: true,
        zIndex: 10000
    },
    detectRetina: true,
    fpsLimit: 60,
    interactivity: {
        detectsOn: 'window',
        events: {
            onHover: {
                enable: true,
                mode: "bubble",
                parallax: {
                    enable: false,
                    force: 2,
                    smooth: 10
                }
            },
            resize: true
        },
        modes: {     
            bubble: {
                distance: 150,
                duration: 0.3
            }
        }
    },
    particles: {
        color: {
            value: 'random',   
        },
        links: {
            color: {
                value: 'random'
            },
            distance: 100,
            enable: true,
            frequency: 1,
            opacity: 1,
            width: 1,
        },
        move: {
            enable: true,
            outModes: 'out',
            speed: 2
        },
        number: {
            density: {
                enable: true,
                area: 800,
                factor: 1000
            },
            limit: 0,
            value: 100
        },
        size: {
            random: true,
            value: {
                min: 1,
                max: 3
            },
            animation: {
                enable: true,
                speed: 3,
                minimumValue: 1,
                startValue: 'random'
            }
        }
    }
}
               