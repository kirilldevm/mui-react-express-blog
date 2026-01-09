import React, { useState } from 'react';
import { AppBar, Tab, Tabs, Toolbar } from '@mui/material';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { type RootState } from '../store';

const links = ['home', 'diaries', 'auth'];
const loggedInLinks = ['home', 'diaries', 'add', 'profile'];

const Header: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const [value, setValue] = useState<number>(0);

  return (
    <AppBar sx={{ bgcolor: '#fff', position: 'sticky' }}>
      <Toolbar>
        <ModeOfTravelIcon sx={{ color: 'black' }} />

        <Tabs
          value={value}
          onChange={(_, val) => setValue(val)}
          sx={{ ml: 'auto', textDecoration: 'none' }}
        >
          {isLoggedIn
            ? loggedInLinks.map((link) => (
                <Tab
                  component={Link}
                  to={`/${link === 'home' ? '' : link}`}
                  sx={{
                    textDecoration: 'none',
                    ':hover': {
                      textDecoration: 'underline',
                      textUnderlineOffset: '18px',
                    },
                  }}
                  key={link}
                  label={link}
                />
              ))
            : links.map((link) => (
                <Tab
                  component={Link}
                  to={`/${link === 'home' ? '' : link}`}
                  sx={{
                    textDecoration: 'none',
                    ':hover': {
                      textDecoration: 'underline',
                      textUnderlineOffset: '18px',
                    },
                  }}
                  key={link}
                  label={link}
                />
              ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
