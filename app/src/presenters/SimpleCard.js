/**
 * Presenter Component for a Simple Card
 * adapted from https://www.w3schools.com/howto/howto_css_cards.asp
 */

// Import Node Packages
import styled from 'styled-components';

// Styled Components
const SimpleCard = styled.div`
  margin: 8px 0 16px;
  background-color: #f1f1f1;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

export default SimpleCard;
