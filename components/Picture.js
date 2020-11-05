import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

function Picture(props){
    // console.log(props)
    return (
        <View>
            <Text>{props.title}</Text>
            <Text style={{color: 'red'}}>{props.title}</Text>
        </View>
    )
} 

const mapStateToProps = (state) => {
    return { 
      title: state.title
    }
  }
  export default connect(mapStateToProps)(Picture)