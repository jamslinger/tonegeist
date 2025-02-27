import * as React from 'react';
import {Pressable, View} from 'react-native';
import {Text} from "~/components/ui/text";
import {useColorScheme} from "~/lib/useColorScheme";
import {router, Stack} from "expo-router";
import {ArrowLeft} from "~/lib/icons/arrowLeft";
import {Button} from "~/components/ui/button";
import {useCallback, useEffect, useState} from "react";

interface Choice {
  name: string
  chosen: false | 'error'
}

interface Chord {
  name: string
}

const allChoices: Choice[] = [
  { name: 'Major', chosen: false },
  { name: 'Minor', chosen: false },
  { name: 'Diminished', chosen: false },
  { name: 'Augmented', chosen: false },
  { name: 'Dominant Seventh', chosen: false },
  { name: 'Major Seventh', chosen: false },
  { name: 'Minor Seventh', chosen: false }
]

export default function Level() {
  const { isDarkColorScheme } = useColorScheme();

  const [correct, setCorrect] = useState(0);
  const [count, setCount] = useState(0);
  const [choices, setChoices] = useState(allChoices)
  const [chord, setChord] = useState<Chord>()

  const resetChoices = () => {
    setChoices(() => allChoices.map(c => {
      c.chosen = false
      return c
    }))
    setChord(() => (
      {
        name: choices[Math.floor(Math.random() * choices.length)].name
      }
    ))
  }

  useEffect(() => {
    resetChoices()
  }, [])

  useEffect(() => {
    if (chord) {
      play()
    }
  }, [chord])

  const play = useCallback(() => {
    alert(chord?.name)
  }, [chord])

  const check = useCallback((choice: Choice) => {
    setCount(n => n+1)
    if (choice.name === chord?.name) {
      setCorrect(n => n+1)
      resetChoices()
    } else {
      setChoices(current => {
        return current.map(c => {
          if (c.name == choice.name) {
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
          <Button variant='outline' className='shadow shadow-foreground/5'><Text>Play Individual Notes</Text></Button>
        </View>
        <View className={'p-6'} />
        <View className={'flex-row flex-wrap justify-center gap-2 w-1/3'}>
          {choices.map((choice) => (
            <Button key={choice.name} onPress={() => check(choice)}
                    variant='outline'
                    className={`shadow shadow-foreground/5`}
            >
              <Text className={`${choice.chosen === 'error' ? 'color-red-500' : ''}`}>{choice.name}</Text>
            </Button>
        ))}
        </View>
      </View>
    </>
  );
}