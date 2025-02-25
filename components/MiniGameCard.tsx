import {Card, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";
import {View} from "react-native";
import {Button} from "~/components/ui/button";
import {Text} from "~/components/ui/text";
import * as React from "react";

interface MiniGameCardProps {
  title: string
  description: string
  action: () => void
}

export default function MiniGameCard(props: MiniGameCardProps) {
  return (
    <Card className='w-full p-6 rounded-2xl'>
      <CardHeader>
        <View className='flex-row justify-between items-center overflow-hidden'>
          <View>
            <CardTitle className='pb-2'>{props.title}</CardTitle>
            <CardDescription className='text-base font-semibold'>{props.description}</CardDescription>
          </View>
          <Button
            variant='outline'
            className='shadow shadow-foreground/5'
            onPress={props.action}
          >
            <Text className="font-thin">Play</Text>
          </Button>
        </View>
      </CardHeader>
    </Card>
  )
}