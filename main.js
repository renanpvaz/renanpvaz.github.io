let dark = false
let mouse = { x: 0, y: 0 }
const bgColor = '#f3f0eb'
const bg = document.querySelector('.js-backdrop')

const rand = (min = 0, max = 1) => Math.round(Math.random() * (max - min) + min)

const setBackground = ({ x, y }) => {
  bg.style.background = `radial-gradient(circle at ${x}px ${y}px, transparent 15%, black 40.5%)`
}

document.querySelector('#theme-toggle').addEventListener('change', e => {
  if (e.target.checked) {
    bg.style.display = 'block'
    setBackground({ x: 0, y: window.innerHeight })
    dark = true
  } else {
    bg.style.display = 'none'
    bg.style.background = bgColor
    dark = false
  }
})

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d', { alpha: false })

const size = 200
const dpr = window.devicePixelRatio
const halfSize = size / 2

canvas.width = size * dpr
canvas.height = size * dpr
context.scale(dpr, dpr)

const canvasX = canvas.offsetLeft
const canvasY = canvas.offsetHeight

context.lineCap = 'round'
context.lineWidth = 2
context.fillStyle = bgColor
context.fillRect(0, 0, size, size)
context.translate(halfSize, halfSize)

const draw = () => {
  const relativeX = Math.abs(mouse.x - (canvasX + halfSize))
  const relativeY = Math.abs(mouse.y - (canvasY + halfSize - 80))

  if (dark) {
    setBackground(mouse)
  }

  context.fillRect(0, 0, size, size)
  context.beginPath()

  for (let index = 0; index < 20; index++) {
    context.moveTo(0, 0)

    context.rotate((rand(0, 360) * Math.PI) / 180)
    context.lineTo(rand(10, relativeX), rand(10, relativeY))
  }
  context.stroke()
}

document.addEventListener('mousemove', e => {
  mouse = { x: e.x, y: e.y }
  draw()
})

window.addEventListener(
  'scroll',
  e => {
    mouse = { x: 0, y: 0 }
    draw()
  },
  true
)

draw()
