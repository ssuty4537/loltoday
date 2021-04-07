import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import InputTime from "routes/InputTime";
import ShowMembers from "routes/ShowMembers";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userData }) => {
  return (
    <Router>
      <Switch //여기 내부에 Route 와 path 정보를 넣어놓으면 된다
      >
        <Route exact path="/show">
          <ShowMembers />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <InputTime userData={userData} />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};
export default AppRouter;
