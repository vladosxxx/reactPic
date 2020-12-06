import React from 'react'
import { View, Text, Button, FlatList, Item } from 'react-native'
import { connect } from 'react-redux'
import { errorAfterFiveSeconds } from '../actions/actions'
// impot fetchData from '../store/store'

function Picture(props){
    // console.log(props.urls[0])
    return (
        <View>
             <Text style={{color: 'black'}}>{props.links.html}</Text>
             <Text style={{color: 'red'}}>{props.id}</Text>
        
            <FlatList
                style={{color: 'red'}}
                data={props}
                renderItem={({ item }) => (
                        <Item title={ item.links.html }/>
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
    return {
        id: [...state.id],
        urls: [...state.links] }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(errorAfterFiveSeconds())
    };
};
  export default connect(mapStateToProps, mapDispatchToProps)(Picture)
