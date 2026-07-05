import React from "react";
import "./TaskPannel.scss";
import {
  Checkbox,
  CommandBarButton,
  DefaultButton,
  Dialog,DialogFooter,
  DialogType,
  Dropdown,
  IconButton,
  IDropdownStyles,
  IIconProps,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import moment from "moment";
import { useBoolean } from "@fluentui/react-hooks";
import { Form } from "../Form";
import {getItems} from "../getToDOItems"
interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

const TaskPannel = ({ context, todoData, setTodoData }: any) => {
  // ========Edit Button Functionality==========
  const [hideEditDialog, { toggle: toggleEditDialog }] = useBoolean(true);
  const [editData, setEditData] = React.useState<any>(null);

  // =========Edit Button==========
  const editIcon: IIconProps = { iconName: "Edit" };
  const completedIcon: IIconProps = { iconName: "Completed" };
  const deleteIcon: IIconProps = { iconName: "Delete" };

  // ============drop down=========
  const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };
  const dropdownControlledProjectStatus = [
    { key: "Pending", text: "Pending" },
    { key: "Hold", text: "Hold" },
     { key: "Working", text: "Working" },
    { key: "Overdue", text: "Overdue" },
  ];

  // const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();
  // const onChange = (
  //   event: React.FormEvent<HTMLDivElement>,
  //   item: IDropdownOption,
  // ): void => {
  //   setSelectedItem(item);
  // };

  // ===========Add Todo in Task Box====
  const addIcon: IIconProps = { iconName: "Add" };

  // ============get Method==========
  // const getItems = async () => {
  //   const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('ToDo')/items`;

  //   try {
  //     const response: SPHttpClientResponse = await context.spHttpClient.get(
  //       url,
  //       SPHttpClient.configurations.v1,
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       setTodoData(data.value);
  //       console.log(data.value);
  //     } else {
  //       console.log("Error fetching data");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  React.useEffect(() => {
  loadItems();
}, []);

const loadItems = async () => {
  const data = await getItems(context);
  setTodoData(data);
};

  // ============update item======

  const editProject = async (id: number, status: string) => {
    const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('ToDo')/items(${id})`;

    await context.spHttpClient.post(url, SPHttpClient.configurations.v1, {
      headers: {
        Accept: "application/json;odata=nometa  data",
        "Content-Type": "application/json;odata=nometadata",
        "IF-MATCH": "*",
        "X-HTTP-Method": "MERGE",
      },
      body: JSON.stringify({
        ProjectStatus: status,
      }),
    });
    await loadItems();
  };

  // ============ Delete pannel Method========

  const [hideDeleteDialog, { toggle: toggleDeleteDialog }] = useBoolean(true);
  const [selectedId, setSelectedId] = React.useState<number>(0);

  const deleteItem = async (id: number) => {
    const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('ToDo')/items(${id})`;
    const response = await context.spHttpClient.post(
      url,
      SPHttpClient.configurations.v1,
      {
        headers: {
          "IF-MATCH": "*",
          "X-HTTP-Method": "DELETE",
        },
      },
    );
    if (response.ok) {
      alert("Item deleted successfully");
      await loadItems();// reload data
    } else {
      alert("Delete failed");
    }

    return response.ok;
  };

  const handleDelete = (id: number) => {
    setSelectedId(id);
    toggleDeleteDialog();
  };

  // ========Edit Button Functionality==========

  const handleEdit = (item: any) => {
    console.log("clicked");
    console.log(item);
    setEditData(item);
    toggleEditDialog();
  };


  // ========Dialog Box=========
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const dialogContentProps = {
    type: DialogType.normal,
    title: "Empty Field",
    subText: "Firstly E nter some type of task in this input todo field",
  };
  //==========Main todo functionality=====
  const [refresh, setRefresh] = React.useState(false);

  const handleAddTodo = (idx: any) => {
    console.log("index", idx);
    todoData[idx]["todo"] = [
      ...(todoData[idx]["todo"] ? todoData[idx]["todo"] : []),
      { TodoName: "", Checked: false },
    ];
    setTodoData(todoData);
    setRefresh(!refresh);
  };


       // =========post task=================
   const saveData = async (id: number, todo: any[]) => {
    
    const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('ToDo')/items(${id})`;

      const response: SPHttpClientResponse = await context.spHttpClient.post(url, SPHttpClient.configurations.v1, {
      headers: {
        Accept: "application/json;odata=nometadata",
        "Content-Type": "application/json;odata=nometadata",
        "IF-MATCH": "*",
        "X-HTTP-Method": "MERGE",
      },
      body: JSON.stringify({
        todo:JSON.stringify(todo)
      }),
    });
    await loadItems();;
  };

  // ========Delete Task========
  const deleteTodo= async(Itemindex:number,TodoTasks:any,TodoIndex:number)=>{
    //console.log("result",index,"result2",TodoTasks,"result3",TodoIndex)
    const updatedTodo =  TodoTasks.filter((_:any,index:any)=>index!==TodoIndex)
    console.log("updatedTodo",updatedTodo)
    saveData(Itemindex,updatedTodo)
  }

  return (
    <div className="parentTaskPannel">
      <div className="taskPannel">
        <div className="taskPannelText">My Tasks for 2026-06-02</div>
        {todoData?.map((item: any, key: any) => (
           item.ProjectStatus !=="Completed" &&
             <div className="parentTaskBox" key={key}>
            <div className={`taskBox ${item.ProjectStatus}`}>
              <div className="taskBoxHeadline">
                <div className="headlineText">
                  <div className="headlineProjectName">{item.ProjectName}</div>
                  <div className={`headlineReminder ${item.ProjectStatus}`}>
                    {item.ProjectStatus}
                  </div>
                  <div className="headlineStatus">{item.ProjectStatus}</div>
                </div>
                <div className="headlineButtons">
                  <CommandBarButton
                    className="editButton outerButton"
                    iconProps={editIcon}
                    text="Edit"
                    onClick={() => handleEdit(item)}
                    styles={{
                      icon: {
                        fontSize: 10,
                        color: "lightgray",
                      },
                    }}
                  />
                  <CommandBarButton
                    className="completedButton outerButton"
                    iconProps={completedIcon}
                    text="Completed"
                    disabled={item.ProjectStatus == "Completed"}
                    onClick={() => {
                      editProject(item.ID, "Completed");
                    }}
                    styles={{
                      icon: {
                        fontSize: 10,
                        color: "darkgreen",
                      },
                    }}
                  />
                  <CommandBarButton
                    className="deleteButton outerButton"
                    iconProps={deleteIcon}
                    text="Delete"
                    onClick={() => handleDelete(item.ID)}
                    styles={{
                      icon: {
                        fontSize: 10,
                        color: "darkred",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="taskBoxStatus ">
                <div className="projectName statusInfo">{item.ProjectCode}</div>
                <div className="projectUser statusInfo">{item.UserName}</div>
                <div className="projectEmail statusInfo">{item.UserEmail}</div>
                <div className="projectStatus statusInfo">
                  {item.Priority} priority
                </div>
              </div>
              <div className="taskBoxPannels">
                <div className="statusPannelDiv">
                  <Dropdown
                    className="statusPannel"
                    selectedKey={item.ProjectStatus}
                    // selectedKey={selectedItem ? selectedItem.key : undefined}
                    // eslint-disable-next-line react/jsx-no-bind
                    //onChange={onChange}
                    placeholder="Select an option"
                    options={dropdownControlledProjectStatus}
                    styles={dropdownStyles}
                    onChange={(_, option) => {
                      if (option) {
                        editProject(item.ID, option.key.toString());
                      }
                    }}
                  />
                </div>

                <TextField
                  className="startDatePannel"
                  readOnly
                  value={`Start: ${moment(item.StartDate).format("YYYY-MM-DD")}`}
                />
                <TextField
                  className="endDatePannel"
                  readOnly
                  value={`due: ${moment(item.DueDate).format("YYYY-MM-DD")}`}
                />

                <TextField
                  className="todayHoursPannel"
                  readOnly
                  value={`Today hours: ${item.Hours}`}
                />
              </div>
              <div className="toDoSection">
                <div className="toDoSectionTopDiv">
                  <div className="toDoSectionTopLeftDiv">
                    <IconButton
                      iconProps={{ iconName: "CheckList" }}
                      title="CheckList"
                      ariaLabel="CheckList"
                    />
                    Todo
                  </div>
                  <CommandBarButton
                    className="toDoSectionAddButton"
                    iconProps={addIcon}
                    text="Add Todo"
                    styles={{
                      icon: {
                        fontSize: "10px",
                        color: "black",
                      },
                    }}
                    onClick={() => {
                      handleAddTodo(key);
                    }}
                  />
                </div>

                {item?.todo?.length === 0 ? (
                  <div className="toDoSectionBottomDiv">
                    No tado added for this task
                  </div>
                ) : (
                  // console.log(item.todo)

                  item?.todo?.map((todoitem: any,index: number) => (
                    <div className="toDoSectionTodoTaskDiv">
                      <Checkbox
                        className="todoTaskCheckbox"
                        checked={todoitem.Checked}
                        onChange={async() => {
                          todoitem.TodoName == ""
                            ? toggleHideDialog()
                            : (todoitem.Checked = true,
                               await saveData(item.ID,item.todo)
                               );
                           
                          setRefresh(!refresh);
                        }}
                      />
                      <TextField
                        className="todoTaskTextField"
                        value={todoitem.TodoName}
                        disabled={todoitem.Checked}
                        onChange={(_, text: any) => {
                          todoitem.TodoName = text || "";
                          console.log(todoitem.TodoName);
                          setRefresh(!refresh);
                        }}
                        onKeyDown={async(e)=>{
                          if(e.key == "Enter"){
                              await saveData(item.ID,item.todo)                          
                          }
                        }}
                      />
                      <IconButton iconProps={{ iconName: 'Delete' }} title="Delete" ariaLabel="Delete" onClick={()=>deleteTodo(item.ID,item.todo,index)} />

                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
         
        ))}
      </div>
      <Dialog
        hidden={hideDeleteDialog}
        onDismiss={toggleDeleteDialog}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Delete Item",
          subText: "Are you sure you want to delete this item?",
        }}
      >
        <DialogFooter>
          <PrimaryButton
            text="Yes"
            onClick={async () => {
              if (selectedId !== null) {
                await deleteItem(selectedId);
              }
              toggleDeleteDialog();
            }}
          />
          <DefaultButton text="No" onClick={toggleDeleteDialog} />
        </DialogFooter>
      </Dialog>
      <Form
        context={context}
        editData={editData}
        setTodoData={setTodoData}
        hideDialog={hideEditDialog}
        toggleHideDialog={toggleEditDialog}
      />
      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        // modalProps={modalProps}
      >
        <DialogFooter>
          <DefaultButton onClick={toggleHideDialog} text="Close" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default TaskPannel;
