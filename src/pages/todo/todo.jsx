import React, { useEffect, useState, useRef } from "react";
import "./todo.scss";
import { Input, Form, DatePicker, Button, Select, message, Empty } from "antd";
import moment from "moment";
import * as Rules from "../../utils/rules";
import TaskItem from "./taskItem";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useSelector, useDispatch } from 'react-redux';
import {onAdd, onDel, onEdit, onSearch, getData} from './slice';
const { TextArea } = Input;
const { Option } = Select;

const dateFormat = "YYYY/MM/DD";

const Todo = () => {
  const [addTask, setAddTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const todo = useSelector((state) => state.todo.data)
  const users = useSelector((state) => state.todo.users)

  const dispatch = useDispatch()
 
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    if (selectedTask.endDate) {
      setAddTask(true);
    }
  }, [selectedTask]);

  const onFinish = (values) => {
    if (selectedTask.title) {
      setAddTask(false);
      dispatch(onEdit({selectedTask, values}))
      setSelectedTask({});
      return message.success("Task Edited Succecfuly");
    }
    dispatch(onAdd([...todo, values]))
    setAddTask(false);
    return message.success("New Task Created");
  };

  const OnDelete = (index) => {
    dispatch(onDel(index))
    return message.success("Task Deleted Succecfuly");
  };

  const _OnEdit = (value) => {
    setSelectedTask(value);
  };

  const handleSearch = (x) =>{
    console.log(x.target.value, ' sadasd')
    dispatch(onSearch(x.target.value))
  }

  useEffect(()=>{
    let local = localStorage.getItem('@data')
    if(local){
      console.log(local, ' locallocal')
      dispatch(getData(JSON.parse(local)))
    }
  },[])

  return (
    <>
      {" "}
      <div className="add-tasks-header">
        <div className="add-task">
        <Button
          onClick={() => {
            form.resetFields();
            setAddTask(!addTask);
          }}
        >
          Add Task
        </Button>
        <input placeholder="Search by title" onChange={handleSearch} />

        </div>
      </div>
      <div className={`main-container`}>
        <div className="width-controler">
          <div
            className={`add-tast-wrapper-hide ${
              addTask && "add-tast-wrapper-show"
            }`}
          >
            <Form
              className="c-form"
              layout="vertical"
              initialValues={selectedTask}
              form={form}
              name=""
              onFinish={onFinish}
            >
              <HiArrowNarrowLeft
                onClick={() => setAddTask(false)}
                className="back-icon"
              />

              <Form.Item
                label="Title"
                required
                rules={Rules.titleRule}
                name="title"
              >
                <Input placeholder="Title" />
              </Form.Item>
              <Form.Item
                label="Description"
                required
                rules={Rules.descriptionRule}
                name="description"
              >
                <TextArea
                  placeholder="Description"
                  autoSize={{ minRows: 2, maxRows: 6 }}
                />
              </Form.Item>
              <Form.Item
                label="Start Date"
                rules={Rules.dateRule}
                name="startDate"
              >
                <DatePicker />
              </Form.Item>
              <Form.Item label="End Date" required rules={Rules.endDateRule} name="endDate">
                <DatePicker defaultValue={""} />
              </Form.Item>

              <Form.Item
                label="Priority"
                rules={Rules.priorityRule}
                required
                name="priority"
              >
                <Select placeholder="Priority">
                  <Option value="Low">Low</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="High">High</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Status (optional)"
                name="status"
              >
                <Select placeholder="Status">
                  <Option value="Todo">Todo</Option>
                  <Option value="Inprogress">Inprogress</Option>
                  <Option value="Completed">Completed</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Assignee" required rules={Rules.assigneeRule} name="assignee">
                <Select placeholder="Assignee">
                  {users.map((res, i) => (
                    <Option value={res.name}>{res.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="tast-items-wrapper">
            {!todo?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            {todo?.map((value, key) => (
              <TaskItem
                OnEdit={() => _OnEdit(value)}
                OnDelete={() => OnDelete(key)}
                value={value}
                key={key}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
