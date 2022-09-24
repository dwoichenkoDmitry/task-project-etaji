import styled from "styled-components/native";
import {useRef, useEffect} from "react";
import {useDispatch} from "react-redux";


interface Props {
    changeVision: Function
    deletedIndex: number
}

export const DeleteAlerter = ({changeVision, deletedIndex}: Props) => {

    const dispatch = useDispatch()

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: Event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    changeVision(false)
                }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    function DeletePost() {
        dispatch({type: 'DELETE_POST', id: deletedIndex})
        dispatch({type: 'ASYNC_SEND'})
        changeVision(false)
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <DarkFon>
            <AlertContainer ref={wrapperRef}>
                <DecorText>Вы действительно хотите удалить задачу?</DecorText>
                <ButtonsContainer>
                    <CustomButton onClick={() => {
                        changeVision(false)
                    }}><DecorText>Отмена</DecorText></CustomButton>
                    <CustomButton onClick={DeletePost}><DecorText>Ок</DecorText></CustomButton>
                </ButtonsContainer>
            </AlertContainer>
        </DarkFon>
    )
}


const DarkFon = styled.View`
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  position: fixed;
`

const AlertContainer = styled.View`
  position: fixed;
  width: 70%;
  top: 200px;
  margin-left: 15%;
  height: 200px;
  background: #fff;
  border-width: 1px;
  border-color: #000;
  border-style: solid;
  text-align: center;
`

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 80px;
`

const CustomButton = styled.View`
  border-style: solid;
  border-color: #000;
  border-width: 1px;
  height: 60px;
  flex: 0.3;
  align-items: center;
  justify-content: center;
  border-radius: 5px;

`

const DecorText = styled.Text`
  font-size: 18px;
`