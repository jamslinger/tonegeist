import * as React from 'react';
import {Pressable, View} from 'react-native';
import {useColorScheme} from "~/lib/useColorScheme";
import {Link, router, Stack} from "expo-router";
import {ArrowLeft} from "~/lib/icons/arrowLeft";
import MiniGameLevelCard from "~/components/MiniGameLevelCard";
import {Minigame} from "~/models/minigame";

export default function Chords() {
  const { isDarkColorScheme } = useColorScheme();

  const game : Minigame =  {
    name: 'chords',
    title: 'Chord Identification',
    levels: [
      {
        accuracy: 0
      }
    ]
  }

  return (
    <>
      <Stack.Screen options={{
        title: 'Chord Identification',
        headerTitleStyle: {fontFamily: 'Regular'},
        headerLeft: () => (
          <View className={'pl-3'}>
            <Pressable onPress={router.back}>
              <ArrowLeft color={isDarkColorScheme ? 'white' : 'black'}/>
            </Pressable>
          </View>
        )}}
      />
      <View className='flex-1 items-center gap-5 px-10 py-6 bg-secondary/30'>
        <MiniGameLevelCard idx={'free'} game={game} />
        {game.levels.map((level, idx) => (
          <MiniGameLevelCard key={idx} idx={idx} game={game} />
        ))}
      </View>
    </>
  );
}