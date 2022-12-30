import { initiateSocketConnection } from "./socketHelper";

const isLoggedIn = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const loginUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("following", JSON.stringify(user.currentuser.following))
  initiateSocketConnection();
};

const logoutUser = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("following")

  initiateSocketConnection();
};

export { loginUser, isLoggedIn, logoutUser };
