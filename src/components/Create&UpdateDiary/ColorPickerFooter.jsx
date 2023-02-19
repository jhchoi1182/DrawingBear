import styled from "styled-components";
import { flex } from "../../UI/common";

const color = ["#FF8181", "#FFCA7A", "#FFE99A", "#A4F5A3", "#9CDBF7", "#BB9EFA"];

const ColorPickerFooter = ({ setSelectedColor }) => {
  return (
    <Footer>
      {color.map((color, i) => {
        return (
          <ColorPicker key={`diaryColorPicker_${i}`} color={color} onClick={() => setSelectedColor(color)}></ColorPicker>
        );
      })}
    </Footer>
  );
};

export default ColorPickerFooter;

const Footer = styled.footer`
  position: absolute;
  bottom: 2%;
  left: 0;
  width: 100%;
  height: 7.2rem;
  background-color: white;
  ${flex("space-evenly", "")}
`;

const ColorPicker = styled.button`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => props.color};
  transition: all 0.3s;
  :hover {
    transform: scale(1.1);
  }
  :focus {
    transform: scale(1.1);
  }
`;
