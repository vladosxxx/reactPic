import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { ScrollView, Image, Text, SafeAreaView} from 'react-native';
import { Icon } from "native-base"
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import fetchData from './store/store';
import Picture from './components/Picture'
import { AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import {fetcRandomPics} from "./actions/actions";
import AboutApp from "./components/AboutApp";
import Intro from './components/Intro'


const Drawer = createDrawerNavigator();
const store = createStore(fetchData, applyMiddleware(thunk))
store.dispatch(fetcRandomPics(1))

function App() {
    const [isReady, setReady] = useState(false)

    useEffect(() => {
        (async () => {
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
        setReady(true);
      }) ()
    }, [])
    if (!isReady) {
      return <AppLoading />;
    }
    else {
      return (
        <Provider store={store}>
            <NavigationContainer>
                <Drawer.Navigator 
                initialRouteName="Picture"
                drawerContent={props => CustomDrawer(props)}
                drawerContentOptions={{
                  
                }}
                >
                    <Drawer.Screen 
                      name="Top Pictures" 
                      component={Picture}
                      initialParams={{pics: " "}}
                      options={{
                        drawerIcon: () => (
                          <Icon
                            name="star"
                          />
                        )
                      }}
                      />
                    <Drawer.Screen
                        name="Cars"
                        component={Picture}
                        initialParams={{pics: "car"}}
                        options={{
                          drawerIcon: () => (
                            <Icon
                              name="car"
                            />
                          )
                        }}
                    />
                    <Drawer.Screen
                        name="Animals"
                        component={Picture}
                        initialParams={{pics: "animal"}}
                        options={{
                          drawerIcon: () => (
                            <Icon
                              name="md-paw"
                            />
                          )
                        }}
                    />
                    <Drawer.Screen
                        name="Abstract"
                        component={Picture}
                        initialParams={{pics: "abstract"}}
                        options={{
                          drawerIcon: () => (
                            <Icon
                              name="ios-aperture"
                            />
                          )
                        }}
                    />
                    <Drawer.Screen
                        name="Space"
                        component={Picture}
                        initialParams={{pics: "space"}}
                        options={{
                          drawerIcon: () => (
                            <Icon
                              name="planet"
                            />
                          )
                        }}
                    />
                    <Drawer.Screen 
                      name="Set Wallpaper" 
                      component={Picture}
                      options={{
                        drawerIcon: () => (
                          <Icon
                            name="hammer"
                          />
                        )
                      }}
                      />
                    <Drawer.Screen 
                      name="About" 
                      component={AboutApp}
                      options={{
                        drawerIcon: () => (
                          <Icon
                            name="information-circle"
                          />
                        )
                      }}
                      />
                </Drawer.Navigator>
            </NavigationContainer>
        </Provider>
      );
    }

}
const CustomDrawer = props => {
  return (
    <ScrollView contentContainerStyle={{flex: 1,  flexDirection: 'column', justifyContent: 'space-between' }}>
    <SafeAreaView>
        <Image 
        source={require('./assets/vinyl3.png')}
        style={{ width: 150, height: 150, alignSelf: 'center'}} 
        /> 
      <DrawerItemList {...props}/>
    </SafeAreaView>

   <Text
    style={{
      alignSelf: 'center',
      margin: 10
      }}
   >v1.0</Text>

  </ScrollView>
 );
};

export default App