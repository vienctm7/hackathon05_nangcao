import React, { useState, useEffect } from "react";
import "./HomeTask.css";
import axios from "axios";

function HomeTask() {
  const [taskkeeper, setTaskkeeper] = useState([]);
  const [Content, setContent] = useState("");
  const [DueDate, setDueDate] = useState("");
  const [Statuss, setStatuss] = useState("");
  const [Assigned, setAssigned] = useState("");

  const handleContentChange = (e) => {
    setContent(e.target.value);
    console.log(e.target.value);
  };
  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
    console.log(e.target.value);
  };
  const handleStatussChange = (e) => {
    setStatuss(e.target.value);
    console.log(e.target.value);
  };
  const handleAssignedChange = (e) => {
    setAssigned(e.target.value);
    console.log(e.target.value);
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    let formdata = { Content, DueDate, Statuss, Assigned };
    console.log(formdata);
    await axios
      .post("http://localhost:8000/api/v1/taskkeeper", formdata)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  // Gọi api hiển thị danh sách taskkeeper
  const loadData = async () => {
    await axios
      .get("http://localhost:8000/api/v1/taskkeeper")
      .then((res) => {
        setTaskkeeper(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);
  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:8000/api/v1/taskkeeper/${id}`)
      .then((res) => {
        if (res.data.status === "OK") {
          loadData();
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(taskkeeper.data);
  return (
    <div>
      <div className="form-input">
        <form>
          <input type="text" value={Content} onChange={handleContentChange} />
          <input type="date" value={DueDate} onChange={handleDueDateChange} />
          <input type="text" value={Statuss} onChange={handleStatussChange} />
          <input type="text" value={Assigned} onChange={handleAssignedChange} />
          <button type="submit" onClick={(e) => handleAdd(e)}>
            Submit
          </button>
        </form>
      </div>
      <div className="table-infor">
        <div className="table-infor">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Content</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Assigned to</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {taskkeeper.data?.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task.Content}</td>
                  <td>{task.DueDate}</td>
                  <td>{task.Statuss}</td>
                  <td>{task.Assigned}</td>
                  <td>
                    <button>Edit</button>
                    <button onClick={() => handleDelete(task.TaskkeeperId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomeTask;
