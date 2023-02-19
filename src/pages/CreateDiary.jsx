import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { TiPencil } from "react-icons/ti";
import useDispatchHook from "../hooks/useDispatchHook";
import Diary from "../components/main/Diary/Diary";
import { mainApi } from "../apis/axios";
import { flex } from "../UI/common";
import { Header } from "../components/common/header/Header";
import ColorPickerFooter from "../components/Create&UpdateDiary/ColorPickerFooter";
import CreatePageLogo from "../components/Create&UpdateDiary/CreatePageLogo";

const CreateDiary = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const { couple } = useSelector((state) => state.diarySlice);
  const { openAlertModal } = useDispatchHook();
  const diaryTitleInputRef = useRef();

  const { mutate } = useMutation((addData) => mainApi.create(addData), {
    onError: (error) => {
      const status = error?.response.request.status;
      status === 500 && openAlertModal({ bigTxt: "다이어리 생성에 실패하였습니다." });
    },
    onSuccess: () => {
      openAlertModal({ bigTxt: "다이어리 생성 성공!", move: "/" });
    },
  });

  const onAddDiaryHandler = () => {
    const diaryName = diaryTitleInputRef.current.value;
    if (!diaryName) openAlertModal({ bigTxt: "다이어리 이름을 작성해주세요!" });
    else if (!selectedColor) openAlertModal({ bigTxt: "다이어리 색상을 선택해주세요!" });
    else return mutate({ diaryName, selectedColor, couple });
  };

  return (
    <>
      <Header>
        <Header.SpaceBetween>
          <Header.Back link="/">다이어리 생성</Header.Back>
          <Header.OnClickBtn onClick={onAddDiaryHandler}>완성</Header.OnClickBtn>
        </Header.SpaceBetween>
      </Header>
      <CreateDiaryBox>
        <CreatePageLogo />
        <div className="pencilIcon-box">
          <TiPencil />
        </div>
        <input type="text" ref={diaryTitleInputRef} />
        <Diary bgColor={selectedColor} />
      </CreateDiaryBox>
      <ColorPickerFooter setSelectedColor={setSelectedColor} />
    </>
  );
};

export default CreateDiary;

export const CreateDiaryBox = styled.section`
  width: 100%;
  height: calc(100vh - 16.2rem);
  ${flex("", "", "column")}
  input {
    margin-bottom: 2rem;
    width: 20.3rem;
    height: 4.3rem;
    background: var(--grayscale_1);
    border-radius: 6px;
    border: none;
    padding: 0 3rem 0 1rem;
  }
  .pencilIcon-box {
    position: absolute;
    top: calc(50% - 18.75rem);
    left: calc(50% + 7.5rem);
  }
`;