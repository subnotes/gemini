import React, { Component } from 'react';
import ReactModal from 'react-modal';

//EditBox adapted from example at https://reactcommunity.org/react-modal/examples/minimal.html
export default class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
          showModal: false,
          subtopic: this.props.rowInfo.node.title,
          note: this.props.rowInfo.node.subtitle,
          tags: this.props.rowInfo.node.tags
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
      } //end constructor

    handleOpenModal () {
      this.setState({ showModal: true });
      //console.log(this);
    }

    handleCloseModal () {
      this.setState({ showModal: false });
    }

    handleChange({ target }) {
      this.setState({
        [target.name]: target.value
      });
    }

    handleTagChange({ target }) {
      var tagNum = parseInt(target.name.substr(-1)); //get last character of tag name, equal to the index of the tags array (WILL BE ISSUES IF WE GET INTO DOUBLE DIGIT TAGS ON A NODE)
      var tagsCopy = this.state.tags.slice();
      tagsCopy[tagNum] = target.value;
      this.setState({
        tags: tagsCopy
      });
    }

    handleSave({ target }) {
      console.log(this);
      var newTreeData = this.props.replaceSubnote(this.props.rowInfo, this.state); //replace subnote and update treeData
      this.props.updateTreeDataState(newTreeData); //update state of the SortableTree, causing it to re-render
      this.handleCloseModal(); //close the modal window
    }

    render () {
      var tagArray = [];
      for (var i = 0; i < this.state.tags.length; i++) {
        var tagLabel = "tag" + i;
        tagArray.push(<input type="text" name={tagLabel} key={i} defaultValue={this.state.tags[i]} onChange={this.handleTagChange}/>);
      }

      return (
        <div>
          <button onClick={this.handleOpenModal}>Edit</button>
          <ReactModal
             isOpen={this.state.showModal}
             contentLabel="Edit subnote"
          >
            <form>
              Subtopic:
              <input type="text" name="subtopic" defaultValue={this.state.subtopic} onChange={this.handleChange}/>
              <br />
              Note:
              <input type="text" name="note" defaultValue={this.state.note} onChange={this.handleChange}/>
              <br />
              Tags:
              {tagArray}
            </form>
            <button onClick={this.handleSave}>Save Edits</button>
            <button onClick={this.handleCloseModal}>Cancel Edit</button>
          </ReactModal>
        </div>
      );
    }
}
