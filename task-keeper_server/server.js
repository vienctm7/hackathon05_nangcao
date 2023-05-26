const express = require("express");

const server = express();

const port = 8000;

const connection = require("./connectionMySQL");

const bodyParser = require("body-parser");

const validateData = require("./midleware/checkValidate");

server.use(bodyParser.json());

const cors = require("cors");

server.use(cors());
// extended: cho phép sử dụng các phương thúc có sẵn của js
server.use(bodyParser.urlencoded({ extended: true }));

// API lấy tất cả bản ghi
server.get("/api/v1/taskkeeper", (req, res) => {
  // Câu lệnh truy vấn lấy thông tin tất cả bản ghi
  const queryString = "select * from taskkeeper";

  connection.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        results: result.length,
        data: result,
      });
    }
  });
});

// API lấy thông tin một bản ghi theo Id
server.get("/api/v1/taskkeeper/:id", (req, res) => {
  let { id } = req.params;
  // Câu lệnh truy vấn lấy thông tin tất cả bản ghi
  const queryString = `select * from taskkeeper where TaskkeeperId=${id}`;

  connection.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        data: result,
      });
    }
  });
});

// API xóa một bản ghi theo Id
server.delete("/api/v1/taskkeeper/:id", (req, res) => {
  let { id } = req.params;
  // Câu lệnh truy vấn lấy thông tin tất cả bản ghi
  const queryString = `delete from taskkeeper where TaskkeeperId=${id}`;

  connection.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        message: "Xóa thành công",
      });
    }
  });
});

// API thêm mới một bản ghi

server.post("/api/v1/taskkeeper", validateData, (req, res) => {
  // Lấy dữ liệu từ body
  console.log("first");
  console.log(req.body);
  const { Content, DueDate, Statuss, Assigned } = req.body;
  // Tạo một dữ liệu mới
  const newTaskkeeper = [Content, DueDate, Statuss, Assigned];

  // Viết câu lệnh query string
  const queryString =
    "insert into taskkeeper(Content, DueDate, Statuss, Assigned) values (?, ?, ?, ?);";

  connection.query(queryString, newTaskkeeper, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(201).json({
        status: "OK",
        message: "Thêm mới thành công",
      });
    }
  });
});

// API sửa thông tin một bản ghi theo Id
server.put("/api/v1/taskkeeper/:id", validateData, (req, res) => {
  // Lấy id từ params
  const { id } = req.params;

  // Lấy dữ liệu từ body
  const { Content, DueDate, Statuss, Assigned } = req.body;
  // Tạo một dữ liệu mới
  const newTaskkeeper = [Content, DueDate, Statuss, Assigned, id];

  // Viết câu lệnh query string
  const queryString =
    "update taskkeeper set Content=?, DueDate=?, Statuss=?, Assigned=? where TaskkeeperId=?";

  connection.query(queryString, newTaskkeeper, (err) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        message: "Cập nhật thành công",
      });
    }
  });
});

server.listen(port, (err, res) => {
  console.log(`http://localhost:${port}`);
});
