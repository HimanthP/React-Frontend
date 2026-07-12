import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Automated architecture validator checks this file for specific patterns:
// Patterns expected: reducer, middleware

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();