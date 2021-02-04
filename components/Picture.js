import React, {useState, useEffect} from 'react'
import { SafeAreaView, ActivityIndicator, View, TouchableOpacity, FlatList, Image, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { fetcRandomElements, searchPicPage } from '../actions/actions'

import SearchBar from './SearchBar'
import Modal from 'react-native-modal';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
// import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';


function Picture(props){
    const [isModalVisible, setModalVisible] = useState(false);
    const [isOnePic, setOnePic] = useState(0);
    // const [isLoadPic, setLoadPic] = useState(0);
    const [isLoadOnepic, setLoadOnepic] = useState(true);
    const [isNumberPage, setNumberPage] = useState(2)
    const [searchTerm, setSearchTerm] = useState("");
    // const [hasPermission, setHasPermission] = useState(null);

    // useEffect(() => {
    //     (async () => {
    //     const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     setHasPermission(status === 'granted');
    //     })();
    // }, []);

    // let callback = res => {
    //     console.log('Response: ', res);
    //   };
    // let setWallpaper = (url) => {
    //     ManageWallpaper.setWallpaper(
    //        {
    //          uri: url,
    //        },
    //        callback,
    //        TYPE.HOME,
    //      );
    //    };
    const updateData = (value) => {
        setSearchTerm(value)
     }
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const fullScreenPic = (a) =>{
        setOnePic(a)
    }
    const saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
             await MediaLibrary.createAssetAsync(fileUri)   
        }
        else {
            console.log('Cant Save')
        }
    }
    const downloadLocal = (uri) => {
        let fileUri = FileSystem.documentDirectory + "full.jpg";
        FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
        saveFile(uri);
      })
      .catch(error => {
        console.error(error);
      })

    }
    const loadNewData = () => {
        if(props.data.data.length >= 100){
            setNumberPage(2)
            return 0
        }
        if(searchTerm === ''){
            setNumberPage(isNumberPage+1)
            props.fetchPage(isNumberPage)
        }
        else {
            setNumberPage(isNumberPage+1)
            props.searchPage(searchTerm, isNumberPage)
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
            <View style={{ flex: 1 }}>
            <SearchBar updateData={updateData}/>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                style={{ flex: 1 }}
                    data={props.data.data}
                    onEndReachedThreshold={0.1}
                    onEndReached={loadNewData}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={
                            () => {
                                toggleModal()
                                fullScreenPic(item.urls)
                            }
                        }
                        >
                        <Image
                            source={{ uri: item.urls.small }}
                            style={styles.picnormal}/>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
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
                        <Button
                            title="Save Picture"
                            onPress={() => downloadLocal(isOnePic.full)}
                            />
                        {/* <Button
                            title="Set Wallpaper"
                            onPress={() => setWallpaper(isOnePic.full)}
                            /> */}
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
} 

const mapStateToProps = (state) => {
    return {
        data: state
    }
}

  const mapDispatchToProps = (dispatch) => {
    return {
        fetchPage: (num) => dispatch(fetcRandomElements(num)),
        searchPage: (text, isNumberPage) => dispatch(searchPicPage(text, isNumberPage))
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
        height: "97%",
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
