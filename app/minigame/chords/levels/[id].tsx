import * as React from 'react';
import {Pressable, View} from 'react-native';
import {useColorScheme} from "~/lib/useColorScheme";
import {router, Stack, useLocalSearchParams} from "expo-router";
import {ArrowLeft} from "~/lib/icons/arrowLeft";

export default function Level() {
  const { isDarkColorScheme } = useColorScheme();

  const item = useLocalSearchParams();

  return (
    <>
      <Stack.Screen options={{
        title: 'Level ' + item.id,
        headerLeft: () => (
          <View className={'pl-3'}>
            <Pressable onPress={router.back}>
              <ArrowLeft color={isDarkColorScheme ? 'white' : 'black'}/>
            </Pressable>
          </View>
        )}}
      />
    </>
  );
}