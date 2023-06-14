import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image } from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import * as React from 'react';
import { createNavigatorFactory, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from  './components/LoginScreen';
import SignUp
 from './components/SignUp';
import Home from './components/Home';
import Setting from './components/Setting';
import Profile from './components/Profile';
import Search from './components/Search';
import AddBaiViet from './components/AddBaiViet';
import UpdateBaiViet from './components/UpdateBaiViet';
////



const Tab = createBottomTabNavigator();
const Stack= createNativeStackNavigator();
function MyTabs(props) {
  
  var _id = props.route.params.aidi;
  console.log(_id);
  
  var _role= props.route.params.quyen;
  console.log("Admin "+_role);
  var taik = props.route.params.taikhoan;
  var matk = props.route.params.matkhau;
  
  return (
    <Tab.Navigator
    
    screenOptions={({route}) => ({
      tabBarShowLabel:false,
      
      tabBarIcon: ({focused, size, colour}) =>{
        let iconName;
        if(route.name==='Home'){
          iconName= focused ? 'ios-home' : 'ios-home-outline';
          size= focused? +25 : +15;

        }else if(route.name==='Setting'){
          iconName= focused ? 'ios-settings' : 'ios-settings-outline';
          size= focused? +25 : +15;
        }
        // }else if(route.name==='Search'){
        //   iconName= focused ? 'ios-search' : 'ios-search-outline';
        //   size= focused? +25 : +15;

        // }
        return < Ionic name={iconName} size={size} colour={colour}/>
      },
      
    })}
    
    >
         <Tab.Screen name='Home' component={Home} initialParams={{idFromHomeTab:_id, roleFromHomeTab:_role, tkFromHomeTab:taik}}/>
         <Tab.Screen name='Setting' component={Profile} initialParams={{idFromHomeTab:_id, roleFromHomeTab:_role, tkFromHomeTab:taik, mkFromHomeTab:matk}}/>
          {/* <Tab.Screen name='Search' component={Search} /> */}

    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}} >
          <Stack.Screen name='Login' component={Login}   />
          <Stack.Screen name='SignUp' component={SignUp}   />
          <Stack.Screen name='HomeTab' component={MyTabs}/>
          <Stack.Screen name='AddBaiViet' component={AddBaiViet}/>
          <Stack.Screen name='UpdateBaiViet' component={UpdateBaiViet}/>
          

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
