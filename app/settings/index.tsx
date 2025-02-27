import * as React from 'react';
import {Pressable, View} from 'react-native';
import { Switch } from '~/components/ui/switch';
import {Card, CardHeader} from "~/components/ui/card";
import {useColorScheme} from "~/lib/useColorScheme";
import {MoonStar} from "~/lib/icons/moonstar";
import { Sun } from '~/lib/icons/sun';
import {Link, Stack} from "expo-router";
import {ArrowLeft} from "~/lib/icons/arrowLeft";
import {Text} from "~/components/ui/text";

export default function Settings() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <>
      <Stack.Screen options={{
        title: '',
        headerLeft: () => (
          <View className={'pl-3'}>
            <Link href={'/'} asChild>
              <Pressable>
                <ArrowLeft color={isDarkColorScheme ? 'white' : 'black'}/>
              </Pressable>
            </Link>
          </View>
        )}}
      />
      <View className='flex-1 items-center gap-5 px-10 py-6 bg-secondary/30'>
        <Card className='w-full p-6 rounded-2xl'>
          <CardHeader>
            <View className='flex-row items-center justify-between overflow-hidden gap-3'>
              <Text style={{ color: isDarkColorScheme ? 'light' : 'dark'}}>
                Dark Mode
              </Text>
              <View className='flex-row items-center justify-between overflow-hidden gap-3'>
                {isDarkColorScheme ? <MoonStar color={'white'} /> : <Sun />}<Switch checked={isDarkColorScheme} onCheckedChange={() => setColorScheme(colorScheme == 'dark' ? 'light' : 'dark')} />
              </View>
            </View>
          </CardHeader>
        </Card>
      </View>
    </>
  );
}
