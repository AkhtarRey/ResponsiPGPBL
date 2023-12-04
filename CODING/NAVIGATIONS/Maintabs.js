import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import List from '../PAGES/List';
import Icon from 'react-native-vector-icons/FontAwesome';

const input = 'https://akhtarrey.github.io/MapKebakaran/';
const map = 'https://akhtarrey.github.io/MapKebakaran/map.html';

const Tab = createBottomTabNavigator();

function ListScreen() {
  return <List />;
}

function InputScreen() {
  return <WebView source={{uri: input}} />;
}

function MapScreen() {
  return <WebView source={{uri: map}} />;
}

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Input"
        screenOptions={{
          headerShown: false, // Hide the header for all screens
          tabBarActiveTintColor: '#F2E8C6', // Active tab text color
          tabBarInactiveTintColor: '#DAD4B5', // Inactive tab text color
          tabBarStyle: {
            backgroundColor: '#952323', // Background color of the tab bar
          },
          tabBarLabelStyle: {
            fontSize: 14, // Font size of the tab labels
          },
          tabBarIconStyle: {
            marginBottom: -3, // Adjust icon position if needed
          },
        }}>
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({color, size}) => (
              <Icon name="map-marker" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Input"
          component={InputScreen}
          options={{
            tabBarLabel: 'Input',
            tabBarIcon: ({color, size}) => (
              <Icon name="pencil" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="List"
          component={ListScreen}
          options={{
            tabBarLabel: 'List',
            tabBarIcon: ({color, size}) => (
              <Icon name="list" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;
