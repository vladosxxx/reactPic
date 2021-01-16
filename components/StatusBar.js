import React from 'react';
import {View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';

function StatusBar () {
    return(
      <View style={styles.statusBar}> 
      </View>
    );
  
}

const styles = StyleSheet.create({
  statusBar: {
//     flex: 1,
//     backgroundColor: Platform.OS === 'ios' ? 'red' : 'black',
//     alignItems: 'center',
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     height: StatusBar.currentHeight,
    backgroundColor: 'black',
    marginTop: Constants.statusBarHeight
  }

})

export default StatusBar