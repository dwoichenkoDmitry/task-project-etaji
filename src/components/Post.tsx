import React from 'react';
import {CheckBox, Text, View} from "react-native-web";
import styled from "styled-components/native";

const PostItem = styled.View`
    border-bottom-width: 1px;
    border-bottom-color: #000;
    border-bottom-style: solid;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 20px;
`

const DateContainer = styled.View`
    flex-direction: row;
`

const BasketImage = styled.Image`
  width: 30px;
  height: 30px;
`
interface IPostParametr {
    id: number,
    header: string,
    flag: boolean,
    startDate: string,
    finishDate: string,
    description: string
}

interface IPostItem {
    item: IPostParametr
}

export const Post = ({item}:IPostItem) => {
    console.log(item)
    return (
        <PostItem>
            <View>
                <CheckBox/>
            </View>
            <View>
                <View>
                    <Text>{item.header}</Text>
                </View>
                <DateContainer>
                    <Text>{item.startDate}</Text>
                    <Text>{item.finishDate}</Text>
                </DateContainer>
            </View>
            <BasketImage source={require('../img/pen.png')}/>
            <BasketImage source={require('../img/basket.png')}/>
        </PostItem>
    );
};

