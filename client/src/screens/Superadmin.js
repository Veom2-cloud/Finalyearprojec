import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route,Routes} from "react-router-dom";
import { Link } from "react-router-dom";
import Userslist from "./Userslist";
import Navbar2 from "./Navbar2"
import Useredit from "./Useredit"


export default function Superadmincreen() {
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

          <Navbar2/>

          <Routes>
          {/* <Route path="/" element={<Userslist/>} exact/> */}
           
            <Route path="/superadmin/userslist" element={<Userslist/>}  />
            <Route
              path="/superadmin/edituser/:id"
              component={Useredit}
              exact
            />
          </Routes>
        </div>
    //   </div>
    // </div>
  );
}
