import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';

import AddFoodScreen from './container/AddFood';
import FoodDetailScreen from './container/FoodDetail';
import FoodListScreen from './container/FoodList';
import PrepMethodScreen from './container/PrepMethod';
import ReceiptInputScreen from './container/ReceiptInput';
import RecipeRecommendationScreen from './container/RecipeRecommendation';
import StatisticsScreen from './container/Statistics';
import StoreMethodScreen from './container/StoreMethod';
import SplashScreenComponent from './screens/SplashScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function FoodListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FoodList" component={FoodListScreen} />
      <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
      <Stack.Screen name="AddFood" component={AddFoodScreen} />
      <Stack.Screen name="PrepMethod" component={PrepMethodScreen} />
      <Stack.Screen name="StoreMethod" component={StoreMethodScreen} />
      <Stack.Screen name="ReceiptInput" component={ReceiptInputScreen} />
    </Stack.Navigator>
  );
}

function RecipeRecommendationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RecipeRecommendation" component={RecipeRecommendationScreen} />
    </Stack.Navigator>
  );
}

function StatisticsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Statistics" component={StatisticsScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="FoodListStack" 
        component={FoodListStack} 
        options={{
          tabBarIcon: ({ size }) => (
            <Image source={require('./assets/menu4.png')} style={{ width: size, height: size }} />
          ),
          tabBarLabel: 'Food List',
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="RecipeRecommendationStack" 
        component={RecipeRecommendationStack} 
        options={{
          tabBarIcon: ({ size }) => (
            <Image source={require('./assets/food.png')} style={{ width: size, height: size }} />
          ),
          tabBarLabel: 'Recipes',
          headerShown: false,
        }} 
      />
      <Tab.Screen 
        name="StatisticsStack" 
        component={StatisticsStack} 
        options={{
          tabBarIcon: ({ size }) => (
            <Image source={require('./assets/pie-chart.png')} style={{ width: size, height: size }} />
          ),
          tabBarLabel: 'Statistics',
          headerShown: false,
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreenComponent} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Main" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
