import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Palette, LogOut, User, LayoutDashboard, Shield } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Palette className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-slate-800 tracking-tight">Rota<span className="text-primary">Graphics</span></span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link to="/admin" className="text-slate-600 hover:text-primary transition-colors flex items-center gap-1 font-medium">
                    <Shield className="w-5 h-5" /> Admin
                  </Link>
                ) : (
                  <Link to="/dashboard" className="text-slate-600 hover:text-primary transition-colors flex items-center gap-1 font-medium">
                    <LayoutDashboard className="w-5 h-5" /> Dashboard
                  </Link>
                )}
                <div className="h-6 w-px bg-slate-200 mx-2"></div>
                <span className="text-sm font-medium text-slate-500 flex items-center gap-1">
                  <User className="w-4 h-4" /> {user.username}
                </span>
                <button 
                  onClick={handleLogout}
                  className="ml-2 text-slate-500 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-primary font-medium transition-colors">Log in</Link>
                <Link to="/register" className="bg-primary hover:bg-indigo-700 text-white px-4 py-2 rounded-full font-medium transition-colors shadow-sm">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
