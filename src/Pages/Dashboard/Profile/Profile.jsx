import React, { useContext } from 'react';
import Title from '../../../Components/TItle/Title';
import { AuthContext } from '../../../providers/AuthProvider';

const Profile = () => {
     const { user } = useContext(AuthContext);
    return (
        <div className='space-y-5 py-10'>
            <h1 className='text-center font-semibold text-2xl text-sky-400'>Welcome {user.displayName}!</h1>
            <h1 className='text-center text-xl text-sky-400'>You can manage your dashboard using the menu on the navigation bar.</h1>
        </div>
    );
};

export default Profile;