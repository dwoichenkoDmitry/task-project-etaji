import {Text, FlatList} from "react-native-web";
import {Post} from "../components/Post";
import React, {useEffect, useState} from "react";
import styled from "styled-components/native";

const AppContainer = styled.View`
    height: 100vh;
    flex-direction: column;
    flex: 1;
`;

const Header = styled.View`
    padding: 23px;
    background: blue;
`;


const AddPostBtn = styled.View`
  width: 70px;
  height: 70px;
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  border-color: #000;
  border-style: solid;
  border-width: 1px;
  border-radius: 35px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  position: fixed;
  bottom: 30px;
  background: #FFF;
  right: 20px;
`

interface IPostObject {
    id: number,
    header: string,
    flag: boolean,
    startDate: string,
    finishDate: string,
    description: string
}

interface IPostObjects {
    item: IPostObject
}

export const HomeScreen = () => {
    const [posts, setPosts] = useState([
        {id: 9, header: 'Погладить кошака', flag: false, startDate: '22 сен 2022', finishDate: '25 сен 2022', description: 'Кошак лежит, мурлычет'},
        {id: 8, header: 'Погладить кошака', flag: false, startDate: '22 сен 2022', finishDate: '25 сен 2022', description: 'Кошак лежит, мурлычет'},
        {id: 7, header: 'Погладить кошака', flag: false, startDate: '22 сен 2022', finishDate: '25 сен 2022', description: 'Кошак лежит, мурлычет'},
        {id: 6, header: 'Погладить кошака', flag: false, startDate: '22 сен 2022', finishDate: '25 сен 2022', description: 'Кошак лежит, мурлычет'},
        {id: 5, header: 'Погладить кошака', flag: false, startDate: '22 сен 2022', finishDate: '25 сен 2022', description: 'Кошак лежит, мурлычет'},
        {id: 4, header: 'Погладить кошака', flag: false, startDate: '22 сен 2022', finishDate: '25 сен 2022', description: 'Кошак лежит, мурлычет'},
        {id: 3, header: 'Погладить кошака', flag: false, startDate: '22 сен 2022', finishDate: '25 сен 2022', description: 'Кошак лежит, мурлычет'},
        {id: 2, header: 'Погладить кошака', flag: false, startDate: '22 сен 2022', finishDate: '25 сен 2022', description: 'Кошак лежит, мурлычет'},
        {id: 1, header: 'Погладить кошака', flag: false, startDate: '22 сен 2022', finishDate: '25 сен 2022', description: 'Кошак лежит, мурлычет'},
        {id: 0, header: 'Погладить кошака', flag: false, startDate: '22 сен 2022', finishDate: '25 сен 2022', description: 'Кошак лежит, мурлычет'},
    ])




    return (
        <AppContainer>
            <Header>
                <Text>Test React App</Text>
            </Header>
            <FlatList data={posts} renderItem={({item}: IPostObjects)=><Post item={item} />}/>



            <AddPostBtn>+</AddPostBtn>
        </AppContainer>
    )
}