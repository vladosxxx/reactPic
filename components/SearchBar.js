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
    if(searchTerm === ""){
        props.fetchRandom()
    }
    else{
        props.fetchData(searchTerm)
    }
    return (
      <View>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
                placeholder="Search"
                value={searchTerm}
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
        fetchData: (searchTerm) => dispatch(searchPic(searchTerm)),
        fetchRandom: () => dispatch(fetcRandomPics())
    };
};
export default connect(null, mapDispatchToProps)(SearchBar)
