import React from 'react';
import { Trophy } from 'lucide-react';
import { Achievement } from '../../types';

interface AchievementsListProps {
  achievements: Achievement[];
  recent?: boolean;
}

const AchievementsList: React.FC<AchievementsListProps> = ({ 
  achievements,
  recent = false
}) => {
  // If recent flag is true, only show the 3 most recent achievements
  const displayAchievements = recent ? achievements.slice(0, 3) : achievements;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Trophy className="h-6 w-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold">
            {recent ? 'Logros Recientes' : 'Todos los Logros'}
          </h2>
        </div>
        
        {recent && achievements.length > 3 && (
          <a href="/achievements" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            Ver todos
          </a>
        )}
      </div>
      
      {displayAchievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayAchievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
            >
              <img 
                src={achievement.imageUrl} 
                alt={achievement.title} 
                className="w-16 h-16 mb-3"
              />
              <h3 className="font-semibold text-gray-800 text-center">{achievement.title}</h3>
              <p className="text-sm text-gray-500 text-center mt-1">{achievement.description}</p>
              
              <div className="mt-2 px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                +{achievement.points} puntos
              </div>
              
              {achievement.earnedAt && (
                <p className="text-xs text-gray-400 mt-2">
                  Obtenido el {new Date(achievement.earnedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-gray-700 font-medium mb-1">Sin logros aún</h3>
          <p className="text-gray-500 text-sm">
            Completa cursos y participa en la comunidad para ganar insignias.
          </p>
        </div>
      )}
    </div>
  );
};

export default AchievementsList;