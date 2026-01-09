import { useDispatch, useSelector } from 'react-redux';
import { authActions, type RootState } from '../store';
import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';

export default function AuthLayout() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  if (!isLoggedIn) return <Navigate to='/auth' />;

  return <Outlet />;
}
