import React from 'react';
import { Award, Clock, Calendar, BookOpen } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

interface ProgressStatsProps {
  activeCourses: number;
  completedCourses: number;
  totalTimeSpent: number; // in minutes
  consecutiveDays: number;
  averageCompletion: number; // percentage
}

const ProgressStats: React.FC<ProgressStatsProps> = ({
  activeCourses,
  completedCourses,
  totalTimeSpent,
  consecutiveDays,
  averageCompletion,
}) => {
  // Function to format time (convert minutes to hours and minutes)
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins}m`;
    } else if (mins === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${mins}m`;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Estadísticas de Progreso</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <BookOpen className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="font-medium text-gray-700">Cursos Activos</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{activeCourses}</p>
          <p className="text-sm text-gray-500 mt-1">En progreso</p>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <Award className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="font-medium text-gray-700">Cursos Completados</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{completedCourses}</p>
          <p className="text-sm text-gray-500 mt-1">Finalizados</p>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="font-medium text-gray-700">Tiempo Total</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatTime(totalTimeSpent)}</p>
          <p className="text-sm text-gray-500 mt-1">De aprendizaje</p>
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
            <h3 className="font-medium text-gray-700">Racha Actual</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{consecutiveDays}</p>
          <p className="text-sm text-gray-500 mt-1">Días consecutivos</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium text-gray-700">Progreso Promedio</h3>
          <span className="text-sm font-medium text-gray-700">{averageCompletion}%</span>
        </div>
        <ProgressBar progress={averageCompletion} color="primary" size="md" />
      </div>
      
      <p className="text-sm text-gray-500 italic mt-6">
        Continúa con tu ritmo actual para desbloquear nuevos logros y subir de nivel.
      </p>
    </div>
  );
};

export default ProgressStats;