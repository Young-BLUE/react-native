import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import Detail from "../screens/Detail";
import {BLACK_COLOR, WHITE_COLOR} from "../colors";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
    const isDark = useColorScheme() === 'dark';
    return (
        <NativeStack.Navigator screenOptions={{
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: isDark ? BLACK_COLOR : WHITE_COLOR,
            },
            headerTitleStyle: {
                color: isDark ? WHITE_COLOR : BLACK_COLOR,
            },
        }}>
            <NativeStack.Screen name="Detail" component={Detail}/>
        </NativeStack.Navigator>
    )
};

export default Stack;
