import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CurUsersStore from './store/CurUsersStore';
import QueuesStore from './store/QueuesStore';
import UserStore from './store/UserStore';


export const Context = createContext(null)


ReactDOM.render(
    <Context.Provider value={{
      user: new UserStore(),
      queues: new QueuesStore(),
      curUsers: new CurUsersStore()
    }}>
      <App />
    </Context.Provider>,

  document.getElementById('root')
);

