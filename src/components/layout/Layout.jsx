import { Link, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Settings } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all
        ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
        >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
        </Link>
    );
};

export default function Layout() {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r shadow-sm p-4">
                <div className="flex items-center gap-2 mb-8 px-2">
                    <BookOpen className="text-blue-600" size={28} />
                    <h1 className="text-xl font-bold text-gray-800">LibManager</h1>
                </div>
                <nav className="space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/" />
                    <SidebarItem icon={BookOpen} label="Manage Books" to="/books" />
                    <SidebarItem icon={Settings} label="Settings" to="/settings" />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
}
