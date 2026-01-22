import React, { useMemo } from 'react';
import { useLibraryStore } from '../../store/useLibraryStore';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock, Layers, TrendingUp, Plus } from 'lucide-react';

export default function Dashboard() {
    const { books } = useLibraryStore();
    const navigate = useNavigate();

    // Calculate statistics
    const stats = useMemo(() => {
        const total = books.length;
        const available = books.filter((b) => b.status === 'Available').length;
        const borrowed = books.filter((b) => b.status === 'Borrowed').length;
        const categories = new Set(books.map((b) => b.category)).size;

        // Get recent books (last 5 added - using id as proxy for recency)
        const recent = [...books].sort((a, b) => b.id - a.id).slice(0, 5);

        // Category breakdown
        const categoryStats = books.reduce((acc, book) => {
            acc[book.category] = (acc[book.category] || 0) + 1;
            return acc;
        }, {});

        return { total, available, borrowed, categories, recent, categoryStats };
    }, [books]);

    const StatCard = ({ icon: Icon, label, value, color, bgColor }) => (
        <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                </div>
                <div className={`p-3 rounded-lg ${bgColor}`}>
                    <Icon className={color} size={24} />
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                    <p className="text-gray-600 mt-1">Welcome to LibManager - Your Library at a Glance</p>
                </div>
                <button
                    onClick={() => navigate('/books')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all"
                >
                    <Plus size={18} /> Add Book
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={BookOpen}
                    label="Total Books"
                    value={stats.total}
                    color="text-blue-600"
                    bgColor="bg-blue-50"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Available"
                    value={stats.available}
                    color="text-green-600"
                    bgColor="bg-green-50"
                />
                <StatCard
                    icon={Clock}
                    label="Borrowed"
                    value={stats.borrowed}
                    color="text-orange-600"
                    bgColor="bg-orange-50"
                />
                <StatCard
                    icon={Layers}
                    label="Categories"
                    value={stats.categories}
                    color="text-purple-600"
                    bgColor="bg-purple-50"
                />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Books */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="text-blue-600" size={20} />
                        <h3 className="text-lg font-bold text-gray-800">Recent Additions</h3>
                    </div>
                    {stats.recent.length > 0 ? (
                        <div className="space-y-3">
                            {stats.recent.map((book) => (
                                <div
                                    key={book.id}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">{book.title}</p>
                                        <p className="text-sm text-gray-600">{book.author}</p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${book.status === 'Available'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-orange-100 text-orange-700'
                                            }`}
                                    >
                                        {book.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No books yet. Add your first book!</p>
                    )}
                </div>

                {/* Category Breakdown */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Layers className="text-purple-600" size={20} />
                        <h3 className="text-lg font-bold text-gray-800">Category Breakdown</h3>
                    </div>
                    {Object.keys(stats.categoryStats).length > 0 ? (
                        <div className="space-y-3">
                            {Object.entries(stats.categoryStats)
                                .sort(([, a], [, b]) => b - a)
                                .map(([category, count]) => (
                                    <div key={category} className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700">{category}</span>
                                                <span className="text-sm font-bold text-gray-900">{count}</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                                    style={{ width: `${(count / stats.total) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No categories yet.</p>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 text-white">
                <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
                <p className="text-blue-100 mb-4">Manage your library efficiently</p>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={() => navigate('/books')}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-medium transition-all"
                    >
                        View All Books
                    </button>
                    <button
                        onClick={() => navigate('/books')}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-medium transition-all"
                    >
                        Add New Book
                    </button>
                    <button
                        onClick={() => navigate('/settings')}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg font-medium transition-all"
                    >
                        Settings
                    </button>
                </div>
            </div>
        </div>
    );
}
