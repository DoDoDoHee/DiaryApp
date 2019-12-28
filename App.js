import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainScreen from './screens/MainScreen';
import DetailScreen from './screens/DetailScreen';
import WriteScreen from './screens/WriteScreen';

//BottomTabNavigator를 생성합니다. 
const BaseNavi = createBottomTabNavigator({
  //MainScreen이라는 이름의 tab item을 만듭니다
  MainScreen: {
  //Tab을 하면 띄워줄 screenㅇ로 MainScreen을 설정합니다
    screen: MainScreen,
  },
  DetailScreen: {
    screen: DetailScreen,
  },
  WriteScreen: {
    screen: WriteScreen,
  },
},
{
  tabBarOptions:{
  showLabel :false,
  }
  }
  
  );

  const BaseNavi2 = createStackNavigator( 
    {
      Write : WriteScreen, //Write라는 이름이 사용되면 WriteScreen을 사용해주겠다
      Tab: BaseNavi, //Tab이라는 이름이 사용되면 우리가 만들었던 TabNavi를 사용해주겠다
      Detail : DetailScreen, //나중에 detailpage도 stack방식의 navi로 이동해줄예정입니다.
    },
    {
      initialRouteName:'Tab',
      mode : 'modal',  
      headerMode : 'none' ,
    } 
    )
    
const MyNavi = createAppContainer(BaseNavi2);

export default class App extends React.Component {
  render(){
  return (
    <View style={styles.container}>
      <MyNavi/>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
