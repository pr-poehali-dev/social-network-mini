import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Community {
  id: number;
  name: string;
  members: string;
  image: string;
  joined: boolean;
}

interface CommunitiesTabProps {
  communities: Community[];
}

const CommunitiesTab = ({ communities }: CommunitiesTabProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {communities.map((community) => (
          <Card key={community.id} className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-social-primary to-social-secondary rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  {community.image}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-social-gray-800 mb-1">{community.name}</h3>
                  <p className="text-social-gray-600 mb-3">{community.members} участников</p>
                  <Button 
                    size="sm" 
                    className={community.joined 
                      ? "bg-social-success hover:bg-social-success/90 text-white rounded-xl"
                      : "bg-gradient-to-r from-social-primary to-social-secondary hover:from-social-primary/90 hover:to-social-secondary/90 text-white rounded-xl"
                    }
                  >
                    <Icon name={community.joined ? "Check" : "Plus"} size={14} className="mr-2" />
                    {community.joined ? 'Участник' : 'Вступить'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunitiesTab;