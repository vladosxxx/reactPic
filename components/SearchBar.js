import React, { useState } from 'react';
import {connect} from "react-redux";
import {searchPic, fetcRandomPics} from "../actions/actions";
import { Button, Header, Input, Text, Icon, ThemeProvider } from 'react-native-elements';



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
      <ThemeProvider>
        <Header searchBar rounded>
            <Icon name="ios-search" />
            <Input
                placeholder="Search"
                value={searchTerm}
                onSubmitEditing={searchSubmit}
                onChangeText={handleChange}
            />
            <Icon name="ios-people" />
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </ThemeProvider>
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
