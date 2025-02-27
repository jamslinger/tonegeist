import {Card, CardHeader, CardTitle} from "~/components/ui/card";
import {View} from "react-native";
import * as React from "react";
import {Minigame} from "~/models/minigame";
import {Link} from "expo-router";
import {Text} from "~/components/ui/text";

interface MiniGameLevelCardProps {
  game: Minigame
  idx: number | 'free'
}

export default function MiniGameLevelCard({ game, idx }: MiniGameLevelCardProps) {
  return (
    <Link href={`/minigame/${game.name}/levels/${idx}`} asChild>
      <Card className='w-full p-6 rounded-2xl web:hover:bg-accent web:hover:text-accent-foreground'>
        <CardHeader>
          <View className='flex-row justify-between items-center overflow-hidden'>
            <View>
              <CardTitle className='pb-2'>{idx == 'free' ? 'Free Play' : 'Level ' + idx}</CardTitle>
              <View>
                <Text>Progress</Text>
              </View>
            </View>
          </View>
        </CardHeader>
      </Card>
    </Link>
  )
}