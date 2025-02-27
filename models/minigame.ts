
export interface Minigame {
  name: 'chords'
  title: string
  levels: MinigameLevel[]
}

export interface MinigameLevel {
  accuracy: number
}