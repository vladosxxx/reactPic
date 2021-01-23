import React from "react";
import { Header, Left, MainView, Button, Body, Right, Title } from 'native-base';

import Icon from 'react-native-vector-icons/Ionicons';
import Drawer from 'react-native-drawer';
import Menu from './Menu'

function HeaderWall() {
  // closeControlPanel = () => {
  //   _drawer.close()
  // };
  // openControlPanel = () => {
  //   _drawer.open()
  // };
    return(
      <Header>
              <Drawer
                ref={(ref) =>_drawer = ref}
                
                // open={true}
                // onPress={() => {_drawer.open()}}
                  type="overlay"
                  content={<Menu/>}
                  tapToClose={true}
                  openDrawerOffset={0.2} // 20% gap on the right side of drawer
                  panCloseMask={0.2}
                  closedDrawerOffset={-3}
                  // onPress={() => _drawer.open()}
                  styles={drawerStyles}
                  tweenHandler={(ratio) => ({
                  main: { opacity:(2-ratio)/2 }
              })}
      >
      
      <MainView />
    </Drawer>
      <Left>
        <Button transparent>
          {/*<Icon name='menu' />*/}
        </Button>
      </Left>
      <Body>
        <Title>Wallpaper</Title>
      </Body>
      <Right />
    </Header>

    )
}
const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
}

export default HeaderWall