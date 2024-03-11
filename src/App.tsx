import React, { useState } from 'react';
import Building from './Building';

const App: React.FC = () => {
  //Default array is the example from the excersise
  //Can be modified or cleared
  const [heights, setHeights] = useState<number[]>([1,8,6,2,5,4,8,3,7]);
  const [input, setInput] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleAddBuilding = () => {
    setHeights([...heights, Number(input)])
    setInput('');
  }

  const handleClear = () => {
    setHeights([]);
  };

  return (
    <div>
      <form>
        <label>
          Enter a building height:
          <input type="number" value={input} onChange={handleChange} />
        </label>
        <button type="button" onClick={handleAddBuilding}>Add Building</button>
        <button type="button" onClick={handleClear}>Clear Buildings</button>
      </form>
      <p>Buildings height: {heights.join(',')}</p>
      {heights.length && <Building height={heights} />}
    </div>
  );
};

export default App;
