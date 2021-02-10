import React, {useState, useEffect} from 'react'
import { SafeAreaView, ActivityIndicator, View, TouchableOpacity, FlatList, Image, StyleSheet, Button, Text, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { fetcRandomElements, searchPicPage, fetcRandomPics, searchPic, actoinClearData } from '../actions/actions'
import { useFocusEffect } from '@react-navigation/native';
import SearchBar from './SearchBar'
import Modal from 'react-native-modal';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { Icon } from 'native-base'



function Picture(props){
    const [isModalVisible, setModalVisible] = useState(false);
    const [isOnePic, setOnePic] = useState(0);
    const [isLoadLocal, setLoadLocal] = useState(false);
    const [isLoading2, setLoading2] = useState(false);
    const [isDone, setDone] = useState(false);
    const [isLoadOnepic, setLoadOnepic] = useState(true);
    const [isNumberPage, setNumberPage] = useState(2)
    const [searchTerm, setSearchTerm] = useState("");
    const [hasPermission, setHasPermission] = useState(null);
    // const [isParam, setParam] = useState(null)

    useFocusEffect(
        React.useCallback(() => {
            
            setSearchTerm(props.route.params.pics)
            if(props.route.params.pics !== "")
            {
                console.log('here1')
                props.clearData()
                props.searchPicFirst(props.route.params.pics)
                console.log("search",searchTerm)
                
            }else
            {
                console.log('here2')
                props.clearData()
                props.fetchFirst(1)
                console.log("search",searchTerm)
            }
            
            // props.fetchFirst(1)
        }, [props.route.params])
    )
    useEffect(() => {
        (async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        setHasPermission(status === 'granted');
        })();
        // props.fetchFirst(1)
    }, []);
    const updateData = (value) => {
        console.log('UPDATE Data', value)
        setSearchTerm(value)
     }
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const fullScreenPic = (a) =>{
        setOnePic(a)
    }
    const saveFile = async (fileUri) => {
        // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (hasPermission === "granted") {
             await MediaLibrary.createAssetAsync(fileUri)   
        }
        else {
            console.log('Cant Save')
        }
    }
    const downloadLocal = (uri) => {
        setLoadLocal(true)
        let fileUri = FileSystem.documentDirectory + "full.jpg";
        FileSystem.downloadAsync(uri, fileUri)
        .then(({ uri }) => saveFile(uri))
        .then(() => setLoadLocal(false))
        .then(() => setDone(true))
        .then(() => new Promise((resolve) => setTimeout(resolve, 2000)))
        .catch(error => {
            console.error(error);
        }).finally(()=>setDone(false))
    
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
    if (isLoading2 === true || props.data.isLoading === true){
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
                        <ImageBackground 
                            source={{ uri: item.urls.small }}
                            style={styles.picnormal}>
                            <View style={{width: '100%',position: 'absolute', left: 0, bottom: 0, backgroundColor: 'rgba(232, 232, 232, 0.5);', paddingLeft: 10}}>
                                <Text style={{
                                    color: 'rgba(0,0,0,0.8)', 
                                    fontSize: 20,
                                    }}>Picture by {item.user.name}</Text>
                            </View>
                        </ImageBackground>
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
                        <Modal
                            isVisible={isLoadLocal}
                            backdropColor = "black"

                        >
                            <View style={styles.loadLocal}>
                            <ActivityIndicator size="large" color="white"/>
                            <Text style={styles.loadingText}>Downloading...</Text>
                            </View>
                        </Modal>
                        <Modal
                            isVisible={isDone}
                            backdropColor = "black"

                        >
                            <View style={styles.loadLocal}>
                                {/* <Image source={require('../assets/check-circle.gif')}></Image> */}
                            <Icon name="ios-checkbox-outline" style={{fontSize: 20, color: 'white'}}/>
                            <Text style={styles.loadingText}>Done</Text>
                            </View>
                        </Modal>
                        <Button
                            title="Save Picture"
                            onPress={() => downloadLocal(isOnePic.full)}
                        />

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
        clearData: () => dispatch(actoinClearData()),
        fetchFirst: () => dispatch(fetcRandomPics(1)),
        fetchPage: (num) => dispatch(fetcRandomElements(num)),
        searchPage: (text, isNumberPage) => dispatch(searchPicPage(text, isNumberPage)),
        searchPicFirst: (text) => dispatch(searchPic(text, 1))
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
        height: 250,
        width: "100%"
    },
    loading: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        // justifySelf: 'center',
        alignSelf: 'center',
        color: 'white'
},
    loadLocal: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        flexDirection: "column"
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Picture)
