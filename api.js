const files = [
  {
    id: 'the-file-id-1',
    versions: [
      { id: 1, name: 'test.txt' },
      { id: 0, name: 'test.txt' },
    ],
  },
  {
    id: 'the-file-id-2',
    versions: [
      { id: 1, name: 'recipes.doc' },
      { id: 0, name: 'recipes.doc' },
    ],
  },  
  {
    id: 'the-file-id-3',
    versions: [
      { id: 1, name: 'picture.png' },
      { id: 0, name: 'photo.png' },
    ],
  },
  {
    id: 'the-file-id-4',
    versions: [
      { id: 1, name: 'zebra.png' },
      { id: 0, name: 'zebra.png' },
    ],
  },
  {
    id: 'the-file-id-5',
    versions: [
      { id: 1, name: 'acrobat.png' },
      { id: 0, name: 'acrobat.png' },
    ],
  }
];

export async function getFiles() {
  return files;
}

export async function addFile(fileName) {
  // TODO: Implement this API to add a new file according to task (5).



  let newFile = {
    id: `the-file-id-${files.length + 1}`,
    versions: [
      { id: 0, name: fileName }
    ],
  }

  files.push(newFile);
}

export async function addVersion(fileId, name) {


  // TODO: Insert the new version on the beginning of the stack according to task (1)
  const file = files.find(f => f.id === fileId);

  // sort versions ascending
  file.versions.sort((a, b) => (a.id > b.id) ? 1 : -1);

  // create new versionId
  const versionId = file.versions[file.versions.length - 1].id + 1;

  // use unshift to add new version at start of array
  file.versions.unshift({ id: versionId, name });

  // sort versions descending
  file.versions.sort((a, b) => (a.id > b.id) ? -1 : 1);


}


