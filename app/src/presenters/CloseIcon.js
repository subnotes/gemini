/**
 * Presenter Component for a Close Icon
 * adapted from: https://codepen.io/ndeniche/pen/ljbDL
 */

// Import Node Packages
import styled from 'styled-components';

const CloseIcon = styled.span`
  position: relative;
  display: inline-block;
  width: 14px;
  height: 14px;
  overflow: hidden;
  margin-left: 5px;
  &:hover {
    &::before, &::after {
      background: #1ebcc5;
    }
  }
  &::before, &::after {
    content: '';
    position: absolute;
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
    margin-top: -1px;
    background: #000;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

export default CloseIcon;
