import React, { useState } from 'react';
import { Header, Item, Input, Icon, Button, Text } from 'native-base';
import { View } from "react-native";
import {connect} from "react-redux";
import {searchPic, fetcRandomPics} from "../actions/actions";


function SearchBar(props){
    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = e => {
      setSearchTerm(e)
    };
    const searchSubmit = () => {
      if(searchTerm.trim() === ""){
        props.fetchRandom()
    }
    else{
      props.fetchData(searchTerm)
      // props.updateData(searchTerm)
    }
    }
    

    return (
      <View>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
                placeholder="Search"
                value={searchTerm}
                onSubmitEditing={searchSubmit}
                onChangeText={handleChange}
            />
            <Icon name="ios-people" />
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
        fetchData: (text) => dispatch(searchPic(text)),
        fetchRandom: () => dispatch(fetcRandomPics(1))
    };
};
export default connect(null, mapDispatchToProps)(SearchBar)
