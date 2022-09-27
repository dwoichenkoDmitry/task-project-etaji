import {Button} from "react-native-web";
import styled from "styled-components/native";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {PostType} from "../interfaces/PostsInterface";
import IState from "../interfaces/PostsInterface";
import {Link} from "react-router-dom";
import moment from "moment";


export const UpdatePost = () => {
    moment.locale('ru')
    const {id} = useParams()
    let num = Number(id)
    const state: any = useSelector<IState | undefined>(state => state);
    const post = state.posts.find((item: PostType) => item.id === num)
    const dispatch = useDispatch()

    let curr = new Date();
    curr.setDate(curr.getDate());
    let date = curr.toISOString().substring(0, 10);

    curr = new Date(moment(post.defaultFinishDate).format());
    curr.setDate(curr.getDate());
    let dateFinish = curr.toISOString().substring(0, 10);

    const [updatedPost, setUpdatedPost] = useState({
        id: num,
        status: post.status,
        header: post.header,
        description: post.description,
        startDate: post.startDate,
        finishDate: '',
        defaultStartDate: post.defaultStartDate,
        defaultFinishDate: post.defaultFinishDate
    })

    function UpdatePost() {
        let date = post.finishDate;
        let defaultDate = ''
        if (updatedPost.finishDate) {
            defaultDate = moment(updatedPost.defaultFinishDate).format()
            date = moment(updatedPost.finishDate).format('ll')
        }

        dispatch({
            type: 'UPDATE_POST', post: {
                id: num,
                header: updatedPost.header,
                description: updatedPost.description,
                startDate: updatedPost.startDate,
                finishDate: date,
                defaultStartDate: updatedPost.defaultStartDate,
                defaultFinishDate: defaultDate ? defaultDate : updatedPost.defaultFinishDate,
                state: updatedPost.status
            }
        })
        dispatch({type: 'ASYNC_SEND'})
    }

    return (
        <Container>
            <Header>
                <Link to={'/'}><BackBtn>Назад</BackBtn></Link>
            </Header>
            {post ?
                <FormContainer>
                    <HeadersText>Заголовок</HeadersText>
                    <TextInputs onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUpdatedPost({...updatedPost, header: e.target.value})
                    }} defaultValue={post.header}/>
                    <HeadersText>Описание</HeadersText>
                    <TextInputs onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUpdatedPost({...updatedPost, description: e.target.value})
                    }} defaultValue={post.description}/>
                    <HeadersText>Дата окончания</HeadersText>
                    <input style={{width: '50%', margin: '20px 80px'}}
                           onKeyDown={(e) => {
                               e.preventDefault()
                           }}
                           onChange={(e) => setUpdatedPost({...updatedPost, finishDate: e.target.value})}
                           defaultValue={dateFinish}
                           min={date}
                           type="date"
                    />
                </FormContainer>
                :
                <HeadersText>Не найдено</HeadersText>
            }
            {post ?
                <ButtonContainer>
                    <Button
                        title={"Изменить задачу"}
                        onPress={UpdatePost}
                    />
                </ButtonContainer>
                :
                ''
            }

        </Container>
    )
}


const Container = styled.View`
  height: 100vh;
`

const TextInputs = styled.TextInput`
  flex: 0.9;
  margin-left: 10px;
  font-size: 22px;
  height: 40px;
  border-bottom-style: solid;
  border-bottom-color: #000;
  border-bottom-width: 1px;
`

const Header = styled.View`
  padding: 23px;
  background: blue;
`;

const BackBtn = styled.Text`
  font-size: 20px;
  color: #fff;
`

const HeadersText = styled.Text`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100vw;
`

const FormContainer = styled.View`
  padding-bottom: 200px;
`
