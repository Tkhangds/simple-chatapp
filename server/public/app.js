// Uncomment this when running on local
// const socket = io("ws://localhost:3000");
// Uncomment this when running on production
const socket = io("https://simple-chatapp-jhpd.onrender.com");

const msgInput = document.querySelector("#message");
const nameInput = document.querySelector("#name");
const roomInput = document.querySelector("#room");

const activity = document.querySelector(".activity");
const userList = document.querySelector(".user-list");
const roomList = document.querySelector(".room-list");

const chatDislay = document.querySelector(".chat-display");

function sendMessage(e) {
  e.preventDefault();
  if (msgInput.value && nameInput.value && roomInput.value) {
    socket.emit("message", {
      text: msgInput.value,
      name: nameInput.value,
    });
    msgInput.value = "";
  }
  msgInput.focus();
}

function enterRoom(e) {
  e.preventDefault();
  if (nameInput.value && roomInput.value) {
    socket.emit("enterRoom", {
      name: nameInput.value,
      room: roomInput.value,
    });
  }
}

// Add event listener for funtion

document.querySelector(".form-msg").addEventListener("submit", sendMessage);
document.querySelector(".form-join").addEventListener("submit", enterRoom);

// Listen for input

msgInput.addEventListener("keypress", () => {
  socket.emit("activity", nameInput.value);
});

// Listen for messages
socket.on("message", (data) => {
  activity.textContent = "";
  const { name, text, time } = data;
  const li = document.createElement("li");
  li.className = "post";
  if (name === nameInput.value) {
    li.className = "post post--right";
  }
  if (name !== nameInput.value && name !== "Admin") {
    li.className = "post post--left";
  }
  if (name !== "Admin") {
    li.innerHTML = `<div class="post__header ${
      name === nameInput.value ? "post__header--user" : "post__header--reply"
    }">
    <span class="post__header--name"> ${name} </span>
    <span class="post__header--time"> ${time} </span>
    </div>
    <div class="post__text">${text}</div>`;
  } else {
    li.innerHTML = `<div class="post__text">${text}</div>`;
  }
  document.querySelector(".chat-display").appendChild(li);
  chatDislay.scrollTop = chatDislay.scrollHeight;
});

let activityTimer;

socket.on("activity", (name) => {
  activity.textContent = `${name} is typing...`;

  // Clear after 3 second

  clearTimeout(activityTimer);

  activityTimer = setTimeout(() => (activity.textContent = ""), 3000);
});

socket.on("userList", ({ users }) => {
  showUser(users);
});

socket.on("roomList", ({ rooms }) => {
  showRooms(rooms);
});
cl;
function showUser(users) {
  userList.textContent = "";
  if (users) {
    userList.innerHTML = `
      <em>Users in ${roomInput.value}: </em>`;
    users.forEach((user, i) => {
      userList.textContent += ` ${user.name}`;
      if (users.length > 1 && i !== users.length - 1) {
        userList.textContent += ",";
      }
    });
  }
}

function showRooms(rooms) {
  roomList.textContent = "";
  if (rooms) {
    roomList.innerHTML = "<em>Active Rooms:</em>";
    rooms.forEach((room, i) => {
      roomList.textContent += ` ${room}`;
      if (rooms.length > 1 && i !== rooms.length - 1) {
        roomList.textContent += ",";
      }
    });
  }
}
