import React, { Component } from 'react';
import SortableTree, { getTreeFromFlatData, getFlatDataFromTree } from 'react-sortable-tree';
import EditModal from './EditModal.js';
import AddModal from './AddModal.js';
import DeleteModal from './DeleteModal.js';
import FlashcardsModal from './FlashcardsModal.js';
import UUID from 'uuid';

export default class Tree extends Component {
    constructor(props) {
        super(props);
        if (typeof(this.props.notebookPlusMeta) !== 'undefined' && typeof(this.props.notebookPlusMeta.notebook) !== 'undefined') {
          //bulid flat notebookTree and then convert to treeData for react-sortable-tree
          var notebookTree = [];
          if (typeof(this.props.match.params.subnoteid) !== 'undefined') { //if loading from url denoting a subnote
            this.buildTree(notebookTree, this.props.notebookPlusMeta.notebook, this.props.notebookPlusMeta.expanded, this.props.match.params.subnoteid);
          } else {
            this.buildTree(notebookTree, this.props.notebookPlusMeta.notebook, this.props.notebookPlusMeta.expanded);
          }
          this.state = {
              treeData: getTreeFromFlatData({flatData: notebookTree})
          };
        }

        this.getParentKey = this.getParentKey.bind(this);
        this.buildTree = this.buildTree.bind(this);
        this.addChildrenToFlat = this.addChildrenToFlat.bind(this);
        this.saveTreeData = this.saveTreeData.bind(this);
        this.replaceSubnote = this.replaceSubnote.bind(this);
        this.addSubnote = this.addSubnote.bind(this);
        this.deleteSubnote = this.deleteSubnote.bind(this);
        this.deleteSubnoteChildren = this.deleteSubnoteChildren.bind(this);
        this.setExpandedNodes = this.setExpandedNodes.bind(this);
        this.removeExpandedChildren = this.removeExpandedChildren.bind(this);
        //this.updateTreeDataState = this.updateTreeDataState.bind(this);
    } //end of constructor

    //if we get new props, update the tree
    componentWillReceiveProps(nextProps) {
      if(nextProps !== this.props) {
        var notebookTree = [];
        if (typeof(nextProps.match.params.subnoteid) !== 'undefined' && this.state === null) { //if loading from url denoting a subnote and loading for the first time (don't want to keep expansion constant for parents of subnoteFromPath after the first render)
          this.buildTree(notebookTree, nextProps.notebookPlusMeta.notebook, nextProps.notebookPlusMeta.expanded, nextProps.match.params.subnoteid);
        } else {
          this.buildTree(notebookTree, nextProps.notebookPlusMeta.notebook, nextProps.notebookPlusMeta.expanded);
        }
        this.setState({
          treeData: getTreeFromFlatData({flatData: notebookTree})
        });
      }
    }

    //returns the id of the parent node of notebook.subnotes[nodeIndex]
    getParentKey(notebook, nodeIndex, nodeID) {
      if (!nodeID) {
        var currentID = Object.keys(notebook.subnotes)[nodeIndex];
      } else {
        var currentID = nodeID;
      }

      if (currentID === notebook.rootSubnote) { //return 0 for parentID of root node
        return 0;
      }

      for (var key in notebook.subnotes) { //go through each subnote
        if (!notebook.subnotes.hasOwnProperty(key)) continue;
        var node = notebook.subnotes[key];
        if ("subnotes" in node) { //if node has children
          for (var i = 0; i < node.subnotes.length; i++) { //search through each child
            if (currentID === node.subnotes[i]) { //if we find a match, return that id
              return key;
            }
          }
        }
      }
      return notebook.rootSubnote; //if no match was found, we know the parent is the root subnote (or there was an invalid currentID)
    }

    //build notebookTree from notebook
    buildTree(notebookTree, notebook, expandedIDs, subnoteFromPath) {
      var expandedIDsCopy = expandedIDs.slice(); //make a copy so we aren't pushing onto an array in props
      if (subnoteFromPath) { //if we specify a subnoteFromPath, then we must set all of its parents to expanded
        var allParentsFound = false;
        var idToExpand = subnoteFromPath;
        while (allParentsFound === false) {
          var parentKey = this.getParentKey(notebook, null, idToExpand);
          if (parentKey !== 0) {
            idToExpand = parentKey;
            expandedIDsCopy.push(idToExpand);
          } else {
            allParentsFound = true;
          }
        }
      }

      for (var i = 0; i < Object.keys(notebook.subnotes).length; i++) {
        var currentID = Object.keys(notebook.subnotes)[i];
        var currentExpanded = false; //holds expansion state of currentID
        if (expandedIDsCopy.includes(currentID)) { //if the currentID is in the array of expandedIDs, then set currentExpanded to true
          currentExpanded = true;
        }
        notebookTree.push({ id: currentID,
                            parentId: this.getParentKey(notebook, i),
                            title: notebook.subnotes[currentID].subtopic,
                            subtitle: notebook.subnotes[currentID].note,
                            tags: notebook.subnotes[currentID].tags || [],
                            flashcards: notebook.subnotes[currentID].flashcards || [],
                            expanded: currentExpanded
                          });
      }
    }

    //recursive function that adds all descendants of parentNode to notebookFlat
    addChildrenToFlat(parentNode, notebookFlat) {
      if ("children" in parentNode) { //if the node has child nodes
        var id = parentNode.id;
        notebookFlat.subnotes[id].subnotes = []; //create array to hold child subnote IDs
        for (var i = 0; i < parentNode.children.length; i++) {
          //add child IDs to subnotes array of current subnote
          notebookFlat.subnotes[id].subnotes.push(parentNode.children[i].id);
          //add children to notebook
          var childID = parentNode.children[i].id;
          notebookFlat.subnotes[childID] = {};
          notebookFlat.subnotes[childID].subtopic = parentNode.children[i].title;
          notebookFlat.subnotes[childID].note = parentNode.children[i].subtitle;
          notebookFlat.subnotes[childID].tags = parentNode.children[i].tags || [];
          notebookFlat.subnotes[childID].flashcards = parentNode.children[i].flashcards || [];
          this.addChildrenToFlat(parentNode.children[i], notebookFlat);
        }
      }
    }

    //converts treeData structure to notebook format for exporting/saving to google drive
    saveTreeData(treeData) {
      var notebookFlat = {};
      notebookFlat.subnotes = {};
      //root subnote is the top object of treeData (if there is one)
      if (Object.keys(treeData).length === 1) {
        notebookFlat.rootSubnote = treeData[0].id;
      }
      //if there are multiple "roots", set rootSubnote to 0
      else {
        notebookFlat.rootSubnote = 0;
      }

      for (var i = 0; i < Object.keys(treeData).length; i++) {
        var id = treeData[i].id;
        notebookFlat.subnotes[id] = {};
        notebookFlat.subnotes[id].subtopic = treeData[i].title;
        notebookFlat.subnotes[id].note = treeData[i].subtitle;
        notebookFlat.subnotes[id].tags = treeData[i].tags || [];
        notebookFlat.subnotes[id].flashcards = treeData[i].flashcards || [];
        this.addChildrenToFlat(treeData[i], notebookFlat); //add info from all children (and children of children, etc)
      }
      this.setExpandedNodes(treeData); //update expanded state in app
      return notebookFlat;
    }

    //replaces a given subnote with values from newValues (id and children not changed)
    replaceSubnote(rowInfo, newValues) {
      //update node information in notebook
      var currentID = rowInfo.node.id;
      var notebookCopy = JSON.parse(JSON.stringify(this.props.notebookPlusMeta.notebook)); //copy notebook (we can't simply set this equal to notebook as that is just a reference)
      notebookCopy.subnotes[currentID].subtopic = newValues.subtopic;
      notebookCopy.subnotes[currentID].note = newValues.note;
      notebookCopy.subnotes[currentID].tags = newValues.tags;
      notebookCopy.subnotes[currentID].flashcards = newValues.flashcards;

      this.props.updateNotebook(this.props.match.params.notebookid, notebookCopy); //update notebook and save to google drive
    }

    //adds a new subnote under a given parent subnote
    addSubnote(rowInfo, newValues) {
      //create new node to add to notebook
      var newNode = {};
      newNode.id = UUID.v4();
      newNode.subtopic = newValues.subtopic;
      newNode.note = newValues.note;
      newNode.tags = newValues.tags;
      //not creating flashcards array here, as flashcards are not being passed in newValues here and are not required for every node

      var parentID = rowInfo.node.id;
      var notebookCopy = JSON.parse(JSON.stringify(this.props.notebookPlusMeta.notebook));

      if ("subnotes" in notebookCopy.subnotes[parentID]) { //if the parent already has children
        notebookCopy.subnotes[parentID].subnotes.push(newNode.id); //add new node id to children array
      } else { //if parent has no children yet
        notebookCopy.subnotes[parentID].subnotes = []; //create empty array to hold children IDs
        notebookCopy.subnotes[parentID].subnotes.push(newNode.id); //add new node id to children array
      }
      notebookCopy.subnotes[newNode.id] = newNode; //add newNode to notebook

      this.setExpandedNodes(this.state.treeData, parentID); //update expanded nodes and set parent of new node to expanded
      this.props.updateNotebook(this.props.match.params.notebookid, notebookCopy); //update notebook and write to google drive
    }

    //deletes a given subnote
    deleteSubnote(rowInfo) {
      var currentID = rowInfo.node.id;
      var parentID = rowInfo.node.parentId;
      var notebookCopy = JSON.parse(JSON.stringify(this.props.notebookPlusMeta.notebook));
      this.deleteSubnoteChildren(notebookCopy, currentID); //delete all children subnotes
      delete notebookCopy.subnotes[currentID]; //delete the current subnote

      if (parentID !== 0) { //if we are not deleting a roob subnote
        var index = notebookCopy.subnotes[parentID].subnotes.indexOf(currentID); //get index of ID to delete
        if (index !== -1) { //making sure we only delete the correct entry (only delete if index is found)
          notebookCopy.subnotes[parentID].subnotes.splice(index, 1); //delete the subnotes entry indicating a child node
        }
      }
      //no else - if we are deleting a roob subnote, there is no need to alter an array of children on the parent as there is no real parent

      this.setExpandedNodes(this.state.treeData, null, currentID); //update expanded nodes
      this.props.updateNotebook(this.props.match.params.notebookid, notebookCopy); //update notebook and write to google drive
    }

    deleteSubnoteChildren(notebookCopy, currentID) {
      if ("subnotes" in notebookCopy.subnotes[currentID]) { //if there are children
        var childrenIDs = notebookCopy.subnotes[currentID].subnotes.slice(); //copy array of children IDs
        for (var i = 0; i < childrenIDs.length; i++) { //for each child
          var currentChildID = childrenIDs[i]; //get the current child id
          this.deleteSubnoteChildren(notebookCopy, currentChildID); //call this function recursively to delete all children of children
          delete notebookCopy.subnotes[currentChildID]; //delete the current child after all of its children have been deleted
        }
      }
    }

    //uses treeData to generate an array of IDs of currently expanded nodes
    setExpandedNodes(treeData, idToExpand, idToCollapse) {
      var expandedIDs = []; //array to hold IDs of expanded nodes
      var flatData = getFlatDataFromTree({treeData:treeData, getNodeKey: this.getNodeKey}); //get flat data (in array form) so we can more easily determine expanded nodes

      for (var i = 0; i < flatData.length; i++) { //for each "root" node
        if ("expanded" in flatData[i].node) { //check for expanded field
          if (flatData[i].node.expanded === true && "children" in flatData[i].node) { //if the node is expanded and has children (no need to expand if no children)
            expandedIDs.push(flatData[i].node.id); //add the node id to expandedIDs
          }
        }
      }
      if (idToExpand) { //if we want to manually expand a node, we do it here (example: when adding node, we want to expand its parent node the next time the tree is created)
        expandedIDs.push(idToExpand);
      }
      if (idToCollapse) { //manually collapse a node (used to remove a node and its children from expandedIDs)
        var index = expandedIDs.indexOf(idToCollapse);
        if (index !== -1) {
          expandedIDs.splice(index, 1); //remove idToCollapse from expandedIDs
        }
        //remove children of idToCollapse
        for (i = 0; i < flatData.length; i++) {
          if (flatData[i].node.id === idToCollapse) { //if we find the node to collapse
            if ("children" in flatData[i].node) { //remove all children from expandedIDs
              this.removeExpandedChildren(expandedIDs, flatData[i].node);
            }
          }
        }
      }
      this.props.updateNotebookExpansion(this.props.match.params.notebookid, expandedIDs); //update the state in app
    }

    //remove all children of node from expandedIDs
    removeExpandedChildren(expandedIDs, node) {
      if ("children" in node) {
        for (var i = 0; i < node.children.length; i++) {
          var index = expandedIDs.indexOf(node.children[i].id); //get index of child ID
          if (index !== -1) { //if child ID is in expandedIDs
            expandedIDs.splice(index, 1); //remove child ID from expandedIDs
          }
          this.removeExpandedChildren(expandedIDs, node.children[i]); //call recursively to remove all descendants
        }
      }
    }

    getNodeKey({node, treeIndex}) {
      return treeIndex;
    }

    //WE SHOULDN'T NEED THIS FUNCTION ANY MORE
    //updates the state of Tree and updates the notebook in google drive via this.props.updateNotebook
    // updateTreeDataState(newTreeData) {
    //   //update state
    //   this.setState({
    //     treeData: newTreeData
    //   });
    //   //send updated notebook to updateNotebook to save to google drive
    //   this.props.updateNotebook(this.saveTreeData(newTreeData));
    // }

    //Parent-->Child-->Grandchildren
    //Tree-->SortableTree-->edit/add/delete components
    render() {
      if (typeof this.props.notebookPlusMeta === 'undefined' || typeof this.props.notebookPlusMeta.notebook === 'undefined') {
        return (<h3>Sorry, we could not load that notebook.</h3>)
      } else {
          return (
              <div style={{ height: 1080 }}>
                  <SortableTree
                      treeData={this.state.treeData}
                      onChange={treeData => {this.setExpandedNodes(treeData);
                                             this.setState({ treeData });
                                             }}
                      onMoveNode={() => this.props.updateNotebook(this.props.match.params.notebookid, this.saveTreeData(this.state.treeData))} //after moving a node, changes are only reflected in treeData so we need to convert treeData back to a form we can save in the notebook
                      generateNodeProps={rowInfo => ({
                                  buttons: [
                                      <EditModal
                                        rowInfo={rowInfo}
                                        replaceSubnote={this.replaceSubnote}
                                      />,
                                      <AddModal
                                        rowInfo={rowInfo}
                                        addSubnote={this.addSubnote}
                                      />,
                                      <DeleteModal
                                        rowInfo={rowInfo}
                                        deleteSubnote={this.deleteSubnote}
                                      />,
                                      <FlashcardsModal
                                        rowInfo={rowInfo}
                                        replaceSubnote={this.replaceSubnote}
                                      />,
                                  ],
                      })}
                  />
              </div>
          );
        }
    }
}
