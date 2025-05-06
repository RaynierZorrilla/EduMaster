import React, { useEffect, useState } from 'react';
import { Search, Plus, Filter, TrendingUp } from 'lucide-react';
import AchievementCard from '../components/achievements/AchievementCard';
import Button from '../components/ui/Button';
import { Achievement } from '../types';

// Mock data for demo purposes
const mockAchievements: Achievement[] = [
    {
        id: '1',
        title: 'Primer Curso Completado',
        description: 'Completaste tu primer curso con éxito',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/6941/6941697.png',
        points: 50,
        earnedAt: '2025-04-15T14:30:00Z',
    },
    {
        id: '2',
        title: 'Racha de 7 Días',
        description: 'Mantuviste una racha de estudio por 7 días',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/2150/2150464.png',
        points: 25,
        earnedAt: '2025-04-18T10:15:00Z',
    },
    {
        id: '3',
        title: 'Primer Comentario',
        description: 'Dejaste tu primer comentario en la comunidad',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/6460/6460111.png',
        points: 15,
        earnedAt: '2025-04-20T16:45:00Z',
    },
];

const Achievements: React.FC = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');


    useEffect(() => {
        // Simulate fetching data from API
        const fetchAchievements = async () => {
            // In a real app, fetch from Supabase here
            setAchievements(mockAchievements);
        };

        fetchAchievements();
    }, []);

    useEffect(() => {
        // Apply filters
        let result = achievements;

        // Apply search filter
        if (searchQuery) {
            result = result.filter(
                achievement =>
                    achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply other filters
        switch (selectedFilter) {
            case 'recent':
                result = [...result].sort((a, b) => {
                    const dateA = a.earnedAt ? new Date(a.earnedAt).getTime() : 0;
                    const dateB = b.earnedAt ? new Date(b.earnedAt).getTime() : 0;
                    return dateB - dateA;
                });
                break;
            default:
                break;
        }

        setAchievements(result);
    }, [searchQuery, selectedFilter, achievements]);

    const filteredAchievements = achievements.filter((achievement) => {
        return (
            achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col space-y-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Logros</h1>
                        <p className="text-gray-500 mt-1">
                            Obtén logros y progresos en tus cursos.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <Button size="md" className="flex items-center">
                            <Plus className="h-4 w-4 mr-2" />
                            Compartir Logro
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar logros..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-2 overflow-x-auto whitespace-nowrap pb-1 w-full sm:w-auto">
                        <Filter className="h-4 w-4 text-gray-500" />
                        {['Todos', 'Recientes'].map(filter => (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`px-3 py-1 rounded-full text-sm ${selectedFilter === filter
                                        ? 'bg-indigo-100 text-indigo-800 font-medium'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {selectedFilter === 'todos' && (
                    <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 flex items-start">
                        <div className="bg-amber-100 p-2 rounded-full mr-3">
                            <TrendingUp className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                            <h3 className="dark:text-white font-medium text-amber-800">Logros</h3>
                            <p className="text-sm text-amber-700 dark:text-white">
                                Estos son los logros más recientes de la comunidad.
                            </p>
                        </div>
                    </div>
                )}

                {filteredAchievements.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAchievements.map((achievement) => (
                            <AchievementCard key={achievement.id} achievement={achievement} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="dark:text-white text-gray-700 font-medium mb-1">No se encontraron logros</h3>
                        <p className="dark:text-white text-gray-500 text-sm mb-4">
                            Intenta con otra búsqueda o sé el primero en compartir un logro.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedFilter('todos');
                            }}
                        >
                            Restablecer filtros
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Achievements;