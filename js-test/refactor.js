//ไม่ต้องทำการ Refactore function นี้
function User() {
  return {
    insert: function (data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ message: "saved", data: data });
        }, 1000);
      });
    },
  };
}

// Refactore เฉพาะ function นี้เท่านั้น
function insertUserToDB(data) {
  var result = User.insert(data);
  return data.message == "saved"
    ? { status: true, result }
    : { status: false, result };
}

function getToDoList(tasksId) {
  var togoList = [];
  tasksId.map(function (id) {
    var result = fetch(
      "https://jsonplaceholder.typicode.com/todos/" + taskId
    ).then((response) => response.json());
    var id = result.id;
    var userId = result.userId;
    var title = result.title;
    var remark = "Title " + title + "Write by " + userId;
    var status = result.completed ? "Complete" : "Not complete";
    var task = {
      id,
      userId,
      title,
      remark,
      status,
    };
    var savedTodo = insertUserToDB(task);
    togoList.push(savedTodo);
  });
  return togoList;
}

var tasksId = [1, 3, 5, 7, 9, 11, 13];
var togoList = getToDoList(tasksId);
