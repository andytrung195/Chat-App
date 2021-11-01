let socket = io();
function scrollToBottom() {
  let messages = document.querySelector("#messages").lastElementChild;
  messages.scrollIntoView();
}

socket.on("connect", function () {
  let searchQuery = window.location.search.substring(1);
  let params = JSON.parse(
    '{"' +
      decodeURI(searchQuery)
        .replace(/&/g, '","')
        .replace(/\+/g, " ")
        .replace(/=/g, '":"') +
      '"}'
  );
  console.log(params);
  socket.emit("join", params, function (err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      console.log("No error");
    }
  });
});

socket.on("disconnect", function () {
  console.log("disconnected from server");
});

socket.on("newMessage", function (message) {
  const formattedTime = moment(message.createdAt).format("LT");
  const template = document.querySelector("#message-template").innerHTML;
  const html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime,
  });

  const div = document.createElement("div");
  div.innerHTML = html;

  document.querySelector("#messages").appendChild(div);
  scrollToBottom();
});

socket.on("newLocationMessage", function (message) {
  const formattedTime = moment(message.createdAt).format("LT");
  console.log("newLocationMessage", message);
  const template = document.querySelector(
    "#location-message-template"
  ).innerHTML;
  console.log("newLocationMessage", message);
  const html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime,
  });

  const div = document.createElement("div");
  div.innerHTML = html;

  document.querySelector("#messages").appendChild(div);
});

document.querySelector("#submit-btn").addEventListener("click", function (e) {
  e.preventDefault();

  socket.emit(
    "createMessage",
    {
      from: "User",
      text: document.querySelector('input[name = "message"]').value,
    },
    function () {
      document.querySelector('input[name="message"]').value = "";
    }
  );
});

document
  .querySelector("#send-location")
  .addEventListener("click", function (e) {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your browser!");
    }

    navigator.geolocation.getCurrentPosition(
      function (position) {
        socket.emit("createLocationMessage", {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      function () {
        alert("Unable to fetch location!");
      }
    );
  });
