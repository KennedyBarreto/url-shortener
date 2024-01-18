import "bootstrap/dist/css/bootstrap.min.css";
import AddUrlComponent from "./components/AddUrlComponent";
import FooterComponent from "./components/FooterComponent";
import InfoComponent from "./components/InfoComponent";
import StepsComponent from "./components/StepsComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollButton from "./components/ScrollButton";

function App() {
  return (
    
    <div className="App">
      <AddUrlComponent />
      <InfoComponent/>
      <StepsComponent/>
      <ToastContainer theme="colored"/>
      <FooterComponent/>
      <ScrollButton/>
    </div>
  );
}

export default App;