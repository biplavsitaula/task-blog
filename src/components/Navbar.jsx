import { Clapperboard, House, LayoutDashboard, LogIn, LogOut, } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="w-full fixed top-0 bg-black z-50">
            <div className="flex items-center container p-4 mx-auto">
                <h1 className="md:block hidden text-red-500 text-2xl font-bold">
                    <Link to='/'>Blog App</Link>
                </h1>
                <Link to='/' >
                    <Clapperboard className='block md:hidden text-red-500' />
                </Link>
                <div className="ml-auto text-white items-center flex gap-4">
                    <Link to="/" ><House className={location.pathname == '/' && 'text-red-500'} />
                    </Link>
                    {isAuthenticated ? <>
                        <Link className={location.pathname.includes('/dashboard') ? 'text-red-500' : ""} to="/dashboard" >
                            <LayoutDashboard /></Link>
                        <button className='cursor-pointer' onClick={() => logout(navigate)}><LogOut /></button></> : <Link to="/login" >
                        <LogIn className={location.pathname == '/login' && 'text-red-500'} />
                    </Link>}
                </div>
            </div>
        </nav >
    )
}

export default Navbar