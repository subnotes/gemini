import React, { Component } from 'react';
import notebook from './data/samplenotebookalt3.json';
import SortableTree, { getTreeFromFlatData, changeNodeAtPath, addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
import EditModal from './EditModal.js';
import AddModal from './AddModal.js';
import DeleteModal from './DeleteModal.js';

export default class Tree extends Component {
    constructor(props) {
        super(props);

        var notebookTree = [];

        //returns the id of the parent node of notebook.subnotes[nodeIndex]
        function getParentKey(notebook, nodeIndex) {
          var currentID = Object.keys(notebook.subnotes)[nodeIndex];

          if (currentID === notebook.rootSubnote) { //return 0 for parentID of root node
            return 0;
          }

          for (var key in notebook.subnotes) { //go through each subnote
            //console.log(key);
            if (!notebook.subnotes.hasOwnProperty(key)) continue;
            var node = notebook.subnotes[key];
            //console.log(node);
            if ("subnotes" in node) { //if node has children
              //console.log("SUBNOTES FOUND");
              //console.log(node.subnotes);
              for (var i = 0; i < node.subnotes.length; i++) { //search through each child
                if (currentID === node.subnotes[i]) { //if we find a match, return that id
                  //console.log("PARENT FOUND");
                  //console.log(node.subnotes[i]);
                  return key;
                }
              }
            }
          }
          return notebook.rootSubnote; //if no match was found, we know the parent is the root subnote
        }

        //build notebookTree from notebook
        for (var i = 0; i < Object.keys(notebook.subnotes).length; i++) {
          var currentID = Object.keys(notebook.subnotes)[i];
          notebookTree.push({ id: currentID,
                              parentId: getParentKey(notebook, i),
                              title: notebook.subnotes[currentID].subtopic,
                              subtitle: notebook.subnotes[currentID].note,
                              tags: notebook.subnotes[currentID].tags
                            });
        }

        this.state = {
            treeData: getTreeFromFlatData({flatData: notebookTree})
        };

        //recursive function that adds all descendants of parentNode to notebookFlat
        function addChildrenToFlat(parentNode, notebookFlat) {
          if ("children" in parentNode) { //if the node has child nodes
            var id = parentNode.id;
            notebookFlat.subnotes[id].subnotes = [];
            for (var i = 0; i < parentNode.children.length; i++) {
              //add child IDs to subnotes array of current subnote
              notebookFlat.subnotes[id].subnotes.push(parentNode.children[i].id);
              //add children to notebook
              var childID = parentNode.children[i].id;
              notebookFlat.subnotes[childID] = {};
              notebookFlat.subnotes[childID].subtopic = parentNode.children[i].title;
              notebookFlat.subnotes[childID].note = parentNode.children[i].subtitle;
              notebookFlat.subnotes[childID].tags = parentNode.children[i].tags;
              addChildrenToFlat(parentNode.children[i], notebookFlat);
            }
          }
        }

        //converts treeData structure to notebook format for exporting/saving to google drive
        function saveTreeData(treeData) {
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
            notebookFlat.subnotes[id].tags = treeData[i].tags;
            addChildrenToFlat(treeData[i], notebookFlat); //add info from all children (and children of children, etc)
          }
          return notebookFlat;
        }
        this.saveTreeData = saveTreeData;

        //replaces a given subnote with values from newValues (id and children not changed)
        function replaceSubnote(rowInfo, newValues) {

          //function to pass to changeNodeAtPath
          function getNodeKey({node, treeIndex}) {
            return treeIndex;
          }

          //update node information
          rowInfo.node.title = newValues.subtopic;
          rowInfo.node.subtitle = newValues.note;
          rowInfo.node.tags = newValues.tags;
          //return the updated treeData
          return changeNodeAtPath({ treeData: this.treeData, path: rowInfo.path, newNode: rowInfo.node, getNodeKey: getNodeKey });
        }
        this.replaceSubnote = replaceSubnote;

        //adds a new subnote under a given parent subnote
        function addSubnote(rowInfo, newValues) {

          //function to pass to addNodeUnderParent
          function getNodeKey({node, treeIndex}) {
            return treeIndex;
          }

          //create new node, populate with values from newValues
          var newNode = {};
          newNode.id = String(Math.random()); //NEED TO UPDATE THIS TO ASSIGN UUID
          newNode.parentId = rowInfo.node.id;
          newNode.title = newValues.subtopic;
          newNode.subtitle = newValues.note;
          newNode.tags = newValues.tags;
          //add node in treeData
          var result = addNodeUnderParent({ treeData: this.treeData, newNode: newNode, parentKey: rowInfo.treeIndex, getNodeKey: getNodeKey, expandParent: true });
          console.log(result);
          return result;
        }
        this.addSubnote = addSubnote;

        //deletes a given subnote
        function deleteSubnote(rowInfo) {

          //function to pass to removeNodeAtPath
          function getNodeKey({node, treeIndex}) {
            return treeIndex;
          }

          //delete node and get updated treeData
          var result = removeNodeAtPath({ treeData: this.treeData, path: rowInfo.path, getNodeKey: getNodeKey });
          return result;
        }
        this.deleteSubnote = deleteSubnote;

        function updateTreeDataState(newTreeData) {
          this.setState({
            treeData: newTreeData
          });
        }
        this.updateTreeDataState = updateTreeDataState.bind(this);

    } //end of constructor

    //Parent-->Child-->Grandchildren
    //Tree-->SortableTree-->edit/add/delete components
    render() {
      console.log("treeData:");
      console.log(this.state.treeData);
      console.log("treeData back to notebook:")
      console.log(this.saveTreeData(this.state.treeData));
        return (
            <div style={{ height: 1080 }}>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                    onMoveNode={function() {console.log("node moved");}}
                    generateNodeProps={rowInfo => ({
                                buttons: [
                                    <EditModal
                                      rowInfo={rowInfo}
                                      replaceSubnote={this.replaceSubnote}
                                      treeData={this.state.treeData}
                                      updateTreeDataState={this.updateTreeDataState}
                                    />,
                                    <AddModal
                                      rowInfo={rowInfo}
                                      addSubnote={this.addSubnote}
                                      treeData={this.state.treeData}
                                      updateTreeDataState={this.updateTreeDataState}
                                    />,
                                    <DeleteModal
                                      rowInfo={rowInfo}
                                      deleteSubnote={this.deleteSubnote}
                                      treeData={this.state.treeData}
                                      updateTreeDataState={this.updateTreeDataState}
                                    />,
                                ],
                            })}
                />
            </div>
        );
    }
}
