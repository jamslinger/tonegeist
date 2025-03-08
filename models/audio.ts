import {AudioPlayer} from 'expo-audio';

export interface Tone {
    name: string
    src: AudioPlayer
}

type roots =  'A' | 'A#' | 'B' | 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#'
type octaves = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
type intervals = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
type inversions = 0 | 1 | 2
export type ChordType = 'Major' | 'Minor' | 'Diminished' | 'Augmented' | 'Dominant Seventh' | 'Major Seventh' | 'Minor Seventh'

export const generateChord = (tones: Tone[], root: roots, ocatve: octaves, typ: ChordType, inversion: inversions, extra: intervals[]) => {
    const rootIdx = tones.findIndex(t => t.name === `${ocatve}${root}`)
    const chordIdx = [rootIdx]

    switch (typ) {
        case 'Major':
            chordIdx.push(rootIdx + 4)
            chordIdx.push(rootIdx + 7)
            break
        case 'Minor':
            chordIdx.push(rootIdx + 3)
            chordIdx.push(rootIdx + 7)
            break
        case 'Diminished':
            chordIdx.push(rootIdx + 3)
            chordIdx.push(rootIdx + 6)
            break
        case 'Augmented':
            chordIdx.push(rootIdx + 4)
            chordIdx.push(rootIdx + 8)
            break
        case 'Dominant Seventh':
            chordIdx.push(rootIdx + 4)
            chordIdx.push(rootIdx + 7)
            chordIdx.push(rootIdx + 10)
            break
        case 'Major Seventh':
            chordIdx.push(rootIdx + 4)
            chordIdx.push(rootIdx + 7)
            chordIdx.push(rootIdx + 11)
            break
        case 'Minor Seventh':
            chordIdx.push(rootIdx + 3)
            chordIdx.push(rootIdx + 7)
            chordIdx.push(rootIdx + 10)
            break
    }
    for (const e of extra) {
        chordIdx.push(rootIdx + e)
    }
    for (let i = 0; i < inversion; i++) {
        chordIdx.push(chordIdx.shift()! + 12)
    }

    return chordIdx.map(i => tones[i])
}
