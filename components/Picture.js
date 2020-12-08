import React, {useState} from 'react'
import { ActivityIndicator, View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { errorAfterFiveSeconds } from '../actions/actions'
import Modal from 'react-native-modal';

function Picture(props){
    const [isModalVisible, setModalVisible] = useState(false);
    const [isOnePic, setOnePic] = useState(0);
    const [isLoadOnepic, setLoadOnepic] = useState(true);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const fullScreenPic = (a) =>{
        setOnePic(a)
        setLoadOnepic(false)
    }
    let popUpPic = 0
    if (isLoadOnepic) {
        popUpPic = <ActivityIndicator size="large" color="#0000ff" />;
      } else {
        popUpPic = <Image
                        source={{ uri: isOnePic.full  }}
                        style={styles.picfull}
                    />
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
                <FlatList
                    style={{color: 'red'}}
                    data={props.data.data}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={
                            // alert(`Author Name: ${item.user.name}\nLikes: ${item.likes}`)
                            () => {toggleModal()
                            fullScreenPic(item.urls)}
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
                    <TouchableOpacity onPress={()=>toggleModal()}>
                        {popUpPic}
                    </TouchableOpacity>
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
