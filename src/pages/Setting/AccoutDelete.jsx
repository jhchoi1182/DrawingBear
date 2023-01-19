import { StContainer, StSection, StHeader } from "../../UI/common";
import styled from "styled-components";
import NavigateBtn from "../../components/common/NavigateBtn";
import AccountDeleteBear from "../../assets/images/account_delete_bear.webp";
import Button from "../../components/common/Button";
import { useQuery } from "@tanstack/react-query";
import { mypageApi } from "../../apis/axios";
import { useEffect, useState } from "react";

const AccoutDelete = () => {
  const { data } = useQuery(["myProfileData"], mypageApi.read);

  const [userinfo, setUserInfo] = useState({
    nickName: "",
  });
  useEffect(() => {
    setUserInfo({
      nickName: data?.userInfo.nickname,
    });
  }, []);
  return (
    <StContainer>
      <StHeader flex justify="flex-start">
        <NavigateBtn prev sizeType="header" />
        <h3>회원 탈퇴</h3>
      </StHeader>
      <StMypageSection flex derection="column" justify="flex-start">
        <div className="myProfileInfoWrapper">
          <img src={AccountDeleteBear} alt="탈퇴곰돌이" />
        </div>
        <div className="warning">
          <h2>{userinfo.nickName}님</h2>
          <h2>정말 떠나시겠어요? {": ("}</h2>
          <h4>
            내 프로필 사진, 댓글, 다이어리, 내용 등 모든 활동 정보가 삭제되며,
            삭제된 데이터는 복구할 수 없어요.
          </h4>
        </div>
        <div className="delete-button">
          <Button fullWidth color="button_alart">
            네, 탈퇴할래요.
          </Button>
        </div>
      </StMypageSection>
    </StContainer>
  );
};

export default AccoutDelete;

const StMypageSection = styled(StSection)`
  padding-top: 20%;
  overflow-x: hidden;
  .myProfileInfoWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }
  img {
    width: 13.5rem;
    height: 11.3rem;
  }
  .warning {
    padding-top: 5%;
    width: 80%;
    word-break: keep-all;
  }
  h4 {
    margin-top: 1rem;
  }
  .delete-button {
    position: absolute;
    top: 90%;
    width: 80%;
    button {
      width: 100%;
      height: 5.5rem;
      font-size: 1.4rem;
      font-weight: 700;
    }
  }
`;
