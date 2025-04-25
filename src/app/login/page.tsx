import Login from '@/components/authentication/login/page';
import React, { Suspense } from 'react';

const LoginPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Login />
        </Suspense>
    );
}

export default LoginPage;
