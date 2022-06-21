const canvasEl = document.createElement('canvas')
document.body.appendChild(canvasEl)

canvasEl.width = document.body.clientWidth - 5
canvasEl.height = document.body.clientHeight - 5
canvasEl.style.position = 'fixed'
canvasEl.style.top = 0
canvasEl.style.left = 0
canvasEl.style.pointerEvents = 'none'

const ctx = canvasEl.getContext('2d')

init()
init()

async function init() {
  ctx.strokeStyle = '#1bc6d6'
  ctx.beginPath()

  let e = drow(genertionStratLine())

  for (let i = 0; i < 10; i++) {
    let a = getLineByEndPoint(e)
    if (i % 3 == 0) {
      for (let j = 0; j < 5; j++) {
        getLineByEndPoint(a)
      }
    }
  }

  ctx.closePath()
  ctx.stroke()
  ctx.stroke()
}

function drow(line) {
  ctx.moveTo(line.start.x, line.start.y)
  ctx.lineTo(line.end.x, line.end.y)
  return line.end
}

function genertionStratLine() {
  let angue = (Math.random() * Math.PI) / 2
  let len = 100

  let y = 300 + Math.round(Math.random() * 500)
  return {
    start: {
      x: 0,
      y,
    },
    end: {
      x: Math.cos(angue) * len,
      y: y - Math.sin(angue) * len,
    },
    angue,
    len,
  }
}

function getLineByEndPoint(startPoint) {
  let angue = (Math.random() * Math.PI) / 2
  let len = 100
  let o = {
    start: startPoint,
    end: {
      x: startPoint.x + Math.cos(angue) * len,
      y: startPoint.y - Math.sin(angue) * len,
    },
  }
  drow(o)
  return o.end
}

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}