import {Text, FlatList, View} from "react-native-web";
import {Post} from "../components/Post";
import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {DeleteAlerter} from "../components/UIComponents/DeleteAlerter";
import {PostType} from "../interfaces/PostsInterface";
import {ConvertDate} from "../dates/dateWork";
import {Predicate} from "../filterPredicate/predicate";

export enum Statuses {
    all = 'Все',
    InProcess = 'В процессе',
    InCompleted = 'Завершено'
}


export const HomeScreen = () => {
    const state: any = useSelector<PostType | undefined>(state => state);
    const [visionAlert, setVisionAlert] = useState(false)
    const [deletedIndex, setDeletedIndex] = useState(-1)

    const [posts, setPosts] = useState([
        {
            id: 0,
            defaultFinishDate: '43',
            status: false,
            header: 'Погладить кошака',
            startDate: '22 сен 2022',
            finishDate: '25 сен 2022',
            description: 'Кошак лежит, мурлычет'
        },
    ])

    const [scrollCount, setScrollCount] = useState(15)
    const [filterVision, setFilterVision] = useState(false)
    const [filterStatus, setFilterStatus] = useState(Statuses.all)
    const [filterParameters, setFilterParameters] = useState({header: '', startDate: '', finishDate: ''})


    useEffect(() => {
        setPosts([...state.posts])

    }, [state.posts]);

    function ChangeScrollCount() {
        if (scrollCount + 15 <= posts.length) {
            setScrollCount(scrollCount + 10)
        } else {
            setScrollCount(state.posts.length)
        }
    }

    function ChangeEnumStatus() {
        if (filterStatus === Statuses.all) {
            setFilterStatus(Statuses.InProcess)
        }
        if (filterStatus === Statuses.InProcess) {
            setFilterStatus(Statuses.InCompleted)
        }
        if (filterStatus === Statuses.InCompleted) {
            setFilterStatus(Statuses.all)
        }
    }




    return (
        <AppContainer>
            <Header>
                <HeaderBtn onClick={() => {
                    setFilterVision(!filterVision)
                }}>
                    <FilterBtnText>{filterVision ? '∧' : '∨'}</FilterBtnText>
                </HeaderBtn>
                <HeaderBtn>
                    <Link to={"bag"}>
                        <FilterBtnText>
                            <BasketImage source={require('../img/basket.png')}/>
                        </FilterBtnText>
                    </Link>
                </HeaderBtn>
            </Header>
            <View>
                {filterVision ?
                    <FilterView>
                        <InputLine>
                            <LineText>Заголовок</LineText>
                            <TextInputs
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFilterParameters({...filterParameters, header: e.target.value})
                                }}
                            />
                        </InputLine>
                        <InputLine>
                            <LineText>Статус</LineText>
                            <StatusFilter onClick={ChangeEnumStatus}>
                                <Text>{filterStatus}</Text>
                            </StatusFilter>
                        </InputLine>
                        <View>
                            <LineText>Промежуток</LineText>
                            <InputLine>
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFilterParameters({...filterParameters, startDate: e.target.value})
                                }} type="date"/>
                                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFilterParameters({...filterParameters, finishDate: e.target.value})
                                }} type="date"/>
                            </InputLine>
                        </View>
                    </FilterView>
                    :
                    null
                }
            </View>


            {state.posts.filter(Predicate(filterParameters, filterStatus)).length>0?
                <FlatList
                    data={state.posts
                        .slice(0, scrollCount)
                        .filter(Predicate(filterParameters, filterStatus))}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        ChangeScrollCount()
                    }}
                    removeClippedSubviews={true}
                    keyExtractor={(item: PostType) => item.id}
                    ListFooterComponent={<EndListText>Конец списка</EndListText>}
                    renderItem={(item: any) => <Post showAlert={setVisionAlert} setIndex={setDeletedIndex}
                                                     item={item.item}/>}
                />
                :
                <EndListText>Нет элементов</EndListText>
            }



            <Link to={'addPost'}><AddPostBtn><AddPostText>+</AddPostText></AddPostBtn></Link>
            {visionAlert ?
                <DeleteAlerter deletedIndex={deletedIndex} changeVision={setVisionAlert}/>
                :
                null
            }

        </AppContainer>
    )
}


const AppContainer = styled.View`
  height: 100vh;
  flex-direction: column;
  flex: 1;
`;

const Header = styled.View`
  padding: 23px;
  background: blue;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;


const AddPostBtn = styled.View`
  width: 70px;
  height: 70px;
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

const AddPostText = styled.Text`
  font-size: 35px;
  font-weight: bold;
  text-align: center;
`


const HeaderBtn = styled.View`
  width: 35px;
  height: 35px;
  background: #fff;
  color: #000;
  text-align: center;
`

const FilterView = styled.View`
  background: blue;
`

const InputLine = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;

`

const TextInputs = styled.TextInput`
  width: 80%;
  margin-left: 10px;
  font-size: 22px;
  height: 40px;
  border-bottom-style: solid;
  border-bottom-color: #000;
  border-bottom-width: 1px;
  background: #fff;
`

const BasketImage = styled.Image`
  width: 30px;
  height: 30px;
`


const LineText = styled.Text`
  font-size: 22px;
  color: #fff;
`

const FilterBtnText = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
`

const StatusFilter = styled.View`
  width: 70%;
  margin-left: 10px;
  font-size: 22px;
  height: 40px;
  border-bottom-style: solid;
  border-bottom-color: #000;
  border-bottom-width: 1px;
  background: #fff;
  justify-content: center;
  align-items: center;
`

const EndListText = styled.Text`
  text-align: center;
  font-size: 25px;
  padding: 10px 0;
`
