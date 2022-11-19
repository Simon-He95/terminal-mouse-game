const blessed = require('blessed')
const program = blessed.program()
const n = 50
const arr = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 1],
]

const ways = [
  [1, 0], // right
  [0, 1], // down
  [-1, 0], // left
  [0, -1], // up
]

export function start() {
  // const arr = generateMap()

  program.key('q', exit)
  program.key('C-c', program.clear)

  function exit() {
    program.clear()
    program.disableMouse()
    program.showCursor()
    program.normalBuffer()
    process.exit(0)
  }

  program.on('mouse', (data: any) => {
    if (data.action === 'mousedown') {
      // program.clear(data.x, data.y);
      program.move(data.x, data.y)
      program.bg('green')
      program.write('o')
      program.bg('!green')
      if (arr[data.y]?.[data.x] === 0)
        exit()
    }
  })

  program.alternateBuffer()
  program.enableMouse()
  program.hideCursor()
  program.clear()
  generateBarrier()

  function generateBarrier() {
    arr.forEach((row, y) =>
      row.forEach((col, x) => {
        if (col === 0) {
          program.move(x, y)
          program.bg('red')
          program.write(' ')
          program.bg('!red')
        }
      }),
    )
  }

  // function generateMap() {
  //   const arr = []
  //   const end = [n - 1, n - 1]
  //   for (let i = 0; i < n; i++) {
  //     const row: number[] = []
  //     arr.push(row)
  //     for (let j = 0; j < n; j++) {
  //       row.push(0)
  //     }
  //   }
  //   return dfs(arr, [0, 0], end)
  // }

  // function dfs(arr: number[][], start: number[], end: number[], map: number[][] = [], history: number[][] = []):number[][] {
  //   if (!map.includes(start)) {
  //     map.push(start)
  //     arr[start[0]][start[1]] = 1
  //   }
  //   console.log(start)
  //   if (start[0] === end[0] && start[1] === end[1]) {
  //     history.forEach(([x, y]) => {
  //       arr[x][y] = 0
  //     })
  //     return arr
  //   }

  //   const top = [start[1] - 1, start[0]]
  //   const bottom = [start[1] + 1, start[0]]
  //   const left = [start[1], start[0] - 1]
  //   const right = [start[1], start[0] + 1]
  //   if (getValue(arr, top) && getValue(arr, bottom) && getValue(arr, left) && getValue(arr, right)) {
  //     // 环形
  //     history.push(map.pop()!)
  //     history.push(map.pop()!)
  //     console.log('唤醒')
  //     const len = map.length
  //     return dfs(arr, map[len-1], end, map)
  //   }
  //   const next = getNext(start, arr, map)
  //   return dfs(arr, next, end, map)
  // }

  // function getValue(arr: number[][], items: number[]) {
  //   const [x, y] = items
  //   return arr[x]?.[y] === 1 || arr[x]?.[y] === undefined
  // }

  // function isInLimit(items: number[]) {
  //   const [x, y] = items
  //   return x >= 0 && x < n && y >= 0 && y < n
  // }

  // function getNext(start: number[], arr: number[][], map: number[][]): number[] {
  //   const top = [start[1] - 1, start[0]]
  //   const bottom = [start[1] + 1, start[0]]
  //   const left = [start[1], start[0] - 1]
  //   const right = [start[1], start[0] + 1]
  //   const data = [top, bottom, left, right]
  //   const result = data.filter(next => isInLimit(next) && !getValue(arr, next) && !map.includes(next))
  //   return result[Math.floor(Math.random() * result.length)]
  // }
}

start()
