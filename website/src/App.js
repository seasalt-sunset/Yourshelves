import logo from './logo.svg';
import './App.css';
import SignUp from './pages/components/SignUp';
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";

function App() {
  return (
    <>
    <SignUp/>
    <ToastContainer position="top-center"/>
    </>
  );
}

export default App;
