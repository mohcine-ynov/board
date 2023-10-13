import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TaskForm from './components/taskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>main page</div>,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/tasks",
      element: <TaskForm />,
    },
    {
      path: "/tasks-list",
      element: <TaskList />,
    }
    
  ]);

  const rootElement = document.getElementById("root");
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );
  }
}

export default App
