import "@mui/material";
import "react-icons";
import "react-icons/bi";
import "react-icons/md";
import "react-icons/bs";
import "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import "bootstrap";

import {
  BrowserRouter,
  Route,
  Routes,
  useParams,
  useSearchParams,
} from "react-router-dom";
import theme from "./theme";
import "./App.css";

import PostView from "./components/views/PostView";
import FilesList from "./screens/Filelist";
import Additem from "./screens/Additem";
import Userslist from "./screens/Userslist";
import Orderslist from "./screens/Orderslist";
import Itemslist from "./screens/Itemslist";
import Edititem from "./screens/Edititem";
import CreatePostView from "./components/views/CreatePostView";
import ProfileView from "./components/views/ProfileView";
import LoginView from "./components/views/LoginView";
import SignupView from "./components/views/SignupView";
import ExploreView from "./components/views/ExploreView";
import PrivateRoute from "./components/PrivateRoute";
import SearchView from "./components/views/SearchView";
import MessengerView from "./components/views/MessengerView";
import Homescreen from "./screens/Homescreen";
import Adminscreen from "./screens/Adminscreen";
import { initiateSocketConnection, socket } from "./helpers/socketHelper";
import { useEffect } from "react";
import { BASE_URL } from "./config";
import { io } from "socket.io-client";

function App() {
  initiateSocketConnection();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route path="/admin" element={<Userslist />} />
            <Route path="/admin/list" element={<FilesList />} />
            <Route path="/admin/userslist" element={<Userslist />} />
            <Route path="/admin/orderslist" element={<Orderslist />} />
            <Route path="/admin/itemlist" element={<Itemslist />} />
            <Route path="/admin/additem" element={<Additem />} />
            <Route path="/admin/edititem/:itemid" element={<Edititem />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ExploreView />
                </PrivateRoute>
              }
            />
            <Route path="/posts/:id" element={<PostView />} />
            <Route
              path="/posts/create"
              element={
                <PrivateRoute>
                  <CreatePostView />
                </PrivateRoute>
              }
            />
            <Route
              path="/messenger"
              element={
                <PrivateRoute>
                  <MessengerView />
                </PrivateRoute>
              }
            />
            <Route path="/buy" element={<Homescreen />} />
            <Route path="/search" element={<SearchView />} />
            <Route path="/users/:id" element={<ProfileView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/signup" element={<SignupView />} />
            <Route path="/admin" element={<Adminscreen />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
