import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import Fade from "react-reveal/Fade";
import moment from "moment";
import { Popconfirm } from "antd";

const TaskItem = (props) => {
  const { value, key, OnDelete, OnEdit } = props;

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      OnDelete();
      setVisible(false);
      setConfirmLoading(false);
    }, 300);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Fade key={key} top>
        <div className="task-items">
          <div className="title">
            <h1>{value.title}</h1>
            <div className="icons">
              <Popconfirm
                title="Delete Task ?"
                visible={visible}
                onConfirm={handleOk}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={handleCancel}
              >
                <RiDeleteBinLine
                  onClick={showPopconfirm}
                  size={"24px"}
                  className="del"
                />
              </Popconfirm>
              <FiEdit onClick={OnEdit} className="edit" size={"20px"} />
            </div>
            <div className="status">{value.status}</div>
          </div>
          <div className="assignee">
            <b className="user-name">
              {value.assignee.split("")[0] + value.assignee.split("")[1]}
            </b>
          </div>
          <div className="items">
            <p className="description">{value.description}</p>
            <div className="status">
              <span>
                {moment(value.startDate).format("DD/MM/YYYY")} TO{" "}
                {moment(value?.endDate).format("DD/MM/YYYY")}
              </span>
              <div className={value.priority}>{value.priority}</div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default TaskItem;
