/*
export function cleanNotebook(notebook, propsToDeleteFromNotebook, propsToDeleteFromSubnotes) {
  
}

export function validateNotebook(notebook, schema) {
  
}

export function mapSubnotes(notebook, func) {
  
}

export function addParentsToSubnote(notebook) {
  
}

export function addTagsIndexToNotebook(notebook) {
  
}
*/

// TODO: get tags from flashcards too (currently only getting from subnotes)
export function updateTags (notebook) {
  var notebookTags = {}
  if (typeof notebook.subnotes === 'object') {
    Object.entries(notebook.subnotes).forEach(([uuid, subnote]) => {
      if (Array.isArray(subnote.tags)) {
        subnote.tags.forEach((tag) => {
          notebookTags[tag] = notebookTags[tag] || []
          notebookTags[tag].push(uuid)
        })
      }
    })
    return notebookTags
  }
}
