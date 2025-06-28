import React, { useState } from 'react';
import Child from './child';

export const Parent = () => {
  const [inputs, setInputs] = useState([
    { input: '', role: 'Role 1', showRole: true, error: '', touched: false },
    { input: '', role: 'Role 1', showRole: false, error: '', touched: false }
  ]);

  return (
    <div style={{ padding: '20px' }}>
      <Child inputs={inputs} setInputs={setInputs} />
      <pre>{JSON.stringify(inputs, null, 2)}</pre>
    </div>
  );
};

export default Parent;