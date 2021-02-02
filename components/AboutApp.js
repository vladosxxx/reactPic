import React from "react";
import { Text, View, Button, Icon, Left, Header } from 'native-base'
import {useNavigation} from '@react-navigation/native'

function AboutApp() {
    const navigation = useNavigation()
    return(
        <View>
            <Header>
            <Left
            style={{
                alignItems: 'center',
                flex: 1
            }}>
                <Button
                    transparent
                    onPress={() => navigation.openDrawer()}
                    style={{alignSelf: 'flex-start'}}
                    >
                    <Icon name="menu" />
                </Button>
            </Left>
            </Header>
            <Text>WallPaper</Text>
            <Text>Contact Dev</Text>
        </View>
    )
}

export default AboutApp