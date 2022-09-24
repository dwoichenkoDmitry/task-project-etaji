import {View} from "react-native-web";
import {useParams} from "react-router";
import React from "react";
import styled from "styled-components/native";
import {useSelector} from "react-redux";
import {PostType} from "../interfaces/PostsInterface";
import IState from "../interfaces/PostsInterface";
import {Link} from "react-router-dom";



export const FullTaskScreen = () => {
    const {id, typeScreen} = useParams()


    let num = Number(id)
    const state: any = useSelector<IState | undefined>(state => state);

    const post = typeScreen === 'post' ? state.posts.find((item: PostType) => item.id === num) :
        state.bag.find((item: PostType) => item.id === num)


    return (
        <View>
            <Header>
                <Link to={typeScreen === 'post' ? '/' : '../bag'}><BackBtn>Назад</BackBtn></Link>
            </Header>
            {post ?
                <View>
                    <HeadersText>Статус</HeadersText>
                    <ParametersText>{post.status ? "Выполнено" : "В процессе"}</ParametersText>
                    <HeadersText>Заголовок</HeadersText>
                    <ParametersText>{post.header}</ParametersText>
                    <HeadersText>Описание</HeadersText>
                    <ParametersText>{post.description}</ParametersText>
                    <HeadersText>Дата начала</HeadersText>
                    <ParametersText>{post.startDate}</ParametersText>
                    <HeadersText>Дата окончания</HeadersText>
                    <ParametersText>{post.finishDate}</ParametersText>
                </View>
                :
                <HeadersText>Не найдено</HeadersText>
            }

        </View>

    )
}

const Header = styled.View`
  padding: 23px;
  background: blue;
`;

const HeadersText = styled.Text`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`

const ParametersText = styled.Text`
  text-align: center;
  font-size: 23px;
`

const BackBtn = styled.Text`
  font-size: 20px;
  color: #fff;
`