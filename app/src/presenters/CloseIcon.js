/**
 * Presenter Component for a Close Icon
 * adapted from: https://codepen.io/ndeniche/pen/ljbDL
 */

// Import Node Packages
import styled from 'styled-components';

const CloseIconCSS = styled.span`
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

const CloseIconMaterial = styled.span`
  background: url(https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_remove_circle_outline_black_24px.svg) no-repeat center;
  background-size: contain;
  position: relative;
  display: table-cell;
  vertical-align: middle;
  width: 14px;
  height: 14px;
  padding-left: 5px;
  &:hover {
    background: url(https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_remove_circle_black_24px.svg) no-repeat center;
  background-size: contain;
  }
`;

export {CloseIconMaterial as default};
