import * as React from 'react';
import {Pressable, View} from 'react-native';
import {Text} from "~/components/ui/text";
import {useColorScheme} from "~/lib/useColorScheme";
import {router, Stack} from "expo-router";
import {ArrowLeft} from "~/lib/icons/arrowLeft";
import {Button} from "~/components/ui/button";
import {useCallback, useEffect, useState} from "react";
import { ChordType, generateChord, Tone } from '~/models/audio';
import { useAudioPlayer } from 'expo-audio';

interface Choice {
  chord: ChordType
  chosen: false | 'error'
}

const allChoices: Choice[] = [
  { chord: 'Major', chosen: false },
  { chord: 'Minor', chosen: false },
  { chord: 'Diminished', chosen: false },
  { chord: 'Augmented', chosen: false },
  { chord: 'Dominant Seventh', chosen: false },
  { chord: 'Major Seventh', chosen: false },
  { chord: 'Minor Seventh', chosen: false }
]

export default function Level() {

  const tones: Tone[] = [
    {name: '0A', src: useAudioPlayer(require('~/assets/audio/0A.wav'))},
    {name: '0A#', src: useAudioPlayer(require('~/assets/audio/0A#.wav'))},
    {name: '0B', src: useAudioPlayer(require('~/assets/audio/0B.wav'))},
    {name: '0C', src: useAudioPlayer(require('~/assets/audio/0C.wav'))},
    {name: '0C#', src: useAudioPlayer(require('~/assets/audio/0C#.wav'))},
    {name: '0D', src: useAudioPlayer(require('~/assets/audio/0D.wav'))},
    {name: '0D#', src: useAudioPlayer(require('~/assets/audio/0D#.wav'))},
    {name: '0E', src: useAudioPlayer(require('~/assets/audio/0E.wav'))},
    {name: '0F', src: useAudioPlayer(require('~/assets/audio/0F.wav'))},
    {name: '0F#', src: useAudioPlayer(require('~/assets/audio/0F#.wav'))},
    {name: '0G', src: useAudioPlayer(require('~/assets/audio/0G.wav'))},
    {name: '0G#', src: useAudioPlayer(require('~/assets/audio/0G#.wav'))},

    {name: '1A', src: useAudioPlayer(require('~/assets/audio/1A.wav'))},
    {name: '1A#', src: useAudioPlayer(require('~/assets/audio/1A#.wav'))},
    {name: '1B', src: useAudioPlayer(require('~/assets/audio/1B.wav'))},
    {name: '1C', src: useAudioPlayer(require('~/assets/audio/1C.wav'))},
    {name: '1C#', src: useAudioPlayer(require('~/assets/audio/1C#.wav'))},
    {name: '1D', src: useAudioPlayer(require('~/assets/audio/1D.wav'))},
    {name: '1D#', src: useAudioPlayer(require('~/assets/audio/1D#.wav'))},
    {name: '1E', src: useAudioPlayer(require('~/assets/audio/1E.wav'))},
    {name: '1F', src: useAudioPlayer(require('~/assets/audio/1F.wav'))},
    {name: '1F#', src: useAudioPlayer(require('~/assets/audio/1F#.wav'))},
    {name: '1G', src: useAudioPlayer(require('~/assets/audio/1G.wav'))},
    {name: '1G#', src: useAudioPlayer(require('~/assets/audio/1G#.wav'))},

    {name: '2A', src: useAudioPlayer(require('~/assets/audio/2A.wav'))},
    {name: '2A#', src: useAudioPlayer(require('~/assets/audio/2A#.wav'))},
    {name: '2B', src: useAudioPlayer(require('~/assets/audio/2B.wav'))},
    {name: '2C', src: useAudioPlayer(require('~/assets/audio/2C.wav'))},
    {name: '2C#', src: useAudioPlayer(require('~/assets/audio/2C#.wav'))},
    {name: '2D', src: useAudioPlayer(require('~/assets/audio/2D.wav'))},
    {name: '2D#', src: useAudioPlayer(require('~/assets/audio/2D#.wav'))},
    {name: '2E', src: useAudioPlayer(require('~/assets/audio/2E.wav'))},
    {name: '2F', src: useAudioPlayer(require('~/assets/audio/2F.wav'))},
    {name: '2F#', src: useAudioPlayer(require('~/assets/audio/2F#.wav'))},
    {name: '2G', src: useAudioPlayer(require('~/assets/audio/2G.wav'))},
    {name: '2G#', src: useAudioPlayer(require('~/assets/audio/2G#.wav'))},

    {name: '3A', src: useAudioPlayer(require('~/assets/audio/3A.wav'))},
    {name: '3A#', src: useAudioPlayer(require('~/assets/audio/3A#.wav'))},
    {name: '3B', src: useAudioPlayer(require('~/assets/audio/3B.wav'))},
    {name: '3C', src: useAudioPlayer(require('~/assets/audio/3C.wav'))},
    {name: '3C#', src: useAudioPlayer(require('~/assets/audio/3C#.wav'))},
    {name: '3D', src: useAudioPlayer(require('~/assets/audio/3D.wav'))},
    {name: '3D#', src: useAudioPlayer(require('~/assets/audio/3D#.wav'))},
    {name: '3E', src: useAudioPlayer(require('~/assets/audio/3E.wav'))},
    {name: '3F', src: useAudioPlayer(require('~/assets/audio/3F.wav'))},
    {name: '3F#', src: useAudioPlayer(require('~/assets/audio/3F#.wav'))},
    {name: '3G', src: useAudioPlayer(require('~/assets/audio/3G.wav'))},
    {name: '3G#', src: useAudioPlayer(require('~/assets/audio/3G#.wav'))},

    {name: '4A', src: useAudioPlayer(require('~/assets/audio/4A.wav'))},
    {name: '4A#', src: useAudioPlayer(require('~/assets/audio/4A#.wav'))},
    {name: '4B', src: useAudioPlayer(require('~/assets/audio/4B.wav'))},
    {name: '4C', src: useAudioPlayer(require('~/assets/audio/4C.wav'))},
    {name: '4C#', src: useAudioPlayer(require('~/assets/audio/4C#.wav'))},
    {name: '4D', src: useAudioPlayer(require('~/assets/audio/4D.wav'))},
    {name: '4D#', src: useAudioPlayer(require('~/assets/audio/4D#.wav'))},
    {name: '4E', src: useAudioPlayer(require('~/assets/audio/4E.wav'))},
    {name: '4F', src: useAudioPlayer(require('~/assets/audio/4F.wav'))},
    {name: '4F#', src: useAudioPlayer(require('~/assets/audio/4F#.wav'))},
    {name: '4G', src: useAudioPlayer(require('~/assets/audio/4G.wav'))},
    {name: '4G#', src: useAudioPlayer(require('~/assets/audio/4G#.wav'))},

    {name: '5A', src: useAudioPlayer(require('~/assets/audio/5A.wav'))},
    {name: '5A#', src: useAudioPlayer(require('~/assets/audio/5A#.wav'))},
    {name: '5B', src: useAudioPlayer(require('~/assets/audio/5B.wav'))},
    {name: '5C', src: useAudioPlayer(require('~/assets/audio/5C.wav'))},
    {name: '5C#', src: useAudioPlayer(require('~/assets/audio/5C#.wav'))},
    {name: '5D', src: useAudioPlayer(require('~/assets/audio/5D.wav'))},
    {name: '5D#', src: useAudioPlayer(require('~/assets/audio/5D#.wav'))},
    {name: '5E', src: useAudioPlayer(require('~/assets/audio/5E.wav'))},
    {name: '5F', src: useAudioPlayer(require('~/assets/audio/5F.wav'))},
    {name: '5F#', src: useAudioPlayer(require('~/assets/audio/5F#.wav'))},
    {name: '5G', src: useAudioPlayer(require('~/assets/audio/5G.wav'))},
    {name: '5G#', src: useAudioPlayer(require('~/assets/audio/5G#.wav'))},

    {name: '6A', src: useAudioPlayer(require('~/assets/audio/6A.wav'))},
    {name: '6A#', src: useAudioPlayer(require('~/assets/audio/6A#.wav'))},
    {name: '6B', src: useAudioPlayer(require('~/assets/audio/6B.wav'))},
    {name: '6C', src: useAudioPlayer(require('~/assets/audio/6C.wav'))},
    {name: '6C#', src: useAudioPlayer(require('~/assets/audio/6C#.wav'))},
    {name: '6D', src: useAudioPlayer(require('~/assets/audio/6D.wav'))},
    {name: '6D#', src: useAudioPlayer(require('~/assets/audio/6D#.wav'))},
    {name: '6E', src: useAudioPlayer(require('~/assets/audio/6E.wav'))},
    {name: '6F', src: useAudioPlayer(require('~/assets/audio/6F.wav'))},
    {name: '6F#', src: useAudioPlayer(require('~/assets/audio/6F#.wav'))},
    {name: '6G', src: useAudioPlayer(require('~/assets/audio/6G.wav'))},
    {name: '6G#', src: useAudioPlayer(require('~/assets/audio/6G#.wav'))},

    {name: '7A', src: useAudioPlayer(require('~/assets/audio/7A.wav'))},
    {name: '7A#', src: useAudioPlayer(require('~/assets/audio/7A#.wav'))},
    {name: '7B', src: useAudioPlayer(require('~/assets/audio/7B.wav'))},
    {name: '7C', src: useAudioPlayer(require('~/assets/audio/7C.wav'))}
]


  const { isDarkColorScheme } = useColorScheme();
  const [correct, setCorrect] = useState(0);
  const [count, setCount] = useState(0);
  const [choices, setChoices] = useState(allChoices)
  const [chord, setChord] = useState<ChordType>('Major')

  const resetChoices = () => {
    setChoices(() => allChoices.map(c => {
      c.chosen = false
      return c
    }))
    setChord(() => choices[Math.floor(Math.random() * choices.length)].chord)
  }

  useEffect(() => {
    resetChoices()
  }, [])

  useEffect(() => {
    play()
  }, [chord])

  const play = useCallback(() => {
    console.log("play C ", chord)
    for (const tone of generateChord(tones, 'C', 3, chord, 0, [])) {
      console.log("play " + tone.name)
      tone.src.seekTo(0)
      tone.src.play()
      tone.src.seekTo(0)
    }
  }, [chord])

  const playSequentially = useCallback(async () => {
    console.log("play C ", chord)
    for (const tone of generateChord(tones, 'C', 3, chord, 0, [])) {
      console.log("play " + tone.name)
      tone.src.seekTo(0)
      tone.src.play()
      tone.src.seekTo(0)
      await new Promise(f => setTimeout(f, 750));
    }
  }, [chord])

  const check = useCallback((choice: Choice) => {
    setCount(n => n+1)
    if (choice.chord === chord) {
      setCorrect(n => n+1)
      resetChoices()
    } else {
      setChoices(current => {
        return current.map(c => {
          if (c.chord == choice.chord) {
            c.chosen = 'error'
          }
          return c
        })
      })
    }
  }, [choices, chord])


  return (
    <>
      <Stack.Screen options={{
        title: 'Free Play',
        headerLeft: () => (
          <View className={'pl-3'}>
            <Pressable onPress={router.back}>
              <ArrowLeft color={isDarkColorScheme ? 'white' : 'black'}/>
            </Pressable>
          </View>
        )}}
      />
      <View className={'flex-col items-center'}>
        <View className={'p-6'} />
        <Text>{correct} of {count} correct</Text>
        <View className={'p-2'} />
        <View className={'flex-row gap-2'}>
          <Button onPress={play} variant='outline' className='shadow shadow-foreground/5'><Text>Play</Text></Button>
          <Button onPress={playSequentially} variant='outline' className='shadow shadow-foreground/5'><Text>Play Individual Notes</Text></Button>
        </View>
        <View className={'p-6'} />
        <View className={'flex-row flex-wrap justify-center gap-2 w-1/3'}>
          {choices.map((choice) => (
            <Button key={choice.chord} onPress={() => check(choice)}
                    variant='outline'
                    className={`shadow shadow-foreground/5`}
            >
              <Text className={`${choice.chosen === 'error' ? 'color-red-500' : ''}`}>{choice.chord}</Text>
            </Button>
        ))}
        </View>
      </View>
    </>
  );
}