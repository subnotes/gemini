import styled from 'styled-components';

export const StyledModalDiv = styled.div`
  & > * {
    display: ${props => props.inline ? 'inline-block' : 'block'};
    vertical-align: middle;
  }
`

export const StyledModalP = styled.p`
  color: ${props => props.subtopic || props.question ? 'rgb(224, 102, 102)' : ''};
  color: ${props => props.note || props.answer ? 'rgb(111, 168, 220)' : ''};
  margin-bottom: 5px;
`

export const StyledModalLaunchButton = styled.button`
  background: ${props => props.edit ? 'url(https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_create_black_24px.svg) no-repeat center' : ''};
  background: ${props => props.add ? 'url(https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_add_black_24px.svg) no-repeat center' : ''};
  background: ${props => props.delete ? 'url(https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_delete_black_24px.svg) no-repeat center' : ''};
  background: ${props => props.flashcards ? 'url(https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_filter_none_black_24px.svg) no-repeat center' : ''};
  background: ${props => props.addTopLevel ? 'url(https://storage.googleapis.com/material-icons/external-assets/v4/icons/svg/ic_add_box_black_48px.svg) no-repeat center' : ''};
  margin-right: ${props => props.addTopLevel ? '10px' : ''};
  opacity: 0.65;
  border-radius: 5px;
  border: solid #666666 1px;
  height: 30px;
  width: 30px;
`

export const modalStyle = {
  content: {
    position: 'absolute',
    height: 'fit-content',
    width: 'fit-content',
    border: 'solid rgb(111,168,220) 1px',
  }
};
