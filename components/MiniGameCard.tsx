import {Card, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {View} from "react-native";
import * as React from "react";
import {Link} from "expo-router";

interface MiniGameCardProps {
  name: 'chords'
  title: string
  description: string
}

export default function MiniGameCard({name, title, description}: MiniGameCardProps) {
  return (
    <Link href={`/minigame/${name}`}>
      <Card className='w-full p-6 rounded-2xl web:hover:bg-accent web:hover:text-accent-foreground'>
        <CardHeader>
          <View className='flex-row justify-between items-center overflow-hidden'>
            <View>
              <CardTitle className='pb-2'>{title}</CardTitle>
              <CardDescription className='text-base font-semibold'>{description}</CardDescription>
            </View>
          </View>
        </CardHeader>
      </Card>
    </Link>
  )
}