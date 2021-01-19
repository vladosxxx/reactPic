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
    backgroundColor: 'black',
    marginTop: Constants.statusBarHeight
  }

})

export default StatusBar