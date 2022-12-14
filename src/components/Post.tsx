import React from 'react';
import {CheckBox, View} from "react-native-web";
import styled from "styled-components/native";
import {Link} from "react-router-dom";
import {PostType} from "../interfaces/PostsInterface";
import {useDispatch} from "react-redux";



interface IPostItem {
    item: PostType
    setIndex: Function
    showAlert: Function
}


export const Post = ({item, setIndex, showAlert}: IPostItem) => {
    const dispatch = useDispatch()

    function ChangeChecked() {
        dispatch({type: 'CHANGE_CHECKED_POST', id: item.id})
        dispatch({type: 'ASYNC_SEND'})
    }


    return (
        <PostItem>
            <View>
                <CheckBox
                    value={item.status}
                    onValueChange={ChangeChecked}
                />
            </View>
            <Link style={{textDecoration: 'none'}} to={'fullTask/post/' + item.id}>
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
            <Link to={'updatePost/' + item.id}><BasketImage source={require('../img/pen.png')}/></Link>
            <BasketImage onClick={(e: Event) => {
                setIndex(item.id)
                showAlert(true)
            }} source={require('../img/basket.png')}/>
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

const BasketImage = styled.Image`
  width: 30px;
  height: 30px;
`