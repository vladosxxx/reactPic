import React, {useState} from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, FlatList, Image, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { errorAfterFiveSeconds } from '../actions/actions'
import Modal from 'react-native-modal';

function Picture(props){
    function fullScreenPic(a){
        console.log(a)
    }
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
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
                        <TouchableOpacity onPress={
                            // alert(`Author Name: ${item.user.name}\nLikes: ${item.likes}`)
                            () => {toggleModal()
                            fullScreenPic(item.id)}
                        }
                        >
                        <Image
                            source={{ uri: item.urls.small }}
                            style={styles.picnormal}/>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
                <Modal
                    isVisible={isModalVisible}
                    backdropColor = "white"

                >
                    <View style={{ flex: 1 }}>
                        <Text>I am the modal content!!!!!!!!!!!!!!!!!!</Text>
                        <Button title="Hide modal" onPress={toggleModal} />
                    </View>
                </Modal>
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
