import { Outlet } from 'react-router';
import Header from '../components/header';
import { CssBaseline } from '@mui/material';

export default function AppLayout() {
  return (
    <div>
      <CssBaseline />

      <Header />
      <Outlet />
    </div>
  );
}
