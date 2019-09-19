import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default () => {
  const dispatch = useDispatch();
  const increase = useCallback(() => dispatch({ type: 'INCREASE' }), []);
  const decrease = useCallback(() => dispatch({ type: 'DECREASE' }), []);
  const count = useSelector((state) => state.count);

  return (
    <>
      <h3>
        Redux counter
      </h3>
      <br />
      <h3 className="count">{count}</h3>
      <div className="actions">
        <button type="button" onClick={decrease} className="btn">
          Decrease
        </button>
        <button type="button" onClick={increase} className="btn decrease">
          Increase
        </button>
      </div>
    </>
  );
};
