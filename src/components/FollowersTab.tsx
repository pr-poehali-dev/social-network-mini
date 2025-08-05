import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface User {
  id: number;
  name: string;
  avatar: string;
  mutual?: string;
  status?: 'online' | 'offline';
}

interface FollowersTabProps {
  followers: User[];
  addFriend: (userId: number) => void;
}

const FollowersTab = ({ followers, addFriend }: FollowersTabProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardHeader>
          <h3 className="text-xl font-bold bg-gradient-to-r from-social-primary to-social-secondary bg-clip-text text-transparent">
            Космическая команда
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {followers.map((follower) => (
              <div key={follower.id} className="flex items-center justify-between p-4 hover:bg-social-gray-50 rounded-xl transition-all duration-200 hover:shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-r from-social-primary/20 to-social-secondary/20 rounded-full flex items-center justify-center text-2xl">
                      {follower.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      follower.status === 'online' ? 'bg-social-success' : 'bg-social-gray-400'
                    }`}></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-social-gray-800">{follower.name}</h4>
                    <p className="text-sm text-social-gray-600">{follower.mutual}</p>
                    <p className="text-xs text-social-gray-500">
                      {follower.status === 'online' ? '🟢 В сети' : '⚫ Не в сети'}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-social-primary text-social-primary hover:bg-social-primary hover:text-white rounded-xl"
                  >
                    <Icon name="MessageCircle" size={14} className="mr-2" />
                    Написать
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => addFriend(follower.id)}
                    className="text-social-secondary hover:bg-social-secondary/10 rounded-xl"
                  >
                    <Icon name="UserPlus" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FollowersTab;