const debounce = (wait, func) => {
  let timeout
  return function () {
    const context = this, args = arguments
    const later = function() {
      timeout = null
      func.apply(context, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (!timeout) func.apply(context, args)
  }
}

const getCollisions = target => {
  const rect = target.getBoundingClientRect();

  return [!(
    rect.left >= 0 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  ), !(
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  )]
}

const bounceAround = debounce(30, target => {
  const { x = 0, y = 0, velX = 2, velY = 2 } = target.dataset
  const nextX = (+x) + (+velX)
  const nextY = (+y) + (+velY)

  target.style.transform = `translate(${nextX}px, ${nextY}px)`
  target.dataset.x = nextX
  target.dataset.y = nextY

  const [didCollideX, didCollideY] = getCollisions(target)

  target.dataset.velX = didCollideX ? velX * -1 : velX
  target.dataset.velY = didCollideY ? velY * -1 : velY

  if (didCollideX || didCollideY) {
    target.style.color = ['#f50003', '#19028b', '#d6de31'][~~(Math.random() * 2) + 0]
  }

  requestAnimationFrame(() => bounceAround(target))
})

setTimeout(
  () => bounceAround(document.querySelector('.js-bounce')),
  2000
)
