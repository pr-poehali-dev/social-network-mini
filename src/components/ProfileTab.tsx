import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ProfileTabProps {
  profile: {
    name: string;
    bio: string;
    location: string;
    website: string;
    postsCount: number;
    followersCount: number;
    likesCount: number;
  };
}

const ProfileTab = ({ profile }: ProfileTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="p-6 text-center">
          <div className="relative inline-block mb-6">
            <Avatar className="w-28 h-28 mx-auto ring-4 ring-social-primary/20">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=112&h=112&fit=crop&crop=face" />
              <AvatarFallback className="bg-gradient-to-r from-social-primary to-social-secondary text-white text-2xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-social-success rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-social-primary to-social-secondary bg-clip-text text-transparent">
            {profile.name}
          </h2>
          <p className="text-social-gray-600 mb-2">{profile.bio}</p>
          <div className="flex items-center justify-center space-x-1 text-sm text-social-gray-500 mb-6">
            <Icon name="MapPin" size={14} />
            <span>{profile.location}</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gradient-to-r from-social-primary/10 to-social-secondary/10 rounded-xl">
              <div className="font-bold text-lg text-social-primary">{profile.postsCount}</div>
              <div className="text-sm text-social-gray-600">Посты</div>
            </div>
            <div className="p-3 bg-gradient-to-r from-social-secondary/10 to-social-accent/10 rounded-xl">
              <div className="font-bold text-lg text-social-secondary">{profile.followersCount}</div>
              <div className="text-sm text-social-gray-600">Друзья</div>
            </div>
            <div className="p-3 bg-gradient-to-r from-social-accent/10 to-social-primary/10 rounded-xl">
              <div className="font-bold text-lg text-social-accent">{profile.likesCount}</div>
              <div className="text-sm text-social-gray-600">Лайки</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardHeader>
          <h3 className="text-xl font-bold bg-gradient-to-r from-social-primary to-social-secondary bg-clip-text text-transparent">
            Информация
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-social-gray-800 mb-2">О себе</h4>
            <p className="text-social-gray-700 leading-relaxed">
              Страстный разработчик интерфейсов и мечтатель о космосе. Верю, что технологии могут 
              объединить людей и открыть новые горизонты. Когда не кодирую, изучаю звёзды и планирую 
              путешествия к далёким галактикам.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-social-gray-800 mb-3">Навыки</h4>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gradient-to-r from-social-primary to-social-secondary text-white">React</Badge>
              <Badge className="bg-gradient-to-r from-social-secondary to-social-accent text-white">TypeScript</Badge>
              <Badge className="bg-gradient-to-r from-social-accent to-social-primary text-white">UI/UX Design</Badge>
              <Badge className="bg-gradient-to-r from-social-success to-social-primary text-white">Space Tech</Badge>
              <Badge className="bg-gradient-to-r from-social-warning to-social-secondary text-white">Leadership</Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-social-gray-600">
            <Icon name="Globe" size={16} />
            <a href="#" className="text-social-primary hover:underline">{profile.website}</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;