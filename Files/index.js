import React from 'react';
import { useFiles, sortFileNamesAscending, sortFileNamesDescending } from './use-files';
import { addVersion, addFile } from '../api';
import styles from './index.module.css';


// TODO: Improve the implementation of this component according to task (4)
function File({ file, files, isSortAscending, reRenderGrid }) {

  const onRename = () => {

    let newName = window.prompt('Rename this file');
    let wasClickedCancel = typeof newName === "undefined" || newName === null;

    // exit on cancel
    if (wasClickedCancel) {
      return; // exit
    }

    // validation
    newName = (newName || "").trim();
    if (newName === "") {
      alert("invalid filename, please re-enter.");
      return;
    }

    // addVersion
    addVersion(file.id, newName);

    // ensure proper sorting (newly added name changes alphabetical order)
    if (isSortAscending === true) {
      sortFileNamesDescending(files);
    }
    else if (isSortAscending === false) {
      sortFileNamesAscending(files);
    }

    // triggers re-render
    reRenderGrid(Math.random());
  }

  return (
    <div className={`${styles.file} divReadoutHolder`}>

      <div className="divFileNameAndButton">
        <span>File Name:&nbsp;</span>
        <strong>{file.versions[0].name}</strong>
        <button className="buttonAddNewVersion" onClick={onRename}>Rename File </button>
      </div>

      <div>File Version History:</div>

      <ul className="ulVersions">
        {file.versions.map(version => (

          <li key={version.id}>
            <span>Id:&nbsp;{version.id}</span>&nbsp;&nbsp;&nbsp;<span>Name:&nbsp;{version.name}</span>
          </li>
        ))}
      </ul>

    </div>
  );
}


export default function Files() {

  // TODO: Replace this polling-like implementation according to task (2)
  // const [state, setState] = React.useState();
  // setInterval(() => setState(Math.random()), 1000);

  //alert("called Files");

  const files = useFiles();
  const [isSortAscending, setIsSortAscending] = React.useState(false);
  const [grid, reRenderGrid] = React.useState(false);


  // handleClick toggleSortAscending
  const handleClick_toggleSortAscending = (event) => {

    if (isSortAscending === true) {

      // sortFileNamesAscending
      sortFileNamesAscending(files);

      // update state
      setIsSortAscending(false);
    }
    else if (isSortAscending === false) {

      // sortFileNamesDescending
      sortFileNamesDescending(files);

      // update state
      setIsSortAscending(true);
    }
  };

  const handleClick_addNewFile = (event) => {

    let fileName = window.prompt('Add new file. Enter filename:');
    let wasClickedCancel = typeof fileName === "undefined" || fileName === null;

    // exit on cancel
    if (wasClickedCancel) {
      return; // exit
    }

    // validation
    fileName = (fileName || "").trim();
    if (fileName === "") {
      alert("invalid filename, please re-enter.");
      return;
    }

    // addVersion
    addFile(fileName);

    // ensure proper sorting (newly added name changes alphabetical order)
    if (isSortAscending === true) {
      sortFileNamesDescending(files);
    }
    else if (isSortAscending === false) {
      sortFileNamesAscending(files);
    }

    // triggers re-render
    reRenderGrid(Math.random());
  };





  return (

    <div>


      <div className="divUIHolder">

        <div className="divCaption">
          <button onClick={event => handleClick_addNewFile(event)}>Add New File</button>
        </div>


        {/* TODO: Implement sort feature according to task (3) */}

        <div className="divCaption">
          <button onClick={event => handleClick_toggleSortAscending(event)} className="buttonSort" title="Toggle Sort Ascending/Descending">
            {isSortAscending === true ? "Sort A-Z" : "Sort Z-A"}
          </button>
        </div>


        {
          files.map((file, index) => {
            return <File file={file} files={files} isSortAscending={isSortAscending} reRenderGrid={reRenderGrid} key={file.id}></File>
          })
        }

        {/* TODO: Add a button to add a new file according to task (5) */}
      </div>
    </div>
  );
}
