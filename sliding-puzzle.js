const createSlidingPuzzle = (target, size = 50) => {
  const shuffle = arr => arr.slice().sort(() => Math.random() > .5)
  const shuffleAll = table => shuffle(table).map(shuffle)

  const render = table => (
    table.forEach(
      (column, y) => column
      .map((value, x) => !!value ? createTile(value, x, y) : document.createElement('div'))
      .forEach(tile => target.appendChild(tile))
    )
  )

  const clear = element => Object.assign(element, { innerHTML: '' })

  const get = table => (x, y) => table[y] != null ? table[y][x] : null

  const canBeMoved = table => (x, y) => (
    get(table)(x, y + 1) === 0 ||
    get(table)(x, y - 1) === 0 ||
    get(table)(x + 1, y) === 0 ||
    get(table)(x - 1, y) === 0
  )

  const toPosition = value => parseInt(value) / size

  const getEmptySpot = table => {
    const row = table.find(row => row.includes(0))
    return [row.indexOf(0), table.indexOf(row)]
  }

  const moveTile = tile => {
    const { top, left } = tile.style
    const [emptyX, emptyY] = getEmptySpot(table)
    const x = toPosition(left)
    const y = toPosition(top)

    if (canBeMoved(table)(x, y)) {
      table[emptyY][emptyX] = table[y][x]
      table[y][x] = 0

      clear(target)
      render(table)
    }
  }

  const createTile = (value, x, y) => {
    const tile = document.createElement('figure')

    tile.classList.add('sliding-puzzle__tile')
    Object.assign(tile.style, {
      width: `${size}px`,
      height: `${size}px`,
      top: `${size * y}px`,
      left: `${size * x}px`,
      backgroundPosition: value,
      backgroundSize: `${size * 3}px`,
    })

    tile.addEventListener('click', e => moveTile(e.target))

    return tile
  }

  let table = shuffleAll([
    ['0 0', `-${size}px 0`, `-${size * 2}px 0`],
    [`0 -${size}px`, `-${size}px`, `-${size * 2}px -${size}px`],
    [`0 -${size * 2}px`, `-${size}px -${size * 2}px`, 0],
  ])

  Object.assign(target.style, {
    width: `${size * 3}px`,
    height: `${size * 3}px`
  })

  document
    .querySelector('.js-shuffle')
    .addEventListener('click', () => {
      clear(target)
      render((table = shuffleAll(table)))
    })

  render(table)
}
