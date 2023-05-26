// Hàm kiểm tra các trường không được để trống

const checkIsEmpty = (field) => {
  if (field === undefined || field === null || field === "") {
    return true;
  } else {
    return false;
  }
};

// Midleware kiểm tra dữ liệu đầu vào
const validateData = (req, res, next) => {
  // Lấy content và points từ phần người dùng gửi lên
  console.log(req.body);
  const { Content, DueDate, Statuss, Assigned } = req.body;
  console.log(Content, DueDate, Statuss, Assigned);
  if (checkIsEmpty(Content)) {
    return res.status(404).json({
      message: "Nội dung không được phép để trống",
    });
  }

  if (Content.length < 10) {
    return res.status(404).json({
      message: "Nội dung không được dưới 10 ký tự",
    });
  }

  if (checkIsEmpty(DueDate)) {
    return res.status(404).json({
      message: "ngày không được phép để trống",
    });
  }
  if (checkIsEmpty(Statuss)) {
    return res.status(404).json({
      message: "trạng thái không được phép để trống",
    });
  }
  if (checkIsEmpty(Assigned)) {
    return res.status(404).json({
      message: "người gửi không được phép để trống",
    });
  }

  next();
};

module.exports = validateData;
