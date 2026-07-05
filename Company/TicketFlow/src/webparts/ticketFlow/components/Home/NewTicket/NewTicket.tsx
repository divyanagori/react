import React, { useState } from "react";
import "./NewTicket.scss";
import {
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  Panel,
  PanelType,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import ReactQuill from "react-quill";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { getTicketItems } from "../GlobleAPlCalls/GlobleAPlCalls";
import{updateItem} from "../GlobleAPlCalls/GlobleAPlCalls"
const NewTicket = ({ context ,isOpen, dismissPanel ,setItems }: any) => {
  const [teams, setTeams] = useState("");
  const [title, setTitle] = useState("");
  const [requestType, setRequestType] = useState("");
  const [services, setServices] = useState("");
  const [priorityType, setPriorityType] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");

  const TeamsOptions: IDropdownOption[] = [
    { key: "IT", text: "Information Technology" },
    { key: "HR", text: "Human Resources" },
  ];

  const ServicesData: { [key: string]: IDropdownOption[] } = {
    IT: [
      { key: "Hardware", text: "Hardware Issues" },
      { key: "Email", text: "Email Issues" },
      { key: "Office365", text: "Office 365" },
      { key: "Software", text: "Software Support" },
      { key: "Hardware2", text: "Hardware issues" },
    ],

    HR: [
      { key: "Training", text: "Training & Development" },
      { key: "Leave", text: "Leave Request" },
      { key: "Payroll", text: "Payroll Services" },
      { key: "Address1", text: "Address Change" },
      { key: "Address2", text: "Address Change" },
    ],
  };

  const RequestOptions: IDropdownOption[] = [
    { key: "QES", text: "Question" },
    { key: "REQ", text: "Request" },
    { key: "INC", text: "Incident" },
    { key: "PROB", text: "Problem" },
  ];

  const PriorityOptions: IDropdownOption[] = [
    { key: "HI", text: "High" },
    { key: "MED", text: "Medium" },
    { key: "LOW", text: "Low" },
    { key: "URG", text: "Urgent" },
  ];

  const dropdownStyles: Partial<IDropdownStyles> = {
    dropdown: { width: 300 },
  };
  const TramsFunction = (event: any, option: any): void => {
    if (option) {
      setTeams(option.key);
      setServices(""); // Reset services when team changes
    }
  };
  // ======================Post data to sharepoint list=========================
  const addTicket = async (context: any, ticketData: any) => {
    const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('NewTicket')/items`;

    const response: SPHttpClientResponse = await context.spHttpClient.post(
      url,
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: "application/json;odata=nometadata",
          "Content-Type": "application/json;odata=nometadata",
        },
        body: JSON.stringify(ticketData),
      },
    );

    if (!response.ok) {
      throw new Error(`Error creating ticket: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  };


  const saveData = async () => {
    if (
      !teams ||
      !services ||
      !title ||
      !requestType ||
      !priorityType ||
      !ticketDescription
    ) {
      alert("Please fill in all fields.");
      return;
    }
    const ticketData = {
      Title: title,
      Status: "Unassigned",
      Team: teams,
      Service: services,
      TicketDesc: ticketDescription,
      RequestType: requestType,
      PriorityType: priorityType,
    };

    const createdItem = await addTicket(context, ticketData);
    const TicketID = `SR#${1000 + createdItem.Id}-AD`;
    const updateData = {
       TicketID: TicketID
    }
    await updateItem(context, createdItem.Id,updateData);
    const updatedItems = await getTicketItems(context);
    setItems(updatedItems);
    alert("Ticket created successfully with ID: " + TicketID);

    setTeams("");
    setServices("");
    setTitle("");
    setRequestType("");
    setPriorityType("");
    setTicketDescription("");
    dismissPanel();
  };
  
  console.log("Teams:", teams);
  console.log("Services:", services);
  console.log("Title:", title);
  console.log("Request Type:", requestType);
  console.log("Priority Type:", priorityType);
  console.log("Ticket Description:", ticketDescription);
  return (
    <div>
      <div className="NewTicket">
       
      </div>
      <Panel
        type={PanelType.medium}
        onRenderHeader={() => (
          <div
            style={{
              width: "100%",
              padding: "5px",
              backgroundColor: "brown",
              color: "white",
              fontWeight: "600",
            }}
          >
            New Ticket
          </div>
        )}
        isOpen={isOpen}
        onDismiss={dismissPanel}
        closeButtonAriaLabel="Close"
      >
        <div className="panelContent">
          <div className="sidePanelTextField">
            <div className="rightSidePanelTextField">
              <div className="Teams textPanel">
                <label>Teams</label>
                <Dropdown
                  placeholder="Select an option"
                  options={TeamsOptions}
                  styles={dropdownStyles}
                  selectedKey={teams}
                  onChange={TramsFunction}
                />
              </div>
              <div className="Services textPanel">
                <label>Services</label>
                <Dropdown
                  placeholder="Select an option"
                  options={ServicesData[teams]}
                  styles={dropdownStyles}
                  selectedKey={services}
                  onChange={(e, option: any) => setServices(option?.key || "")}
                />
              </div>
              <div className="RequestType textPanel">
                <label>Request Type</label>
                <Dropdown
                  placeholder="Select an option"
                  options={RequestOptions}
                  styles={dropdownStyles}
                  selectedKey={requestType}
                  onChange={(e, option: any) =>
                    setRequestType(option?.key || "")
                  }
                />
              </div>
            </div>
            <div className="leftSidePanelTextField">
              <div className="Title textPanel">
                <label>Title</label>
                <TextField
                  value={title}
                  onChange={(e, value) => setTitle(value || "")}
                />
              </div>
              <div className="PriorityType textPanel">
                <label>Priority Type</label>
                <Dropdown
                  placeholder="Select an option"
                  options={PriorityOptions}
                  styles={dropdownStyles}
                  selectedKey={priorityType}
                  onChange={(e, option: any) =>
                    setPriorityType(option?.key || "")
                  }
                />
              </div>
            </div>
          </div>
          <div className="ticketDescriptionBox">
            <label>Ticket Description</label>
            <ReactQuill
              className="TicketDescription"
              theme="snow"
              value={ticketDescription}
              onChange={setTicketDescription}
            />
          </div>
          <div className="submitButton">
            <PrimaryButton
              text="Submit"
              onClick={saveData}
              allowDisabledFocus
            />
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default NewTicket;
