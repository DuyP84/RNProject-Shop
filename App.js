import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/stores/store';
import TagManagementView from './navigation/TagManagementView';
import ItemCartView from './views/ItemCartView';


export default function App() {
  return (
    <Provider store={store}>
      <TagManagementView/>        
    </Provider>    
  );
}

