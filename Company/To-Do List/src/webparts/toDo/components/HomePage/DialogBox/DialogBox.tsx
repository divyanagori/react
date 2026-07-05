import * as React from "react";
import { IIconProps } from "@fluentui/react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { useBoolean } from "@fluentui/react-hooks";
import "./DialogBox.scss";
import { Form } from "../Form";

const DialogBox = ({ context, setTodoData }: any) => {
  // =============dialog box state===========
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  // ==============Add Icon=======
  const addIcon: IIconProps = { iconName: "Add" };

  return (
    <>
      <DefaultButton
        onClick={toggleHideDialog}
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "10px",
        }}
        text="Add Task"
        iconProps={addIcon}
        allowDisabledFocus
      />
      <Form
        context={context}
        setTodoData={setTodoData}
        hideDialog={hideDialog}
        toggleHideDialog={toggleHideDialog}
      />
    </>
  );
};

export default DialogBox;
