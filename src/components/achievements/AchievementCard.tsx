import React from 'react';
import { MessageSquare, Share2 } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Avatar from '../ui/Avatar';
import { Achievement } from '../../types';

interface AchievementCardProps {
    achievement: Achievement;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement }) => {
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-5">
                <div className="flex items-center mb-4">
                    <Avatar
                        src={achievement.imageUrl}
                        fallback={achievement.title}
                        size="sm"
                    />
                    <div className="ml-2">
                        <p className="font-medium text-gray-900">{achievement.title}</p>
                        <p className="text-xs text-gray-500">
                            {achievement.earnedAt
                                ? `${new Date(achievement.earnedAt).toLocaleDateString()} · Desde un curso`
                                : 'Fecha no disponible'}
                        </p>
                    </div>
                </div>

                <p className="text-gray-600 line-clamp-3 mb-4">{achievement.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex space-x-4">
                        <button className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            <span className="text-sm">{achievement.comments}</span>
                        </button>

                        <button className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
                            <Share2 className="h-4 w-4 mr-1" />
                            <span className="text-sm">{achievement.shares}</span>
                        </button>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <span className="text-sm">{achievement.points} puntos</span>
                        <button className="ml-2 text-gray-500 hover:text-indigo-600 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AchievementCard;