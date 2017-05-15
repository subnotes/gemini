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

    //resolve conflicts with incorrect rowInfo causing state to hold values from wrong node
    componentWillReceiveProps(nextProps) {
      if(this.props !== nextProps) {
        this.setState({
          subtopic: nextProps.rowInfo.node.title,
          note: nextProps.rowInfo.node.subtitle,
          tags: nextProps.rowInfo.node.tags,
        });
      }
    }

    handleOpenModal () {
      this.setState({ showModal: true });
    }

    handleCloseModal () {
      this.setState({ showModal: false });
    }

    handleChange({ target }) {
      this.setState({
        [target.name]: target.value
      });
      //console.log(this.state);
    }

    handleTagChange({ target }) {
      var tagNum = parseInt(target.name.substr(-1), 10); //get last character of tag name, equal to the index of the tags array (WILL BE ISSUES IF WE GET INTO DOUBLE DIGIT TAGS ON A NODE)
      var tagsCopy = this.props.rowInfo.node.tags.slice();
      tagsCopy[tagNum] = target.value;
      this.setState({
        tags: tagsCopy
      });
    }

    handleSave({ target }) {
      var newTreeData = this.props.replaceSubnote(this.props.rowInfo, this.state); //replace subnote and update treeData
      this.props.updateTreeDataState(newTreeData); //update state of the SortableTree, causing it to re-render
      this.handleCloseModal(); //close the modal window
    }

    render () {
      var tagArray = [];
      var numTags = 5; //number of tag inputs to display
      for (var i = 0; i < this.props.rowInfo.node.tags.length; i++) { //prepopulate tags
        var tagLabel = "tag" + i;
        tagArray.push(<input type="text" name={tagLabel} key={i} defaultValue={this.props.rowInfo.node.tags[i]} onChange={this.handleTagChange}/>);
      }
      for (i; i < numTags; i++) { //empty tag inputs
        tagLabel = "tag" + i;
        tagArray.push(<input type="text" name={tagLabel} key={i} onChange={this.handleTagChange}/>);
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
              <input type="text" name="subtopic" defaultValue={this.props.rowInfo.node.title} onChange={this.handleChange}/>
              <br />
              Note:
              <textarea rows="10" cols="75" name="note" defaultValue={this.props.rowInfo.node.subtitle} onChange={this.handleChange}/>
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
