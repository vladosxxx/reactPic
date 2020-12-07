import React from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { errorAfterFiveSeconds } from '../actions/actions'
// impot fetchData from '../store/store'

function Picture(props){
    function fullScreenPic(a){
        console.log(a)
    }
    if (props.data.isLoading === true){
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
            )
    }
    else {
        return (
            <View>
                <Text style={{color: 'red'}}>{props.data.isLoading}</Text>
                <FlatList
                    style={{color: 'red'}}
                    data={props.data.data}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => alert(`Author Name: ${item.user.name}\nLikes: ${item.likes}`)}>
                        <Image
                            source={{uri: item.urls.small}}
                            style={styles.picnormal}/>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    picfull: {
        height: "100%",
        width: "100%"
    },
    picnormal: {
        height: 150,
        width: "100%"
    }
});
  export default connect(mapStateToProps, mapDispatchToProps)(Picture)
