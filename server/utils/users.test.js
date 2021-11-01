const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: "1",
        name: "sda",
        room: "Arsenal",
      },
      {
        id: "2",
        name: "VA",
        room: "ArCsenal",
      },
      {
        id: "3",
        name: "asdfvbvv",
        room: "io",
      },
    ];
  });

  it("should add new user", () => {
    let users = new Users();
    let user = {
      id: "asdfsdafsad",
      name: "Trung",
      room: "Arsenal",
    };

    let reUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });
  it("should return names for arsenal", () => {
    let userList = users.getUserList("Arsenal");

    expect(userList).toEqual(["sda"]);
  });
  it("should return names for ArCsenal", () => {
    let userList = users.getUserList("ArCsenal");

    expect(userList).toEqual(["VA"]);
  });
  it("should return names for io", () => {
    let userList = users.getUserList("io");

    expect(userList).toEqual(["asdfvbvv"]);
  });

  it("should find user", () => {
    let userID = "2",
      user = users.getUser(userID);

    expect(user.id).toBe(userID);
  });
  it("should not find user", () => {
    let userID = "150",
      user = users.getUser(userID);

    expect(user).toBeUndefined();
  });

  it("should remove a user", () => {
    let userID = "1",
      user = users.removeUser(userID);
    expect(user.id).toBe(userID);
    expect(users.users.length).toBe(2);
  });

  it("should not remove a user", () => {
    let userID = "10123",
      user = users.removeUser(userID);
    expect(user).toBeUndefined();
    expect(users.users.length).toBe(3);
  });
});
