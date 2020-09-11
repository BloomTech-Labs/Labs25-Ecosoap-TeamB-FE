import React from 'react';
import './Map.css';

import { getExampleData } from '../../../api';

import { List } from '../../common';
import RenderExampleListPage from './RenderExampleListPage';

// Here is an example of using our reusable List component to display some list data to the UI.
const ExampleList = () => {
  return (
    <div>
      <h1>Kaban</h1>
      <iframe
        src="https://api.mapbox.com/styles/v1/vlahorba/ckeyop2vy09aq19mvsb38yg2v.html?fresh=true&title=view&access_token=pk.eyJ1IjoidmxhaG9yYmEiLCJhIjoiY2s4ZjQ0d20yMDBlYTNscW9lZG0zNXU5ayJ9.ZQKJxY3FUYlxPyCuOqOxMA"
        frameborder="0"
      ></iframe>
    </div>
  );
};

export default ExampleList;
