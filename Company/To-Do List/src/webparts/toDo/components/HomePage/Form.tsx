import React from "react";
import {
  Checkbox,
  ComboBox,
  DatePicker,
  defaultDatePickerStrings,
  IIconProps,
} from "@fluentui/react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { ContextualMenu } from "@fluentui/react/lib/ContextualMenu";
import { TextField } from "@fluentui/react/lib/TextField";
import { useBoolean } from "@fluentui/react-hooks";
import { Stack, IStackProps, IStackStyles } from "@fluentui/react/lib/Stack";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import moment from "moment";
import { IToDoProps } from "../IToDoProps";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { getUserItems } from "./getToDOItems";
import { getProjectItems } from "./getToDOItems";
import { getItems } from "./getToDOItems";
import "../HomePage/FormStyling/Form.scss";

export const Form = ({
  context,
  setTodoData,
  hideDialog,
  toggleHideDialog,
  editData,
}: any) => {
  const [taskname, setTaskname] = React.useState("");
  const [hours, setHours] = React.useState("");

  // ================Getting Data from ToDoProjectItems===================

  const [projectItems, setProjectItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fatchProjectData = async () => {
      const data = await getProjectItems(context);
      if (data) {
        setProjectItems(data);
      } else {
        console.log("No data found");
      }
    };
    fatchProjectData();
  }, []);

  // ================Getting Data from ToDoUserItems===================

  const [userItems, setUserItems] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fatchUserData = async () => {
      const data = await getUserItems(context);
      if (data) {
        setUserItems(data);
      } else {
        console.log("No Data Found");
      }
    };
    fatchUserData();
  }, []);

  //  ===========Clear data=======
  function canceled() {
    setTaskname("");
    setSelectedItem({});
    setHours("");
    setDatePickerValue({});
    setIsChecked(false);
  }

  // ==========DropDown==========
  const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };

  const dropdownProjectShortCode = projectItems.map((item: any) => ({
    key: item.ProjectCode,
    text: item.ProjectCode,
  }));

  const dropdownControlledProjectStatus = [
    { key: "Pending", text: "Pending" },
    { key: "Completed", text: "Completed" },
    { key: "Hold", text: "Hold" },
    { key: "Overdue", text: "Overdue" },
  ];

  const dropdownControlledProjectName = projectItems.map((item: any) => ({
    key: item.ProjectName,
    text: item.ProjectName,
  }));

  const dropdownControlledUserName = userItems.map((item: any) => ({
    key: item.UserName,
    text: item.UserName,
  }));

  const dropdownControlledUserEmail = userItems.map((item) => ({
    key: item.UserEmail,
    text: item.UserEmail,
  }));
  const dropdownControlledPriority = [
    { key: "Low", text: "Low" },
    { key: "Medium", text: "Medium" },
    { key: "High", text: "High" },
    { key: "Priority", text: "Critical" },
  ];

  const [selectedItem, setSelectedItem] = React.useState<any>({});

  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    name?: any,
  ): void => {
    setSelectedItem((prev: any) => ({ ...prev, [name]: item }));
  };
  console.log("setSelectedItem", selectedItem);

  React.useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);
  //   ==============checkbox code in dialog ===========
  const [isChecked, setIsChecked] = React.useState(false);
  console.log("isChecked", isChecked);
  // ===========text field===========
  const stackTokens = { childrenGap: 50 };
  const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
  const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
  };
  // =============dialog box state===========

  const [isDraggable] = useBoolean(false);
  const modalProps = React.useMemo(
    () => ({
      isBlocking: true,
      styles: {
        main: { width: 800 },
      },
      dragOptions: dragOptions,
    }),
    [isDraggable],
  );
  // =============dialog box code===========
  const dragOptions = {
    moveMenuItemText: "Move",
    closeMenuItemText: "Close",
    menu: ContextualMenu,
  };

  const dialogContentProps = {
    type: DialogType.normal,
    title: "Add Task",
    showCloseButton: true,
  };

  const [datePickerValue, setDatePickerValue] = React.useState<any>({});

  const onSelectDate = (date: Date | null | undefined, name?: any): void => {
    setDatePickerValue((prev: any) => ({ ...prev, [name]: date }));
  };

  // ==============Add Icon=======
  const addIcon: IIconProps = { iconName: "Add" };

  // ===============Post Data To SharePoint=========
  const addItem = async () => {
    if (
      !taskname ||
      !selectedItem.projectName ||
      !selectedItem.projectCode ||
      !selectedItem.userName ||
      !selectedItem.userEmail ||
      !selectedItem.projectStatus ||
      !selectedItem.priority ||
      !datePickerValue.startDate ||
      !datePickerValue.dueDate ||
      !hours
    ) {
      alert("Please fill all fields.");
      return;
    }
    const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('ToDo')/items`;
    console.log(url);
    const body = JSON.stringify({
      TaskName: taskname,
      ProjectName: selectedItem.projectName.key,
      ProjectCode: selectedItem.projectCode.key,
      UserName: selectedItem.userName.key,
      UserEmail: selectedItem.userEmail.key,
      ProjectStatus: selectedItem.projectStatus.key,
      Priority: selectedItem.priority.key,
      StartDate: datePickerValue.startDate.toISOString(),
      DueDate: datePickerValue.dueDate.toISOString(),
      Hours: hours.toString(),
      Reminder: isChecked.toString(),
    });

    try {
      const response: SPHttpClientResponse = await context.spHttpClient.post(
        url,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "Content-Type": "application/json;odata=nometadata",
          },
          body: body,
        },
      );

      if (response.ok) {
        alert("Item added successfully");
        canceled();
        toggleHideDialog();
        const todoitems = await getItems(context);
        console.log(todoitems, "cirrent items");
        setTodoData(todoitems);
      } else {
        alert("Error adding item");
      }
    } catch (error) {
      alert(error);
    }
  };

  // ========Edit Button Functionality==========
  React.useEffect(() => {
    if (editData) {
      setTaskname(editData.TaskName);
      setHours(editData.Hours);
      setIsChecked(editData.Reminder);
      setSelectedItem({
        projectName: { key: editData.ProjectName },
        projectCode: { key: editData.ProjectCode },
        userName: { key: editData.UserName },
        userEmail: { key: editData.UserEmail },
        projectStatus: { key: editData.ProjectStatus },
        priority: { key: editData.Priority },
      });
      setDatePickerValue({
        startDate: new Date(editData.StartDate),
        dueDate: new Date(editData.DueDate),
      });
    }
    console.log("editData is", editData);
  }, [editData]);

  // ===========Update Data============
  const updateItem = async () => {
    const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('ToDo')/items(${editData.ID})`;

    const response: SPHttpClientResponse = await context.spHttpClient.post(
      url,
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: "application/json;odata=nometadata",
          "Content-Type": "application/json;odata=nometadata",
          "IF-MATCH": "*",
          "X-HTTP-Method": "MERGE",
        },
        body: JSON.stringify({
          TaskName: taskname,
          ProjectName: selectedItem.projectName.key,
          ProjectCode: selectedItem.projectCode.key,
          UserName: selectedItem.userName.key,
          UserEmail: selectedItem.userEmail.key,
          ProjectStatus: selectedItem.projectStatus.key,
          Priority: selectedItem.priority.key,
          StartDate: datePickerValue.startDate.toISOString(),
          DueDate: datePickerValue.dueDate.toISOString(),
          Hours: hours.toString(),
          Reminder: isChecked.toString(),
        }),
      },
    );
    if (response.ok) {
      const result = await getItems(context);
      setTodoData(result);
      canceled();
      toggleHideDialog();
      alert("Data Updated Sucessfully");
    }
  };

  return (
    <Dialog
      hidden={hideDialog}
      onDismiss={toggleHideDialog}
      dialogContentProps={dialogContentProps}
      modalProps={modalProps}
    >
      <form noValidate autoComplete="off">
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
          <Stack {...columnProps}>
            <TextField
              value={taskname}
              onChange={(_, value) => {
                setTaskname(value || "");
              }}
              placeholder="Task Name"
              label="Task Name"
            />
            <div>
              <div className="topSectionOfLable">
                <div className="lable">Project Code</div>
              </div>
              <Dropdown
                selectedKey={
                  selectedItem["projectCode"]
                    ? selectedItem["projectCode"].key
                    : null
                }
                // eslint-disable-next-line react/jsx-no-bind
                // onChange={onChange}x
                onChange={(e, option) => {
                  onChange(e, option, "projectCode");
                }}
                placeholder="Project Code"
                options={dropdownProjectShortCode}
                styles={dropdownStyles}
              />
            </div>
            <Dropdown
              selectedKey={
                selectedItem["projectStatus"]
                  ? selectedItem["projectStatus"].key
                  : null
              }
              // eslint-disable-next-line react/jsx-no-bind
              onChange={(e, option) => {
                onChange(e, option, "projectStatus");
              }}
              label="Project Status"
              placeholder="Project Status"
              options={dropdownControlledProjectStatus}
              styles={dropdownStyles}
            />

            {/* <DatePicker
                // firstDayOfWeek={firstDayOfWeek}
                placeholder="Select a date..."
                label="Due Date"
                formatDate={(date) => moment(date).format("DD/MM/YYYY")}
                value={
                  selectedItem["startDate"] ? selectedItem["startDate"] : undefined
                }
                onSelectDate={(date) => {
                  setSelectedItem((prev: any) => ({ ...prev, startDate: date }));
                }}
                // DatePicker uses English strings by default. For localized apps, you must override this prop.
                strings={defaultDatePickerStrings}
              /> */}
            <DatePicker
              // firstDayOfWeek={firstDayOfWeek}
              placeholder="Select a date..."
              label="Start Date"
              formatDate={(date) => moment(date).format("DD-MM-YYYY")}
              value={datePickerValue["startDate"]}
              onSelectDate={(data) => onSelectDate(data, "startDate")}
              // DatePicker uses English strings by default. For localized apps, you must override this prop.
              strings={defaultDatePickerStrings}
            />
            <TextField
              type="number"
              placeholder="Number of Hours"
              label="Number of Hours"
              min={1}
              value={hours}
              onChange={(_, value) => {
                setHours(value || "");
              }}
            />
          </Stack>
          <Stack {...columnProps}>
            <div>
              <div>
                <div className="topSectionOfLable">
                  <div className="lable">Project Name</div>
                </div>
                <Dropdown
                  selectedKey={
                    selectedItem["projectName"]
                      ? selectedItem["projectName"].key
                      : null
                  }
                  // eslint-disable-next-line react/jsx-no-bind
                  onChange={(e, option) => {
                    onChange(e, option, "projectName");
                  }}
                  placeholder="Project Name"
                  options={dropdownControlledProjectName}
                  styles={dropdownStyles}
                />
              </div>
            </div>
            <div>
              <div className="topSectionOfLable">
                <div className="lable">User Name</div>
              </div>
              <Dropdown
                selectedKey={
                  selectedItem["userName"] ? selectedItem["userName"].key : null
                }
                // eslint-disable-next-line react/jsx-no-bind
                onChange={(e, option) => {
                  onChange(e, option, "userName");
                }}
                placeholder="User Name"
                options={dropdownControlledUserName}
                styles={dropdownStyles}
              />
            </div>

            <div>
              <div className="topSectionOfLable">
                <div className="lable">User Email</div>
              </div>
              <Dropdown
                selectedKey={
                  selectedItem["userEmail"]
                    ? selectedItem["userEmail"].key
                    : null
                }
                // eslint-disable-next-line react/jsx-no-bind
                onChange={(e, option) => {
                  onChange(e, option, "userEmail");
                }}
                placeholder="User Name"
                options={dropdownControlledUserEmail}
                styles={dropdownStyles}
              />
            </div>
            <Dropdown
              selectedKey={
                selectedItem["priority"] ? selectedItem["priority"].key : null
              }
              // eslint-disable-next-line react/jsx-no-bind
              onChange={(_, option) => {
                onChange(_, option, "priority");
              }}
              label="Priority"
              placeholder="Priority"
              options={dropdownControlledPriority}
              styles={dropdownStyles}
            />

            {/* <DatePicker
                placeholder="Select a date..."
                label="Due Date"
                ariaLabel="Select a date"
                value={
                  selectedItem["dueDate"]
                }
                // onSelectDate={(date) => onSelectDate(date
                // )}
                onSelectDate={(date) => {
                  setSelectedItem((prev: any) => ({
                    ...prev,
                    dueDate: date,
                  }));
                }}
                formatDate={(date) => moment(date).format("DD/MM/YYYY")}
                // DatePicker uses English strings by default. For localized apps, you must override this prop.
                strings={defaultDatePickerStrings}
              /> */}
            <DatePicker
              placeholder="Select a date..."
              label="Due Date"
              ariaLabel="Select a date"
              value={datePickerValue["dueDate"]}
              onSelectDate={(date) => onSelectDate(date, "dueDate")}
              formatDate={(date) => moment(date).format("DD-MM-YYYY")}
              // DatePicker uses English strings by default. For localized apps, you must override this prop.
              strings={defaultDatePickerStrings}
            />
            {/* <div style={{ marginTop: "45px" }}>
              <Checkbox
                label="Set Reminder"
                checked={isChecked}
                onChange={(_, checked) => setIsChecked(!!checked)}
              />
            </div> */}
          </Stack>
        </Stack>
      </form>

      <DialogFooter>
        <DefaultButton onClick={canceled} text="Cancel" />
        <PrimaryButton
          onClick={editData ? updateItem : addItem}
          text={editData ? "Update" : "Save"}
        />
      </DialogFooter>
    </Dialog>
  );
};
