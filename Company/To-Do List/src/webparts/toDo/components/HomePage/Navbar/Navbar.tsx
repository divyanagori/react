import React from "react";
import "./Navbar.scss";
import {
  DatePicker,
  Dropdown,
  IconButton,
  IDropdownOption,
  IDropdownStyles,
  ILabelStyles,
  IStyleSet,
  Label,
  Panel,
  PanelType,
  Pivot,
  PivotItem,
} from "@fluentui/react";
import moment from "moment";
import DialogBox from "../DialogBox/DialogBox";
import { getItems } from "../getToDOItems";
import { useBoolean } from "@fluentui/react-hooks";
import { getUserItems } from "../getToDOItems";
import { getProjectItems } from "../getToDOItems";
import PivotControl from "./PivotControler/PivotControl";
import TaskPannel from "../TaskPannel/TaskPannel";
import StatusPannel from "../StatusPannel/StatusPannel";
import TeamWorkload from "../TeamWorkload/TeamWorkload";
import Timesheet from "../Timesheet/Timesheet";
const Navbar = ({ context, setTodoData, todoData }: any) => {
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
        console.log("No data found");
      }
    };
    fatchUserData();
  }, []);

  // ============Settings Pannel=========
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  // ========Displaying Selected item=========
  const SelectedUser = async (UserName: any) => {
    const data = await getItems(context);
    const users = data.filter((item: any) => item.UserName === UserName);
    setTodoData(users);
  };

  const SelecteProject = async (ProjectName: any) => {
    const data = await getItems(context);
    console.log("Data is:-", data);
    const projectName = data.filter(
      (item: any) => item.ProjectName === ProjectName,
    );
    setTodoData(projectName);
  };

  const selectedDate = async (DueDate: any) => {
    const data = await getItems(context);
    const date = data.filter(
      (item: any) => new Date(item.DueDate) <= new Date(DueDate),
    );
    setTodoData(date);
  };

  const filterData = async () => {
    const data = await getItems(context);
    setTodoData(data);
  };

  console.log("context info", context);
  // ============DropDown Coloum=========

  // ==========DropDown User Name Coloum======
  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 100, borderRadius: 50 },
  };
  const [dateValue, setDateValue] = React.useState<any>({});

  const dropdownControlledUserName = userItems.map((item) => ({
    key: item.UserName,
    text: item.UserName,
  }));

  // ==========DropDown Project Name Coloum======
  const dropdownControlledProjectName = projectItems.map((item) => ({
    key: item.ProjectName,
    text: item.ProjectName,
  }));

  const [selectedItem, setSelectedItem] = React.useState<any>({});

  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    item?: IDropdownOption,
    name?: any,
  ): void => {
    setSelectedItem((prev: any) => ({ ...prev, [name]: item }));
  };

  // ==============Pivot Styles=============
  const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
    root: { marginTop: 10 },
  };

  const [selectedKey, setSelectedKey] = React.useState("Task");

  const pivotClick = (item?: PivotItem) => {
    console.log("item",item)
    setSelectedKey(item?.props.itemKey || "");
    console.log("selectedKey",  selectedKey);
  };
  return (
    <div className="ParentNavbar">
      <div className="childNavbar">
        <div className="Navbar">
          <div>
            <div className="headingLineOne">Unified workspace</div>
            <div className="headingLineSecond">Work Planner & Timesheet</div>
            <div className="headingLineThree">
              Track today's tasks, recurring work, todos, and weekly hours.
            </div>
          </div>

          <div className="rightNavbarContent">
            <DatePicker
              className="borderRadiusBox"
              placeholder="Select a date..."
              label="Due Date"
              ariaLabel="Select a date"
              value={dateValue["value"] ? dateValue["value"] : null}
              onSelectDate={(date) => {
                setDateValue((prev: any) => ({ ...prev, value: date }));
                selectedDate(date);
              }}
              formatDate={(date) => moment(date).format("DD-MM-YYYY")}
              // DatePicker uses English strings by default. For localized apps, you must override this prop.
            />
            <Dropdown
              className="borderRadiusBox"
              selectedKey={
                selectedItem["userName"]
                  ? selectedItem["userName"].key
                  : undefined
              }
              onChange={(e, option) => {
                onChange(e, option, "userName");
                SelectedUser(option?.key.toString());
              }}
              label="User Name"
              placeholder="Name"
              options={dropdownControlledUserName}
              styles={dropdownStyles}
            />
            <Dropdown
              selectedKey={
                selectedItem["projectName"]
                  ? selectedItem["projectName"].key
                  : undefined
              }
              // eslint-disable-next-line react/jsx-no-bind
              onChange={(e, option) => {
                onChange(e, option, "projectName");
                SelecteProject(option?.key.toString() || "");
              }}
              label="Project Name"
              placeholder="Project Name"
              options={dropdownControlledProjectName}
              styles={dropdownStyles}
            />

            <IconButton
              className="filterIcon"
              iconProps={{ iconName: "ClearFilter" }}
              title="ClearFilter"
              ariaLabel="ClearFilter"
              onClick={filterData}
            />
            <div className="addTaskButton">
              <DialogBox context={context} setTodoData={setTodoData} />
            </div>
            <div className="settingIcon">
              <IconButton
                iconProps={{ iconName: "Settings" }}
                title="Settings"
                ariaLabel="Settings"
                onClick={openPanel}
              />
            </div>
          </div>
        </div>
        <Pivot
          aria-label="Basic Pivot Example"
          selectedKey={selectedKey}
          onLinkClick={pivotClick}
        >
          <PivotItem
            headerText="Tasks"
            itemKey="Task"
            headerButtonProps={{
              "data-order": 1,
              "data-title": "My Files Title",
            }}
          >
            {/* {" "}
              <StatusPannel context={context} todoData={todoData} />
              <TaskPannel
                context={context}
                todoData={todoData}
                setTodoData={setTodoData}
              /> */}
          </PivotItem>
          <PivotItem headerText="Timesheet" itemKey="timesheet">
            <Label styles={labelStyles}>
              {/* <StatusPannel context={context} todoData={todoData} /> */}
            </Label>
          </PivotItem>
          <PivotItem headerText="Team Workload" itemKey="teamwork">
            <Label styles={labelStyles}>
              {/* <StatusPannel context={context} todoData={todoData} />
                <TeamWorkload /> */}
            </Label>
          </PivotItem>
        </Pivot>
      </div>
      <Panel
        headerText="Settings"
        isOpen={isOpen}
        onDismiss={dismissPanel}
        // You MUST provide this prop! Otherwise screen readers will just say "button" with no label.
        closeButtonAriaLabel="Close"
        type={PanelType.custom}
        customWidth="800px"
      >
        <PivotControl context={context} setTodoData={setTodoData} />
      </Panel>
      {selectedKey === "Task" && (
        <div>
          <StatusPannel context={context} todoData={todoData} />
          <TaskPannel
            context={context}
            todoData={todoData}
            setTodoData={setTodoData}
          />
        </div>
      )}

      {selectedKey === "timesheet" && (
        <div>
          <StatusPannel context={context} todoData={todoData} />
          <Timesheet/>
        </div>
      )}

      {selectedKey === "teamwork" && (
        <div>
          <StatusPannel context={context} todoData={todoData} />
          <TeamWorkload context={context}/>
        </div>
      )}
    </div>
  );
};

export default Navbar;
