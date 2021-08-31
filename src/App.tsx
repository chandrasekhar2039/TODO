import React,{ Suspense } from "react";
import './Styles/style.scss'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ErrorBoundary from "./ErrorBoundaries"

const ApplyTheme = React.lazy(() => import("./components/applyTheme"));
const Main = React.lazy(() => import("./components/main"));




function App() {
  return (
    <Suspense fallback={<div className="loader">Loading...</div>}>
      <ErrorBoundary>
        <ApplyTheme>
          <ToastContainer toastClassName="toast" />
          <Main/>
        </ApplyTheme>
      </ErrorBoundary>
      </Suspense>
  );
}

export default App;
