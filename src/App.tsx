import React, { Suspense } from "react";
import './Styles/global.scss'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ErrorBoundary from "./ErrorBoundaries"
import { useTheme } from "./hooks/useTheme";

const Main = React.lazy(() => import("./components/main"));

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useTheme(); // Initialize theme
  return <>{children}</>;
};

function App() {
  return (
    <Suspense fallback={<div className="loader">Loading...</div>}>
      <ErrorBoundary>
        <ThemeProvider>
          <ToastContainer toastClassName="toast" />
          <Main/>
        </ThemeProvider>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
