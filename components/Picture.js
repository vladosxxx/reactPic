import React, {useState} from 'react'
import { ActivityIndicator, View, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetcRandomElements, searchPic } from '../actions/actions'
import SearchBar from './SearchBar'
import Modal from 'react-native-modal';

function Picture(props){
    const [isModalVisible, setModalVisible] = useState(false);
    const [isOnePic, setOnePic] = useState(0);
    const [isLoadOnepic, setLoadOnepic] = useState(true);
    const [isNumberPage, setNumberPage] = useState(2)
    // const [isSearch, setSearch] = useState("")
    // const updateData = (value) => setSearch(value)
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const fullScreenPic = (a) =>{
        setOnePic(a)
    }
    const loadNewData = () => {
        if(props.data.data.length >= 100){
            setNumberPage(2)
        }
        else{
            // if(isSearch.trim === ""){
            //     setNumberPage(isNumberPage+1)
            //     props.searchPage(isSearch, isNumberPage)
            // }
            setNumberPage(isNumberPage+1)
            props.fetchPage(isNumberPage)
        }
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
                <SearchBar/>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Wallpaper</Title>
          </Body>
          <Right />
        </SearchBar>
                <SearchBar/>
                <FlatList
                    style={{color: 'red'}}
                    data={props.data.data}
                    onEndReachedThreshold={0.1}
                    onEndReached={loadNewData}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={
                            () => {
                                toggleModal()
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
                    backdropColor = "black"

                >
                    <TouchableOpacity onPress={()=>toggleModal()}>
                    {isLoadOnepic ? (
                            <ActivityIndicator size="large" color="white" style={styles.loading} />) : null}
                            <Image
                                source={{ uri: isOnePic.full  }}
                                style={styles.picfull}
                                onLoadStart={() => setLoadOnepic(true)}
                                onLoad={() => setLoadOnepic(false)}
                                onLoadEnd={() => 
                                setLoadOnepic(false)}
                            />
                    </TouchableOpacity>
                </Modal>

            </View>
        )
    }
} 

const mapStateToProps = (state) => {
    //  console.log("STATE ", state)
    return {
        data: state
    }
}

  const mapDispatchToProps = (dispatch) => {
    return {
        fetchPage: (num) => dispatch(fetcRandomElements(num)),
        // searchPage: (text, num) => dispatch(searchPic(text, num))
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
    },
    loading: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    }
});
  export default connect(mapStateToProps, mapDispatchToProps)(Picture)
