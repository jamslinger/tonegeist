import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import MiniGameCard from "~/components/MiniGameCard";
import * as React from "react";
import {Ghost} from "~/lib/icons/ghost";
import {useColorScheme} from "~/lib/useColorScheme";

export default function NotFoundScreen() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className='flex-1 items-center justify-center gap-5 p-6  bg-secondary/30'>
        <Ghost color={isDarkColorScheme ? 'white' : 'black'} size={60} />
        <Text className={'text-3xl'}>Oops!</Text>
        <Text>This page doesn't exist.</Text>
        <Link href='/'>
          <Text className={'hover:font-bold'}>Go Home!</Text>
        </Link>
      </View>
    </>
  );
}
