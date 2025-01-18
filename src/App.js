import Signup from "./components/SignUp/Signup";
import { useContext } from "react";
import AuthContext from "./components/Store/auth-context";
import Expense from "./components/Pages/Expense";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import ProfileForm from "./components/Pages/ProfileForm";
import { BrowserRouter } from "react-router-dom";
import ForgotPassword from "./components/Pages/ForgotPassword";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div style={{ justifyItems: "center" }}>
        <Switch>
          <Route path="/" exact>{authCtx.isLoggedIn ? <Expense /> : <Signup />}</Route>
          {authCtx.isLoggedIn && <Route path="/profile" component={ProfileForm} />}
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
