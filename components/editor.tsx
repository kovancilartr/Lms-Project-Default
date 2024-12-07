"use client";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Editor = ({ onChange, value }: EditorProps) => {
  return (
    <div className="bg-white dark:bg-darkBgColor700 dark:text-darkTextColor">
      <ReactQuill theme="snow" value={value} onChange={onChange} />
    </div>
  );
};
