import React from 'react';

const Type = props => {
  return (
    <div>
      {/* mock elements to figure out apollo */}
      <h2>Type Comp</h2>
      <div>
        {console.log('Type Props', props)}
        <p>{props.type.id} </p>
        <p>{props.type.name} </p>
      </div>
    </div>
  );
};

export default Type;
