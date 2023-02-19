import styled from "styled-components";
import kakao from "../../assets/images/kakao.webp";
import { flex } from "../../UI/common";

const SocialLogin = () => {

  return (
    <SocialLoginBox>
        <img src={kakao} alt="카카오 로그인" />
    </SocialLoginBox>
  );
};

export default SocialLogin;

const SocialLoginBox = styled.div`
  ${flex}
  width: 100%;
  gap: 2rem;
  padding-top: 15%;
  img {
    cursor: pointer;
  }
`;
