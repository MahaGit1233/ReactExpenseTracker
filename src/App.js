import Signup from "./components/SignUp/Signup";
import { useContext } from "react";
import AuthContext from "./components/Store/auth-context";
import Expense from "./components/Pages/Expense";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import ProfileForm from "./components/Pages/ProfileForm";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div style={{ justifyItems: "center" }}>
        {authCtx.isLoggedIn ? <Expense /> : <Signup />}
        {authCtx.isLoggedIn && <Switch>
          <Route path="/profile" component={ProfileForm} />
        </Switch>}
      </div>
    </BrowserRouter>
  );
};

export default App;
