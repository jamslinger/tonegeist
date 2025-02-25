import '~/global.css';
import {useEffect} from 'react';
import { useFonts, RobotoMono_100Thin, RobotoMono_500Medium, RobotoMono_700Bold, RobotoMono_200ExtraLight, RobotoMono_300Light, RobotoMono_400Regular, RobotoMono_600SemiBold } from '@expo-google-fonts/roboto-mono';

import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import {Link, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import {Platform, Pressable, View} from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import {Ghost} from "~/lib/icons/ghost";
import {ArrowLeft} from "~/lib/icons/arrowLeft";
import {Settings} from "~/lib/icons/settings";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [loaded, error] = useFonts({
    Thin: RobotoMono_100Thin,
    ExtraLight: RobotoMono_200ExtraLight,
    Light: RobotoMono_300Light,
    Regular: RobotoMono_400Regular,
    Medium: RobotoMono_500Medium,
    SemiBold: RobotoMono_600SemiBold,
    Bold: RobotoMono_700Bold
  });

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            title: 'ToneHaunt',
            headerTitleStyle: {fontFamily: 'Regular'},
            headerLeft: () => (
              <View className={'pl-5'}>
                <Ghost color={isDarkColorScheme ? 'white' : 'black'}/>
              </View>
            ),
            headerRight: () => (
              <View className={'pr-5'}>
                <Link href={'/settings'}>
                  <Settings color={isDarkColorScheme ? 'white' : 'black'}/>
                </Link>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name='settings'
          options={{
            headerLeft: () => (
              <View className={'pl-3'}>
                <Link href={'/'} asChild>
                  <Pressable>
                    <ArrowLeft color={isDarkColorScheme ? 'white' : 'black'}/>
                  </Pressable>
                </Link>
              </View>
            ),
            headerRight: () => <ThemeToggle />,
          }}
        />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
