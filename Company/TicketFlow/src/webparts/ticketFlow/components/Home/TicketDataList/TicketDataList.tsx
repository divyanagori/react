import React, { useEffect } from "react";
import "./TicketDataList.scss";
import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Dropdown,
  IColumn,
  SelectionMode,
} from "@fluentui/react";
import { getTicketItems } from "../GlobleAPlCalls/GlobleAPlCalls";
import NewTicket from "../NewTicket/NewTicket";
import { useBoolean } from "@fluentui/react-hooks";
import { updateItem } from "../GlobleAPlCalls/GlobleAPlCalls";

const TicketDataList = ({ context }: any) => {
  const [priority, setPriority] = React.useState("");
  const [items, setItems] = React.useState<any[]>([]);
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);
  const loadTicketItems = async () => {
    const data = await getTicketItems(context);
    console.log("Ticket data", data);
    setItems(data);
  };
  useEffect(() => {
    loadTicketItems();
  }, []);
  const columns: IColumn[] = [
    {
      key: "teams",
      name: "Teams",
      fieldName: "teams",
      minWidth: 80,
      maxWidth: 120,
      isResizable: true,
    },
    {
      key: "ticketId",
      name: "Ticket ID",
      fieldName: "ticketId",
      minWidth: 80,
      maxWidth: 120,
      isResizable: true,
    },
    {
      key: "titleDescription",
      name: "Title & Description",
      fieldName: "titleDescription",
      minWidth: 80,
      maxWidth: 120,
      isResizable: true,
      onRender: (item: any) => (
        <div>
          <div>{item.title}</div>

          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            dangerouslySetInnerHTML={{
              __html: item.description,
            }}
          />
        </div>
      ),
    },
    {
      key: "status",
      name: "Status",
      fieldName: "status",
      minWidth: 80,
      maxWidth: 120,
      isResizable: true,
    },
    {
      key: "priority",
      name: "Priority",
      fieldName: "priority",
      minWidth: 80,
      maxWidth: 120,
      isResizable: true,
      onRender: (item: any) => (
        <Dropdown
          // selectedKey={item?.priority || undefined}
          selectedKey={
            PriorityOptions.find((option) => option?.key === item.priority)
              ?.key || undefined
          }
          onChange={async(e, option:any) => {
            // const data = items?.findIndex(x => x.ID === item.ID);
            // if(data !== -1){
            //   let updatedOption = [...items];
            //   updatedOption[data].priority = option?.key;
            //   setItems(updatedOption);
            // }

            await updateItem(context,item.ID,{"PriorityType": option?.key})
            const updatedItems = await getTicketItems(context);
            setItems(updatedItems);
          }}  
          placeholder="Select an option"
          options={PriorityOptions}
        />
      ),
    },
    {
      key: "service",
      name: "Service",
      fieldName: "service",
      minWidth: 80,
      maxWidth: 120,
      isResizable: true,
    },
    {
      key: "requestType",
      name: "Request Type",
      fieldName: "requestType",
      minWidth: 80,
      maxWidth: 120,
      isResizable: true,
    },
    {
      key: "requester",
      name: "Requester",
      fieldName: "requester",
      minWidth: 80,
      maxWidth: 120,
      isResizable: true,
    },
    {
      key: "requesterEmail",
      name: "Requester Email",
      fieldName: "requesterEmail",
      minWidth: 80,
      maxWidth: 120,
      isResizable: true,
    },
    {
      key: "assignedTo",
      name: "Assigned To",
      fieldName: "assignedTo",
      minWidth: 80,
      maxWidth: 120,
      isResizable: true,
    },
    {
      key: "assignedToEmail",
      name: "Assigned To Email",
      fieldName: "assignedToEmail",
      minWidth: 80,
      maxWidth: 120,
      isResizable: true,
    },
  ];

  const PriorityOptions = [
    { key: "HI", text: "High" },
    { key: "MED", text: "Medium" },
    { key: "LOW", text: "Low" },
    { key: "URG", text: "Urgent" },
  ];
  // ======================Priority Dropdown=========================
  // const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();

  // const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
  //   setSelectedItem(item);
  // };

  return (
    <div className="ticketList">
      <div className="NewTicketButton">
        <DefaultButton text="Open panel" onClick={openPanel} />
      </div>
      {isOpen ? (
        <NewTicket
          context={context}
          isOpen={isOpen}
          dismissPanel={dismissPanel}
          setItems={setItems}
        />
      ) : null}
      <DetailsList
        items={items}
        columns={columns}
        selectionMode={SelectionMode.multiple}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        isHeaderVisible={true}
      />
    </div>
  );
};

export default TicketDataList;
