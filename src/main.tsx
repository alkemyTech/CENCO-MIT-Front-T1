
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./navigation/router.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import './assets/styles/global.css';
import './assets/styles/reset.css';

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
