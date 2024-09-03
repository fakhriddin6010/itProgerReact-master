import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import AddFoodScreen from './container/AddFood';
import FoodDetailScreen from './container/FoodDetail';
import FoodListScreen from './container/FoodList';
import HeaderRightIcon from './container/HeaderRightIcon';
import MaterialManagementScreen from './container/MaterialManagement';
import PrepMethodScreen from './container/PrepMethod';
import ReceiptInputScreen from './container/ReceiptInput';
import RecipeDetailScreen from './container/RecipeDetailScreen';
import RecipeRecommendationScreen from './container/RecipeRecommendation';
import RecommendedListScreen from './container/RecommendedList';
import StatisticsScreen from './container/Statistics';
import StoreMethodScreen from './container/StoreMethod';
import LoginScreen from './navigation/LoginScreen'; // LoginScreen import qilindi
import SplashScreenComponent from './screens/SplashScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function FoodListStack() {
  return (
    <Stack.Navigator screenOptions={styles.stackScreen}>
      <Stack.Screen 
        name="FoodList" 
        component={FoodListScreen}
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
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
        name="RecipeDetail" 
        component={RecipeDetailScreen} 
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen 
        name="Login"  // LoginScreen qo'shildi
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

function RecipeRecommendationStack() {
  return (
    <Stack.Navigator screenOptions={styles.stackScreen}>
      <Stack.Screen 
        name="RecipeRecommendation" 
        component={RecipeRecommendationScreen}
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
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
        name="RecipeDetail" 
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
    <Stack.Navigator screenOptions={styles.stackScreen}>
      <Stack.Screen 
        name="Statistics" 
        component={StatisticsScreen} 
        options={({ navigation }) => ({
          headerRight: () => <HeaderRightIcon navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarStyle: styles.tabBar,
      }}
    >
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
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={styles.stackScreen}>
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
    </View>
  );
}

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8bbd1', // Asosiy background rang
  },
  stackScreen: {
    headerStyle: {
      backgroundColor: '#b8bbd1', // Stack header background rangi
    },
    headerTintColor: '#fff', // Header matn rangi
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
  tabBar: {
    backgroundColor: '#b8bbd1', // Tab bar background rangi
  },
});
