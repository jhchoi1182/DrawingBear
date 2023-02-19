import { useSelector } from "react-redux";
import styled from "styled-components";
import coupleDiaryBear from "../../assets/images/coupleDiaryBear.webp";
import soloDiaryBear from "../../assets/images/soloDiaryBear.webp";
import { flex } from "../../UI/common";

const CreatePageLogo = () => {
  const { couple } = useSelector((state) => state.diarySlice);

  return (
    <CreateLogoBear>
      <img src={couple === 0 ? soloDiaryBear : coupleDiaryBear} alt="다이어리 생성 곰돌이 그림" />
      <span>{couple === 0 ? "혼자써요 !" : "같이써요 !"}</span>
    </CreateLogoBear>
  );
};

export default CreatePageLogo;

const CreateLogoBear = styled.div`
  ${flex("", "", "", "column")}
  position: absolute;
  top: 10%;
  left: calc(50% - 15rem);
  cursor: pointer;
  img {
    width: 4.2rem;
    height: 4.2rem;
  }
  span {
    font-size: 1rem;
    margin-top: 0.6rem;
  }
`;
