import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Calendar from "../components/calendar/Calendar";
import DiaryCard from "../components/FullList/DiaryCard";
import DiarySetting from "../components/FullList/DiarySetting";
import Back from "../components/header/Back";
import HeaderText from "../components/header/HeaderText";
import { StHeader, StSection } from "../UI/common";
import CommonContainer from "../UI/CommonContainer";

const DiaryList = () => {
  const navigate = useNavigate();
  const [changeHeader, setChangeHeader] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);

  const defaultHeader = useCallback(() => {
    return (
      <>
        <div>
          <Back />
          <HeaderText>다이어리 제목</HeaderText>
        </div>
        <div>
          <button onClick={() => setChangeHeader(true)}>검색</button>
          <button onClick={() => setIsSettingModal(true)}>설정</button>
        </div>
      </>
    );
  }, []);

  const SearchHeader = useCallback(() => {
    return (
      <>
        <div>
          <button>검색</button>
          <StInput placeholder="일기 검색..." />
        </div>
        <div>
          <button onClick={() => setIsModal(true)}>달력</button>
          <button onClick={() => setChangeHeader(false)}>취소</button>
        </div>
      </>
    );
  }, []);

  return (
    <>
      {isModal && <Calendar onClose={setIsModal} />}
      {isSettingModal && <DiarySetting onClose={setIsSettingModal} />}
      <CommonContainer>
        <StHeader flexBetween>
          {!changeHeader && defaultHeader()}
          {changeHeader && SearchHeader()}
        </StHeader>
        <StSection>
          <Filter>최신순</Filter>
          <DiaryCard />
          <DiaryCard />
          <DiaryCard />
          <DiaryCard />
          <DiaryCard />
        </StSection>
        <Add
          onClick={() => {
            navigate("/write");
          }}
        >
          글쓰기
        </Add>
      </CommonContainer>
    </>
  );
};

export default DiaryList;

const Filter = styled.div`
  float: right;
  margin-top: 3rem;
  margin-right: 4rem;
  font-size: 1.3rem;
`;

const Add = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: calc(50% - 15.5rem);
  top: 90%;
  width: 6.9rem;
  height: 6.9rem;
  background-color: #d9d9d9;
  border: 0;
  border-radius: 100%;
  box-shadow: 0 1px 2px;
`;

const StInput = styled.input`
  width: 20rem;
  font-size: 1.7rem;
  border: 0;
  outline: none;
  background-color: inherit;
  padding: 1rem 0.3rem 1rem 0;
  :focus {
    border: 0;
    border-bottom: 1px solid black;
  }
`;
