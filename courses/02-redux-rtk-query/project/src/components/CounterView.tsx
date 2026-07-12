import { decrement, increment } from '../store/slices/counterSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const CounterView = () => {
  const count = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Counter</h2>

      <p data-testid="counter-value">{count}</p>

      <button
        data-testid="increment-btn"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>

      <button
        data-testid="decrement-btn"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
    </div>
  );
};

export default CounterView;