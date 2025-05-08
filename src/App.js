import Signup from "./components/SignUp/Signup";
import Expense from "./components/Pages/Expense";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import ForgotPassword from "./components/Pages/ForgotPassword";
import { useSelector } from "react-redux";
import Premium from "./components/Pages/Premium";
import Profile from "./components/Pages/Profile";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <div style={{ justifyItems: "center" }}>
        {isLoggedIn && <Route path="/profile" component={Profile} />}
        <Switch>
          <Route path="/" exact>{isLoggedIn ? <Expense /> : <Signup />}</Route>
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/premium" component={Premium} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
