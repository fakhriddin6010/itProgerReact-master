import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import FoodListScreen from '../container/FoodList';
import RecipeRecommendationScreen from '../container/RecipeRecommendation';
import StatisticsScreen from '../container/Statistics';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="FoodList" 
        component={FoodListScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../assets/menu4.png')} style={{ width: size, height: size }} />
          ),
        }} 
      />
      <Tab.Screen 
        name="RecipeRecommendation" 
        component={RecipeRecommendationScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../assets/food.png')} style={{ width: size, height: size }} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Statistics" 
        component={StatisticsScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../assets/pie-chart.png')} style={{ width: size, height: size }} />
          ),
        }} 
      />
    </Tab.Navigator>
    
  );
}
