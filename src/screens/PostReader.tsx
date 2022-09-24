import {Button} from "react-native-web";
import styled from "styled-components/native";
import {Link} from "react-router-dom";
import {useState} from "react";
import IPostObject from "../interfaces/PostsInterface";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import 'moment/locale/ru'
import {GetDate} from "../dates/dateWork";


export const PostReader = () => {
    moment.locale('ru')

    const dispatch = useDispatch()


    let date = GetDate()

    const state: any = useSelector<IState | undefined>(state => state);

    function PostTask() {
        let id = 0

        if (state.posts.length > 0) {
            let max = state.posts.reduce((acc: IPostObject, curr: IPostObject) => acc.id > curr.id ? acc : curr);
            id = max.id + 1;
        }

        dispatch({
            type: 'ADD_POST', post: {
                id: id,
                status: false,
                header: postedParameters.header,
                description: postedParameters.description,
                defaultFinishDate: moment(postedParameters.date).format(),
                defaultStartDate: moment(new Date()).format(),
                startDate: moment(new Date()).format('ll'),
                finishDate: moment(postedParameters.date).format('ll')
            }
        })
        dispatch({type: 'ASYNC_SEND'})
    }


    interface IState {
        posts: {
            header: string;
            description: string;
            finishDate: string;
            id: number;
            startDate: string
        }[]
    }

    const [postedParameters, setPostedParameters] = useState({header: '', description: '', date: date})

    return (
        <Container>
            <Header>
                <Link to={'/'}><HomeLink>Home</HomeLink></Link>
            </Header>
            <InputLine>
                <LineText>Заголовок</LineText>
                <TextInputs
                    onChange={(e: any) => {
                        setPostedParameters({...postedParameters, header: e.target.value})
                    }}
                />
            </InputLine>
            <InputLine>
                <LineText>Описание</LineText>
                <TextInputs
                    onChange={(e: any) => {
                        setPostedParameters({...postedParameters, description: e.target.value})
                    }}
                />
            </InputLine>
            <InputLine>
                <LineText>Дата окончания</LineText>
                <input style={{width: '50%', margin: '0 10px'}}
                       onKeyDown={(e) => {
                           e.preventDefault()
                       }}
                       defaultValue={date}
                       onChange={(e) => setPostedParameters({...postedParameters, date: e.target.value})}
                       min={date}
                       type="date"
                />
            </InputLine>
            <ButtonContainer>
                <Button
                    title={"Добавить задачу"}
                    onPress={() => {
                        PostTask()
                    }}
                />
            </ButtonContainer>


        </Container>
    )
}


const Container = styled.View`
  height: 100vh;
`

const Header = styled.View`
  padding: 23px;
  background: blue;
`;

const HomeLink = styled.Text`
  font-size: 20px;
  color: #fff;
`

const InputLine = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 15px;
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

const LineText = styled.Text`
  font-size: 16px;
`

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100vw;
`