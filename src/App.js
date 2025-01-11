import { Button } from "react-bootstrap";
import Signup from "./components/Signup";

function App() {
  return (
    <div style={{justifyItems:"center"}}>
      <Signup />
      <Button style={{marginTop:"5%"}} variant="outline-dark">Have an account? Login</Button>
    </div>
  );
}

export default App;
