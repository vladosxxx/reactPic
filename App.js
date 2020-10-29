import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import Picture from './components/Picture'
import { createStore } from 'redux'
import store from './store/store'
import { connect, Provider } from 'react-redux'

const initialState = {

}

let App = () => {
  // const [isLoading, setLoading] = useState(true);
  // const [imgs, setImg] = useState([]);

  // useEffect (()=>{
  //   const unsplash = new Unsplash({
  //   accessKey: "7SI75r0Sdp9V-rT7tOLGF4AdEs7j4764GpQn_4VpMk4"
  //   });
  //   unsplash.photos.listPhotos(1, 30)
  //     .then(toJson)
  //     .then(data => {
  //       setImg(data)})
  //     .catch(error => console.error(error))
  //     .finally(() => setLoading(false))
  //   }, []
  // )
  // const data1 = state => ({ imgs: state.imgs})
return (
  <Provider store={store}>
    <View style={styles.container}>
     {/* {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={imgs}
          keyExtractor={( item ) => item.id}
          renderItem={({item})  => 
            <View style={styles.item}>
              <Image
              style={{width: 100, height: 100}}
              source={{ uri: item.urls.small}} 
                />
              <Text style={styles.text}>{item.user.name}</Text>
            </View>
          }
        />
      )} */}
      <Text>this.state.</Text>
      <Picture />
      <StatusBar style="auto" />
    </View>
    </Provider>
  );
}
const mapStateToProps = state => {
  console.log(state)
  return {
    test: 1
  }
}

const WrappedMainComponent = connect()(App)

export default App

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 20
  },
  item: {
    borderColor: 'white',
    borderWidth: 1,
    margin: 10,
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center'
  }
});