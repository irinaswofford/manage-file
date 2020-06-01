import { useEffect, useState } from 'react';
import { getFiles } from '../api';

export function useFiles() {

  const [files, setFiles] = useState([]);
  const [isSortAscending, setIsSortAscending] = useState(true);

  useEffect(() => {
    getFiles()
      .then(files => {

        // sort ascending onload
        files = sortFileNamesAscending(files);

        // set state
        setIsSortAscending(false);
        setFiles(files);

      });
  }, []);

  return files;
}

export function sortFileNamesAscending(files) {

  // sort files
  files.sort((a, b) => {

    // validation
    if (a.versions.length === 0 || b.versions.length === 0) {
      return -1;
    }

    // sort versions descending
    a.versions = a.versions.sort((aa, bb) => (aa.id > bb.id) ? -1 : 1);
    b.versions = b.versions.sort((aa, bb) => (aa.id > bb.id) ? -1 : 1);

    // un-pack
    let aCurrentVersionName = a.versions[0]["name"] || "";
    let bCurrentVersionName = b.versions[0]["name"] || "";

    if (aCurrentVersionName > bCurrentVersionName) {
      return 1;
    }
    else {
      return -1;
    }
  });

  return files;
}

export function sortFileNamesDescending(files) {

  // sort files
  files.sort((a, b) => {

    // validation
    if (a.versions.length === 0 || b.versions.length === 0) {
      return -1;
    }

    // sort versions descending
    a.versions = a.versions.sort((aa, bb) => (aa.id > bb.id) ? -1 : 1);
    b.versions = b.versions.sort((aa, bb) => (aa.id > bb.id) ? -1 : 1);

    // un-pack
    let aCurrentVersionName = a.versions[0]["name"] || "";
    let bCurrentVersionName = b.versions[0]["name"] || "";

    if (aCurrentVersionName < bCurrentVersionName) {
      return 1;
    }
    else {
      return -1;
    }
  });

  return files;
}