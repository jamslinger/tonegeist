import * as React from 'react';
import { View } from 'react-native';
import MiniGameCard from "~/components/MiniGameCard";

export default function Screen() {
  return (
    <View className='flex-1 items-center gap-5 px-10 py-6 bg-secondary/30'>
      <MiniGameCard title={'Chords'} description={'Identify individual chords'} action={() => alert('test')} />
    </View>
  );
}
