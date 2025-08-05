import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface HeaderProps {
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

const Header = ({ profile }: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-social-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img src="/img/bb484955-cb66-415e-a1ba-0c6e1799388c.jpg" alt="SocSpace" className="w-10 h-10 rounded-xl shadow-md" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-social-primary to-social-secondary rounded-full"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-social-primary to-social-secondary bg-clip-text text-transparent">
              SocSpace
            </h1>
            <p className="text-xs text-social-gray-500">Социальная сеть будущего</p>
          </div>
        </div>
        
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-social-gray-400" size={16} />
            <Input 
              placeholder="Поиск в космосе..." 
              className="pl-10 bg-social-gray-50/50 border-social-gray-200 rounded-xl"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative hover:bg-social-primary/10">
            <Icon name="Bell" size={20} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-social-danger rounded-full"></div>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-social-primary/10">
            <Icon name="MessageCircle" size={20} />
          </Button>
          <Avatar className="w-9 h-9 ring-2 ring-social-primary/20">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=36&h=36&fit=crop&crop=face" />
            <AvatarFallback className="bg-gradient-to-r from-social-primary to-social-secondary text-white text-sm">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;