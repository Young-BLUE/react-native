import AppLoading from 'expo-app-loading';
import React from 'react';
import * as Font from 'expo-font';
import {Text, useColorScheme} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {QueryClient, QueryClientProvider} from "react-query";
import {
    NavigationContainer,
    DarkTheme,
    DefaultTheme,
} from '@react-navigation/native';
import Root from './navigation/Root';
import {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from './styled';

export default function App() {
    const [fonts] = Font.useFonts(Ionicons.font);
    const isDark = useColorScheme() === 'dark';

    const queryClient = new QueryClient();

    if (!fonts) {
        return <AppLoading/>;
    }
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
                <NavigationContainer>
                    <Root/>
                </NavigationContainer>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
