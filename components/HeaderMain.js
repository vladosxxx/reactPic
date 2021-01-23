import React from "react";
import { Header, Left, Button, Body, Right, Title } from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons';
import Drawer from 'react-native-drawer';
import AboutApp from './Menu'

function HeaderMain() {
  // closeControlPanel = () => {
  //   _drawer.close()
  // };
  // openControlPanel = () => {
  //   _drawer.open()
  // };
    return(
        <Container>
            <Header>
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                        <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>HomeScreen</Title>
                </Body>
                <Right />
            </Header>
            <Content padder>
                <Card>
                    <CardItem>
                        <Body>
                            <Text>Chat App to talk some awesome people!</Text>
                        </Body>
                    </CardItem>
                </Card>
                <Button full rounded dark
                        style={{ marginTop: 10 }}
                        onPress={() => this.props.navigation.navigate("Chat")}>
                    <Text>Chat With People</Text>
                </Button>
                <Button full rounded primary
                        style={{ marginTop: 10 }}
                        onPress={() => this.props.navigation.navigate("Profile")}>
                    <Text>Goto Profiles</Text>
                </Button>
            </Content>
        </Container>
    )
}
const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

export default HeaderMain