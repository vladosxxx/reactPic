import React from 'react';
import {StyleSheet} from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

function SearchBar(){
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </Container>
    );
}

// const styles = StyleSheet.create({
//     searchBar: {
//         height: '100px'
//     }
  
//   })
  
export default SearchBar