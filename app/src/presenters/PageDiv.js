/**
 * Presenter Component for Pages throughout the app
 */

// Import Node Packages
import styled from 'styled-components';

const PageDiv = styled.div`
  width: ${props => props.width ? props.width : '80%'};
  margin: auto;
  margin-top: 1em;
`;

export default PageDiv;
