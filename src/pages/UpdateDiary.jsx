import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { mainApi } from "../apis/axios";
import Diary from "../components/main/Diary/Diary";
import { TiPencil } from "react-icons/ti";
import useDispatchHook from "../hooks/useDispatchHook";
import Loading from "../components/common/Loading";
import { Header } from "../components/common/header/Header";
import { CreateDiaryBox } from "./CreateDiary";
import ColorPickerFooter from "../components/Create&UpdateDiary/ColorPickerFooter";
import CreatePageLogo from "../components/Create&UpdateDiary/CreatePageLogo";

const UpdateDiary = () => {
  const { couple } = useSelector((state) => state.diarySlice);
  const { openAlertModal } = useDispatchHook();
  const queryClient = useQueryClient();
  const diaryTitleInputRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  const updateDiaryData = queryClient?.getQueryData(["main"])?.diaries.filter((data) => data.diaryId === +id);
  const [selectedColor, setSelectedColor] = useState(updateDiaryData?.[0].outsideColor);

  const { mutate } = useMutation((updateData) => mainApi.update(updateData), {
    onError: (error) => {
      const status = error?.response.request.status;
      status === 500 && openAlertModal({ bigTxt: "다이어리 생성에 실패하였습니다." });
      status === 404 && openAlertModal({ bigTxt: "다이어리가 존재하지 않습니다." });
    },
    onSuccess: () => {
      openAlertModal({ bigTxt: "다이어리 수정 성공!", move: "/" });
    },
  });

  const onUpdateDiaryHandler = () => {
    const diaryName = diaryTitleInputRef.current.value;
    if (!diaryName) openAlertModal({ bigTxt: "다이어리 이름을 작성해주세요!" });
    else if (!selectedColor) openAlertModal({ bigTxt: "다이어리 색상을 선택해주세요!" });
    else return mutate({ diaryName, selectedColor, couple, id });
  };

  useEffect(() => {
    if (updateDiaryData === undefined)
      setTimeout(() => {
        navigate("/");
      }, 3000);
  }, [updateDiaryData, navigate]);

  return (
    <>
      {updateDiaryData === undefined ? (
        <Loading>알 수 없는 에러! 3초 뒤 메인화면으로 이동합니다...</Loading>
      ) : (
        <>
          <Header>
            <Header.SpaceBetween>
              <Header.Back link="/">다이어리 수정</Header.Back>
              <Header.OnClickBtn onClick={onUpdateDiaryHandler}>완성</Header.OnClickBtn>
            </Header.SpaceBetween>
          </Header>
          <UpdateDiaryBox>
            <CreatePageLogo />
            <div className="pencilIcon-box">
              <TiPencil />
            </div>
            <input type="text" defaultValue={updateDiaryData[0].diaryName} ref={diaryTitleInputRef} />
            <Diary bgColor={selectedColor} />
            <ColorPickerFooter setSelectedColor={setSelectedColor} />
          </UpdateDiaryBox>
        </>
      )}
    </>
  );
};

export default UpdateDiary;

const UpdateDiaryBox = styled(CreateDiaryBox)``;
