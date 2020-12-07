import React from 'react'
import { View, Text, Button, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import { errorAfterFiveSeconds } from '../actions/actions'
// impot fetchData from '../store/store'

function Picture(props){
    // console.log(props.urls[0])
    return (
        <View>
            <Text style={{color: 'red'}}>{props.data.isLoading}</Text>
        
            <FlatList
                style={{color: 'red'}}
                data={props.data.data}
                renderItem={({ item }) => (
                    <Image 
                        source={{uri: item.urls.small}} 
                        style={{height:150, width:'100%'}} />
                  )}
                keyExtractor={item => item.id}
            />
            <Button
                onPress={() => props.fetchData()}
                title="Learn More"
            />
        </View>
    )
} 

const mapStateToProps = (state) => {
    console.log("STATE ", state)
    return {
        data: state
    }
}
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(errorAfterFiveSeconds())
    };
};
  export default connect(mapStateToProps, mapDispatchToProps)(Picture)
