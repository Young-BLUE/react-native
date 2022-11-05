import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text, View } from 'react-native';
import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Stack from './Stack';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === 'dark';
  // Root로 이동해서 Stack 으로 이동 후 Stack의 "Three를 찾아감"
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? '#1e272e' : 'white',
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? '#1e272e' : 'white',
        },
        tabBarActiveTintColor: isDark ? '#d97e00' : '#d97e00',
        tabBarInactiveTintColor: isDark ? 'white' : 'lightgray',
        headerStyle: {
          backgroundColor: isDark ? '#1e272e' : 'white',
        },
        headerTitleStyle: {
          color: isDark ? 'white' : '#1e272e',
        },
        tabBarLabelStyle: {
          marginTop: -5,
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? 'film' : 'film-outline'}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? 'tv' : 'tv-outline'}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? 'search' : 'search-outline'}
                color={color}
                size={size}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
