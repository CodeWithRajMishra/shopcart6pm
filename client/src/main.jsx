import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import store from './redux/store.jsx';
import {Provider} from "react-redux";
import LoginContext from './loginContext.jsx';
createRoot(document.getElementById('root')).render(
   <Provider store={store}>
      <LoginContext>
      <App />
      </LoginContext>
   </Provider>
)
