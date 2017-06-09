import styled from 'styled-components';

export const StyledTextArea = styled.textarea`
  border-radius: 5px;
  border: ${props => props.subtopic || props.question ? '1px solid rgb(224, 102, 102)' : ''};
  border: ${props => props.note || props.answer ? '1px solid rgb(111, 168, 220)' : ''};
  width: 100%;
  font-size: 14px;
  font-family: inherit;
`

export const StyledInput = styled.input`
  border-radius: 5px;
  border: ${props => props.subtopic || props.question ? '1px solid rgb(224, 102, 102)' : ''};
  border: ${props => props.note || props.answer ? '1px solid rgb(111, 168, 220)' : ''};
  width: 100%;
  line-height: 20px;
  font-size: 14px;
  font-family: inherit;
`

export const StyledModalDiv = styled.div`
  & > * {
    display: ${props => props.inline ? 'inline-block' : 'block'};
    vertical-align: middle;
  }
`

export const StyledFlashcardDiv = styled.div`
  & > ul {
    list-style-type: None;
    padding: 0;
    margin: 0;

    > li {
      padding-bottom: 10px;
    }
  }
`

export const StyledModalP = styled.p`
  color: ${props => props.subtopic || props.question ? 'rgb(224, 102, 102)' : ''};
  color: ${props => props.note || props.answer ? 'rgb(111, 168, 220)' : ''};
  margin-bottom: 5px;
  font-size: 18px;
  max-height: 300px;
  max-width: 90vw;
  overflow: auto;
  white-space: pre-wrap;
`

export const CancelButton = styled.button`
  background-color: white;
  color: rgb(224, 102, 102);
  border: 1px solid rgb(224, 102, 102);
  text-align: center;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 10px;
  margin-left: 10px;
`

export const SubnoteButton = styled.button`
  background-color: white;
  color: rgb(111, 168, 220);
  border: 1px solid rgb(111, 168, 220);
  text-align: center;
  font-size: 14px;
  border-radius: 5px;
  margin-top: 10px;
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
    width: 'fit-content',
    height: 'fit-content',
    maxHeight: '85vh',
    border: 'solid rgb(111,168,220) 1px',
  }
};
