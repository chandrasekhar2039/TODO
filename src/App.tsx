import ApplyTheme from "./components/applyTheme";
import './Styles/style.scss'
import Main from "./components/main"

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ApplyTheme>
      <ToastContainer toastClassName="toast" />
      <Main/>
    </ApplyTheme>
  );
}

export default App;
