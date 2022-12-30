import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route,Routes} from "react-router-dom";
import { Link } from "react-router-dom";
import FilesList from "./Filelist";
import Additem from "./Additem";
import Edititem from "./Edititem";
import Orderslist from "./Orderslist";
import Itemslist from "./Itemslist";
import Userslist from "./Userslist";
import Navbar1 from "./Navbar1"


export default function Adminscreen() {
  const userstate = useSelector((state) => state.loginUserReducer);
  const { user } = userstate;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.isAdmin) {
      
    }
  }, []);

  return (
    <div>
      {/* <div className="row justify-content-center p-3">
        <div className="col-md-12"> */}

          <Navbar1/>

          <Routes>
          {/* <Route path="/" element={<Userslist/>} exact/> */}
            <Route path = "/admin/list" element={<FilesList/>} />
            <Route path="/admin/userslist" element={<Userslist/>}  />
            <Route path="/admin/orderslist" element={<Orderslist/>}  />
            <Route path="/admin/itemslist" element={<Itemslist/>}  />
            <Route path="/admin/additem" element={<Additem/>} />
            <Route
              path="/admin/edititem/:itemid"
              component={Edititem}
              exact
            />
          </Routes>
        </div>
    //   </div>
    // </div>
  );
}
