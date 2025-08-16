import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA } from '../../utils/data';

const SideMenu = ({activeMenu}) => {
    const { user, clearUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === 'logout') {
            handleLogout();
            return;
        };

        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate('/login');
    }
  return (
    <div className='w-64 h-calc[100vh-61px] bg-white border-r border-gray-200/50 sticky top-[61px] z-20'>
        {user && (
            <div className='w-64 bg-gray-100 h-screen p-5'>
                <h2 className='text-xl font-bold mb-4'>Menu</h2>
                <ul className='space-y-2'>
                    {SIDE_MENU_DATA.map((item, index) => (
                        <button 
                            key={`menu_${index}`} 
                            className={`{w-full flex items-center gap-4 text-[15px] ${activeMenu == item.label ? "text-white bg-primary" : ''} py-3 px-6 rounded-lg mb-3s`}
                            onClick={() => handleClick(item.path)}
                            >
                            <item.icon className='' /> {item.label}
                        </button>
                    ))}
                </ul>
            </div>
        )}
    </div>
  )
}

export default SideMenu;