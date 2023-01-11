import { useState } from "react";
import styled, { css } from "styled-components";
import { useRef } from "react";
import { StContainer, StHeader, StSection } from "../UI/common";
import { useNavigate } from "react-router-dom";

import Canvas from "../components/FabricCanvas/Canvas";

const Write = () => {
  const [isDrawing, setIsDrawing] = useState(true);
  const navigate = useNavigate();

  return (
    <StContainer>
      <StHeader flexCenter>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          이전
        </button>
        <h1>LOGO</h1>
      </StHeader>
      <button onClick={() => setIsDrawing(!isDrawing)}>
        {isDrawing ? "그림" : "제목"}
      </button>
      <StCanvasSection drawing={isDrawing}>
        <Canvas />
        <textarea></textarea>
      </StCanvasSection>
      <StTitleSection drawing={isDrawing}>
        <div>
          <span>제목 :</span>
          <input type="text" name="title" placeholder="제목을 입력해주세요" />
        </div>
        <div>
          <span>날짜 :</span>
          <input type="date" name="date" placeholder="2023.01.01" />
        </div>
        <div>
          <span>태그 :</span>
          <input type="text" name="tag" placeholder="태그를 입력해주세요" />
        </div>
        <button>일기 작성하기</button>
      </StTitleSection>
    </StContainer>
  );
};

export default Write;

const StCanvasSection = styled(StSection)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  ${(props) =>
    !props.drawing &&
    css`
      display: none;
    `}

  textarea {
    width: 100%;
    height: 100px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    padding: 10px;
    margin-top: 10px;
    resize: none;
  }
`;

const StTitleSection = styled(StSection)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px;
  ${(props) =>
    props.drawing &&
    css`
      display: none;
    `}
  div {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  input {
    width: 80%;
    height: 30px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    padding: 10px;
  }
  button {
    width: 100%;
    height: 30px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    cursor: pointer;
  }
`;
