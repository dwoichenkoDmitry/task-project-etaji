import {Text, FlatList, Alert, View} from "react-native-web";
import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {PostType} from "../interfaces/PostsInterface";
import {ConvertDate} from "../dates/dateWork";
import {BagPost} from "../components/BagPost";
import {Predicate} from "../filterPredicate/predicate";


enum Statuses {
    all = 'Все',
    InProcess = 'В процессе',
    InCompleted = 'Завершено'
}



export const Bag = () => {
    const state: any = useSelector<PostType | undefined>(state => state);
    const dispatch = useDispatch()


    const [scrollCount, setScrollCount] = useState(15)
    const [filterVision, setFilterVision] = useState(false)
    const [filterStatus, setFilterStatus] = useState(Statuses.all)
    const [filterParameters, setFilterParameters] = useState({header: '', startDate: '', finishDate: ''})


    function ChangeScrollCount() {
        if (scrollCount + 15 <= state.bag.length) {
            setScrollCount(scrollCount + 10)
        } else {
            setScrollCount(state.bag.length)
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

    function ClearBag() {
        dispatch({type: 'CLEAR_BAG'})
        dispatch({type: 'ASYNC_SEND'})
    }



    return (
        <AppContainer>
            <Header>
                <Link to={'/'}><BackBtn>Назад</BackBtn></Link>
                <BackBtn onClick={ClearBag}>Очистить</BackBtn>
                <HeaderBtn onClick={() => {
                    setFilterVision(!filterVision)
                }}>
                    <FilterBtnText>{filterVision ? '∧' : '∨'}</FilterBtnText>
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


            {state.bag.filter(Predicate(filterParameters, filterStatus)).length>0?
                <FlatList
                data={state.bag
                .slice(0, scrollCount)
                .filter(Predicate(filterParameters, filterStatus))}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                onEndReachedThreshold={0.1}
                onEndReached={() => {
                ChangeScrollCount()
                }}
                ListFooterComponent={<EndListText>Конец списка</EndListText>}
                removeClippedSubviews={true}
                keyExtractor={(item: PostType) => item.id}
                renderItem={(item: any) => <BagPost item={item.item}/>}
                />
                :
                <EndListText>Нет элементов</EndListText>
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


const BackBtn = styled.Text`
  font-size: 20px;
  color: #fff;
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
