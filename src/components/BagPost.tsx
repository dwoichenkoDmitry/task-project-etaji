import React from 'react';
import {CheckBox, View} from "react-native-web";
import styled from "styled-components/native";
import {Link} from "react-router-dom";
import {PostType} from "../interfaces/PostsInterface";


export const BagPost = ({item}: IPostItem) => {
    return (
        <PostItem>
            <View>
                <CheckBox
                    value={item.status}
                />
            </View>
            <Link to={'../fullTask/bag/' + item.id}>
                <View>
                    <View>
                        <UndecoratedText>{item.header}</UndecoratedText>
                    </View>
                    <DateContainer>
                        <UndecoratedText>{item.startDate}</UndecoratedText>
                        <UndecoratedText>{item.finishDate}</UndecoratedText>
                    </DateContainer>
                </View>
            </Link>
        </PostItem>
    );
};


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

const UndecoratedText = styled.Text`
  text-decoration: none;
  color: #000;
`


interface IPostItem {
    item: PostType
}

