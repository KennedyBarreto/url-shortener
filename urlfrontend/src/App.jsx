import "bootstrap/dist/css/bootstrap.min.css";
import AddUrlComponent from "./components/AddUrlComponent";
import FooterComponent from "./components/FooterComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    
    <div className="App">
      <AddUrlComponent />
      <ToastContainer theme="colored"/>
      <FooterComponent/>
    </div>
  );
}

export default App;