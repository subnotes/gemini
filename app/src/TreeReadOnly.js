import React, { Component } from 'react';
import SortableTree, { getTreeFromFlatData, getFlatDataFromTree } from 'react-sortable-tree';
import FlashcardsModalReadOnly from './FlashcardsModalReadOnly';
import PropTypes from 'prop-types';

const propTypes = {
  match: PropTypes.object.isRequired,
  notebookPlusMeta: PropTypes.object,
  updateNotebookExpansion: PropTypes.func.isRequired
}

export default class TreeReadOnly extends Component {
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
        this.setExpandedNodes = this.setExpandedNodes.bind(this);
        this.removeExpandedChildren = this.removeExpandedChildren.bind(this);
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
      var currentID;
      if (!nodeID) {
        currentID = Object.keys(notebook.subnotes)[nodeIndex];
      } else {
        currentID = nodeID;
      }

      var indexTopLevel = notebook.topLevelSubnotes.indexOf(currentID);
      if (indexTopLevel !== -1) { //return 0 for parentID of a top level node
        return 0;
      }

      for (var key in notebook.subnotes) { //go through each subnote
        if (!notebook.subnotes.hasOwnProperty(key)) continue;
        var node = notebook.subnotes[key];
        if ("childSubnotes" in node) { //if node has children
          for (var i = 0; i < node.childSubnotes.length; i++) { //search through each child
            if (currentID === node.childSubnotes[i]) { //if we find a match, return that id
              return key;
            }
          }
        }
      }
      return 0; //if no match was found, return 0 (there was an invalid currentID)
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
        this.props.updateNotebookExpansion(this.props.match.params.notebookid, expandedIDsCopy); //update expanded array in app state
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
      if ("children" in parentNode && parentNode.children.length > 0) { //if the node has child nodes
        var id = parentNode.id;
        notebookFlat.subnotes[id].childSubnotes = []; //create array to hold child subnote IDs
        for (var i = 0; i < parentNode.children.length; i++) {
          //add child IDs to childSubnotes array of current subnote
          notebookFlat.subnotes[id].childSubnotes.push(parentNode.children[i].id);
          //add children to notebook
          var childID = parentNode.children[i].id;
          notebookFlat.subnotes[childID] = {};
          notebookFlat.subnotes[childID].subtopic = parentNode.children[i].title;
          notebookFlat.subnotes[childID].note = parentNode.children[i].subtitle;
          if (Array.isArray(parentNode.children[i].tags) && parentNode.children[i].tags.length > 0) {
            notebookFlat.subnotes[childID].tags = parentNode.children[i].tags;
          }
          if (Array.isArray(parentNode.children[i].flashcards) && parentNode.children[i].flashcards.length > 0) {
            notebookFlat.subnotes[childID].flashcards = parentNode.children[i].flashcards;
          }
          this.addChildrenToFlat(parentNode.children[i], notebookFlat);
        }
      }
    }

    //uses treeData to generate an array of IDs of currently expanded nodes
    setExpandedNodes(treeData, idToExpand, idToCollapse) {
      var expandedIDs = []; //array to hold IDs of expanded nodes
      var flatData = getFlatDataFromTree({treeData:treeData, getNodeKey: this.getNodeKey}); //get flat data (in array form) so we can more easily determine expanded nodes

      for (var i = 0; i < flatData.length; i++) { //for each top level node
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

    //Parent-->Child
    //Tree-->SortableTree
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
                      generateNodeProps={rowInfo => ({
                        buttons: [
                          <FlashcardsModalReadOnly
                            rowInfo={rowInfo}
                          />
                        ],
                      })}
                      canDrag={false}
                      className={this.props.className}
                  />
              </div>
          );
        }
    }
}

TreeReadOnly.propTypes = propTypes;
