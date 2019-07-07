import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { AddAPhoto } from "@material-ui/icons";
import { useActions } from "typeless";
import { GlobalActions } from "features/global/interface";
import style from "./style.module.css";

export const ImageEditor = () => {
  const { registerImage } = useActions(GlobalActions);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    registerImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps({ className: style.dropzone })}>
        <input {...getInputProps()} />
        <AddAPhoto />
        <p>画像をアップロードしてください</p>
      </div>
    </div>
  );
};
