import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Profile {
  name: string;
  bio: string;
  location: string;
  website: string;
  postsCount: number;
  followersCount: number;
  likesCount: number;
}

interface SettingsTabProps {
  profile: Profile;
  setProfile: (profile: Profile) => void;
}

const SettingsTab = ({ profile, setProfile }: SettingsTabProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardHeader>
          <h3 className="text-xl font-bold bg-gradient-to-r from-social-primary to-social-secondary bg-clip-text text-transparent">
            Личные данные
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-social-gray-700 mb-2">Имя</label>
            <Input 
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="rounded-xl border-social-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-social-gray-700 mb-2">О себе</label>
            <Textarea 
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="rounded-xl border-social-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-social-gray-700 mb-2">Местоположение</label>
            <Input 
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="rounded-xl border-social-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-social-gray-700 mb-2">Веб-сайт</label>
            <Input 
              value={profile.website}
              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
              className="rounded-xl border-social-gray-200"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
        <CardHeader>
          <h3 className="text-xl font-bold bg-gradient-to-r from-social-primary to-social-secondary bg-clip-text text-transparent">
            Настройки приватности
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-social-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-social-gray-800">Закрытый профиль</h4>
              <p className="text-sm text-social-gray-600">Только друзья видят ваши посты</p>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl">
              Включить
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-social-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-social-gray-800">Уведомления</h4>
              <p className="text-sm text-social-gray-600">Получать push-уведомления</p>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl">
              Настроить
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-social-gray-50 rounded-xl">
            <div>
              <h4 className="font-medium text-social-gray-800">Тёмная тема</h4>
              <p className="text-sm text-social-gray-600">Переключить на тёмный режим</p>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl">
              Скоро
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;