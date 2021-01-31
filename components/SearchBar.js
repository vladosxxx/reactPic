import React, { useState } from 'react';
import { Header, Item, Input, Icon, Button, Text, View } from 'native-base';
import {connect} from "react-redux";
import {searchPic, fetcRandomPics} from "../actions/actions";
import { useNavigation } from '@react-navigation/native';



function SearchBar(props){
    const [searchTerm, setSearchTerm] = useState("");
    const navigation = useNavigation();
    const handleChange = e => {
      setSearchTerm(e)
    };
    const searchSubmit = () => {
      if(searchTerm.trim() === ""){
          setSearchTerm("")
          props.updateData(searchTerm)
          props.fetchRandom()
      }
      else{
        props.updateData(searchTerm)
        props.fetchData(searchTerm)
      }
    }
    const cleanSearch = () => {
      setSearchTerm("")
      props.fetchRandom()
    }

    return (
      <View>
          <Button
              transparent
              onPress={() => navigation.openDrawer()}>
              <Icon name="menu" />
          </Button>
        <Header searchBar rounded>
            <Item>
          <Icon name="ios-search" 
            onPress={searchSubmit}
          />
            <Input
                placeholder="Search"
                value={searchTerm}
                onSubmitEditing={searchSubmit}
                onChangeText={handleChange}
            />
            <Icon
              name="ios-close"
              onPress={cleanSearch}
             />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </View>
    );
}

const mapDispatchToProps = (dispatch) => {
    console.log('dispatch')
    return {
        fetchData: (text) => dispatch(searchPic(text, 1)),
        fetchRandom: () => dispatch(fetcRandomPics(1))
    };
};
export default connect(null, mapDispatchToProps)(SearchBar)
