import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';

import AddFoodScreen from './container/AddFood';
import FoodDetailScreen from './container/FoodDetail';
import FoodListScreen from './container/FoodList';
import MaterialManagementScreen from './container/MaterialManagement';
import PrepMethodScreen from './container/PrepMethod';
import ReceiptInputScreen from './container/ReceiptInput';
import RecipeRecommendationScreen from './container/RecipeRecommendation';
import RecommendedListScreen from './container/RecommendedList';
import RecipeDetailScreen from './container/RecipeDetailScreen'; // RecipeDetailScreen import qilindi
import StatisticsScreen from './container/Statistics';
import StoreMethodScreen from './container/StoreMethod';
import SplashScreenComponent from './screens/SplashScreen';
import HeaderRightIcon from './container/HeaderRightIcon'; // HeaderRightIcon import qilingan

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function FoodListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="FoodList" 
        component={FoodListScreen}
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />, // HeaderRightIcon qo'shildi
        })}
      />
      <Stack.Screen 
        name="FoodDetail" 
        component={FoodDetailScreen} 
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen 
        name="AddFood" 
        component={AddFoodScreen} 
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen 
        name="PrepMethod" 
        component={PrepMethodScreen} 
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen 
        name="StoreMethod" 
        component={StoreMethodScreen} 
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen 
        name="ReceiptInput" 
        component={ReceiptInputScreen} 
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen 
        name="MaterialManagement" 
        component={MaterialManagementScreen} 
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen 
        name="RecipeDetail" // Bu yerda RecipeDetail qo'shildi
        component={RecipeDetailScreen} 
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}

function RecipeRecommendationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="RecipeRecommendation" 
        component={RecipeRecommendationScreen}
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />, // HeaderRightIcon qo'shildi
        })}
      />
      <Stack.Screen 
        name="RecommendedList" 
        component={RecommendedListScreen} 
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen 
        name="MaterialManagement" 
        component={MaterialManagementScreen} 
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen 
        name="RecipeDetail" // Bu yerda RecipeDetail qo'shildi
        component={RecipeDetailScreen} 
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}

function StatisticsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Statistics" 
        component={StatisticsScreen} 
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />, // HeaderRightIcon qo'shildi
        })}
      />
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
