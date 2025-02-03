import Signup from "./components/SignUp/Signup";
import { useContext } from "react";
import AuthContext from "./components/Store/auth-context";
import Expense from "./components/Pages/Expense";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import ProfileForm from "./components/Pages/ProfileForm";
import { BrowserRouter } from "react-router-dom";
import ForgotPassword from "./components/Pages/ForgotPassword";
import { useSelector } from "react-redux";
import Premium from "./components/Pages/Premium";

function App() {
  // const authCtx = useContext(AuthContext);
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <div style={{ justifyItems: "center" }}>
        <Switch>
          <Route path="/" exact>{isLoggedIn ? <Expense /> : <Signup />}</Route>
          {isLoggedIn && <Route path="/profile" component={ProfileForm} />}
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/premium" component={Premium} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
