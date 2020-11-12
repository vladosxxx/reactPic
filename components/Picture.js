import React from 'react'
import { View, Text, Button, FlatList, Item } from 'react-native'
import { connect } from 'react-redux'
import { errorAfterFiveSeconds } from '../actions/actions'
// impot fetchData from '../store/store'

function Picture(props){
    // console.log(props.urls)
    return (
        <View>
            {/* <Text>{props.urls}</Text> */}
            {/* <Text style={{color: 'red'}}>{props.urls}</Text> */}
        
            <FlatList
                style={{color: 'red'}}
                data={props}
                renderItem={({ item }) => (
                        <Item title={ item.urls }/>
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
    console.log(state.id)
    return { 
        id: state.id,
        urls: state.urls }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(errorAfterFiveSeconds())
    };
};
  export default connect(mapStateToProps, mapDispatchToProps)(Picture)
