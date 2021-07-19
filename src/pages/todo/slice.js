import { createSlice } from '@reduxjs/toolkit'
import moment from "moment";
const dateFormat = "YYYY/MM/DD";

var initialState = {
  data: [
    {
      title: "Default Task 1",
      description:
        "This property provide an additional time selection. When showTime is an Object",
      priority: "Low",
      startDate: moment(new Date(), dateFormat),
      endDate: moment(new Date(), dateFormat),
      assignee: "Ahsan",
      status: "in progress",
      taskID: Math.random(),
    },
  ],
  users: [
    {
      name: "shoaib",
      id: 1,
    },
    {
      name: "ahsan",
      id: 2,
    },
    {
      name: "yasir",
      id: 3,
    },
    {
      name: "unassigned",
      id: 0,
    },
  ]
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
    },
    onAdd: (state, action) => {
      state.data = action.payload;
      localStorage.setItem('@data', JSON.stringify(state.data))
    },
    onDel: (state, action) => {
      let temp = [...state.data];
      temp.splice(action.payload, 1);
      state.data = temp
      localStorage.setItem('@data', JSON.stringify(state.data))

    },
    onEdit: (state, action) => {
      console.log(action.payload, ' asdasdsadas')
      let temp = [...state.data].map((res) => {
        return { ...res };
      });
      temp.map((res, i) => {
        if (res.taskID == action.payload.selectedTask.taskID) {
          temp[i] = action.payload.values;
        }
      });
      state.data = temp;
      localStorage.setItem('@data', JSON.stringify(state.data))
    },
    onSearch: (state, action) => {
      if (action.payload.length == 0) {
        let local = localStorage.getItem('@data')
        state.data = JSON.parse(local).map(res => { return { ...res, endDate: moment(new Date(), dateFormat), startDate: moment(new Date(), dateFormat) } });
        return
      }
      const lowercasedFilter = action.payload.toLowerCase();
      state.data = state.data.filter(item => {
        return item.title.toLowerCase().includes(lowercasedFilter)
      })
    }
  },
})

// Action creators are generated for each case reducer function
export const { onAdd, onDel, onEdit, onSearch, getData } = todoSlice.actions

export default todoSlice.reducer