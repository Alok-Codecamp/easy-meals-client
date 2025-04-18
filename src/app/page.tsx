import Home from '@/components/home/Home';
import { getCurrentUser } from '@/services/auth/auth';
import React from 'react';

const HomePage = () => {
  // const userInfo = getCurrentUser();
  return (
    <div>
      <Home />
    </div>
  );
}

export default HomePage;
