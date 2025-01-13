import Signup from "./components/Signup";
import { useContext } from "react";
import AuthContext from "./components/auth-context";
import Expense from "./components/Expense";

function App() {
  const authCtx = useContext(AuthContext);

  return (
      <div style={{ justifyItems: "center" }}>
        {authCtx.isLoggedIn?<Expense />:<Signup />}
      </div>
  );
};

export default App;
