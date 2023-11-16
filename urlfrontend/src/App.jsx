import "bootstrap/dist/css/bootstrap.min.css";
import AddUrlComponent from "./components/AddUrlComponent";
import ViewUrlComponent from "./components/ViewUrlComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    
    <div className="App-container">
      
      <AddUrlComponent />
      <ViewUrlComponent />
      <ToastContainer theme="colored"/>
    </div>
  );
}

export default App;