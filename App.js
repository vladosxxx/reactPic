import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
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


const Drawer = createDrawerNavigator();
const store = createStore(fetchData, applyMiddleware(thunk))
store.dispatch(fetcRandomPics(1))

function App() {
    const [isReady, setReady] = useState(false)

    useEffect(() => {
      async function fetchFonts() {
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
        setReady(true);
      }
      fetchFonts()
    }, [])
    if (!isReady) {
      return <AppLoading />;
    }
    else {
      return (
        <Provider store={store}>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Picture">
                    <Drawer.Screen name="Picture" component={Picture} />
                    <Drawer.Screen name="AboutApp" component={AboutApp} />
                </Drawer.Navigator>
            </NavigationContainer>
        </Provider>
      );
    }

}

export default App