import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import QueueStore from './store/QueueStore';
import UserStore from './store/UserStore';


export const Context = createContext(null)


ReactDOM.render(
    <Context.Provider value={{
      user: new UserStore(),
      queue: new QueueStore()
    }}>
      <App />
    </Context.Provider>,

  document.getElementById('root')
);

