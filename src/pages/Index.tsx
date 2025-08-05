import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Александр Иванов',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      time: '2 часа назад',
      content: 'Только что запустил новый проект! Очень волнующий момент 🚀',
      likes: 24,
      comments: 8,
      shares: 3
    },
    {
      id: 2,
      author: 'Мария Петрова',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e7?w=32&h=32&fit=crop&crop=face',
      time: '4 часа назад',
      content: 'Красивый закат сегодня! Поделитесь своими фотографиями природы в комментариях 📸',
      likes: 67,
      comments: 15,
      shares: 12
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const communities = [
    { name: 'Разработчики', members: '12.5K', image: '👨‍💻' },
    { name: 'Дизайн', members: '8.2K', image: '🎨' },
    { name: 'Стартапы', members: '15.1K', image: '🚀' },
    { name: 'Фотография', members: '20.3K', image: '📸' }
  ];

  const chats = [
    { name: 'Команда проекта', lastMessage: 'Отличная работа!', time: '15:30', unread: 2 },
    { name: 'Елена Сидорова', lastMessage: 'Привет! Как дела?', time: '14:45', unread: 0 },
    { name: 'Группа выпускников', lastMessage: 'Встречаемся завтра', time: '12:15', unread: 5 }
  ];

  const followers = [
    { name: 'Анна Козлова', mutual: '15 общих друзей', avatar: '👩‍🦰' },
    { name: 'Дмитрий Волков', mutual: '8 общих друзей', avatar: '👨‍🦱' },
    { name: 'София Морозова', mutual: '23 общих друга', avatar: '👩‍🦳' }
  ];

  const addPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: 'Вы',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face',
        time: 'только что',
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-social-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-social-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/img/5f6bee9c-1e59-4b95-ab58-b9401d0fcbfe.jpg" alt="SocNet" className="w-8 h-8 rounded" />
            <h1 className="text-xl font-bold text-social-black">SocNet</h1>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-social-gray-500" size={16} />
              <Input 
                placeholder="Поиск людей, сообществ..." 
                className="pl-10 bg-social-gray-50 border-none"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="MessageCircle" size={20} />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face" />
              <AvatarFallback>Вы</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 w-full max-w-2xl mx-auto mb-8">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <Icon name="User" size={16} />
              <span>Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="feed" className="flex items-center space-x-2">
              <Icon name="Home" size={16} />
              <span>Лента</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center space-x-2">
              <Icon name="MessageSquare" size={16} />
              <span>Директ</span>
            </TabsTrigger>
            <TabsTrigger value="followers" className="flex items-center space-x-2">
              <Icon name="Users" size={16} />
              <span>Друзья</span>
            </TabsTrigger>
            <TabsTrigger value="communities" className="flex items-center space-x-2">
              <Icon name="Users2" size={16} />
              <span>Группы</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Icon name="Settings" size={16} />
              <span>Настройки</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&fit=crop&crop=face" />
                    <AvatarFallback>Вы</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold mb-2">Ваше имя</h2>
                  <p className="text-social-gray-600 mb-4">Разработчик интерфейсов</p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-semibold text-lg">234</div>
                      <div className="text-sm text-social-gray-600">Посты</div>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">1.2K</div>
                      <div className="text-sm text-social-gray-600">Друзья</div>
                    </div>
                    <div>
                      <div className="font-semibold text-lg">890</div>
                      <div className="text-sm text-social-gray-600">Лайки</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <h3 className="text-lg font-semibold">О себе</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-social-gray-700 mb-4">
                    Увлекаюсь современными технологиями и созданием красивых интерфейсов. 
                    Люблю делиться опытом и изучать новое.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Design</Badge>
                    <Badge variant="secondary">UI/UX</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Feed Tab */}
          <TabsContent value="feed" className="animate-fade-in">
            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face" />
                      <AvatarFallback>Вы</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea 
                        placeholder="Что у вас нового?" 
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="resize-none border-none bg-social-gray-50"
                      />
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Icon name="Image" size={16} className="mr-1" />
                            Фото
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="MapPin" size={16} className="mr-1" />
                            Место
                          </Button>
                        </div>
                        <Button onClick={addPost} disabled={!newPost.trim()}>
                          Опубликовать
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {posts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold">{post.author}</h4>
                          <span className="text-sm text-social-gray-500">{post.time}</span>
                        </div>
                        <p className="text-social-gray-800 mb-3">{post.content}</p>
                        <div className="flex items-center space-x-6 text-sm text-social-gray-600">
                          <button 
                            onClick={() => toggleLike(post.id)}
                            className="flex items-center space-x-1 hover:text-social-blue transition-colors group"
                          >
                            <Icon name="Heart" size={16} className="group-hover:scale-110 transition-transform" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-social-blue transition-colors">
                            <Icon name="MessageCircle" size={16} />
                            <span>{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-social-blue transition-colors">
                            <Icon name="Share" size={16} />
                            <span>{post.shares}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <h3 className="text-lg font-semibold">Чаты</h3>
                </CardHeader>
                <CardContent className="p-0">
                  {chats.map((chat, index) => (
                    <div key={index} className="p-4 hover:bg-social-gray-50 cursor-pointer border-b border-social-gray-100 last:border-0">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>{chat.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium truncate">{chat.name}</h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-social-gray-500">{chat.time}</span>
                              {chat.unread > 0 && (
                                <Badge variant="default" className="bg-social-blue text-xs px-1.5 py-0.5">
                                  {chat.unread}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-social-gray-600 truncate">{chat.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader className="border-b border-social-gray-100">
                  <h3 className="text-lg font-semibold">Команда проекта</h3>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-96 flex items-center justify-center text-social-gray-500">
                    <div className="text-center">
                      <Icon name="MessageSquare" size={48} className="mx-auto mb-2 text-social-gray-300" />
                      <p>Выберите чат для начала общения</p>
                    </div>
                  </div>
                  <div className="border-t border-social-gray-100 p-4">
                    <div className="flex space-x-2">
                      <Input placeholder="Напишите сообщение..." className="flex-1" />
                      <Button size="icon">
                        <Icon name="Send" size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Followers Tab */}
          <TabsContent value="followers" className="animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Ваши друзья</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {followers.map((follower, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-social-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-social-gray-200 rounded-full flex items-center justify-center text-lg">
                            {follower.avatar}
                          </div>
                          <div>
                            <h4 className="font-medium">{follower.name}</h4>
                            <p className="text-sm text-social-gray-600">{follower.mutual}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Icon name="MessageCircle" size={14} className="mr-1" />
                            Написать
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Icon name="UserX" size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Communities Tab */}
          <TabsContent value="communities" className="animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communities.map((community, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-social-blue to-social-gray-600 rounded-full flex items-center justify-center text-2xl">
                          {community.image}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1">{community.name}</h3>
                          <p className="text-social-gray-600 mb-2">{community.members} участников</p>
                          <Button size="sm">
                            <Icon name="Plus" size={14} className="mr-1" />
                            Вступить
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="animate-fade-in">
            <div className="max-w-2xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Личные данные</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-social-gray-700 mb-1">Имя</label>
                    <Input placeholder="Ваше имя" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-social-gray-700 mb-1">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-social-gray-700 mb-1">О себе</label>
                    <Textarea placeholder="Расскажите о себе..." />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Приватность</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Закрытый профиль</h4>
                      <p className="text-sm text-social-gray-600">Только друзья видят ваши посты</p>
                    </div>
                    <Button variant="outline" size="sm">Включить</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Уведомления</h4>
                      <p className="text-sm text-social-gray-600">Получать уведомления о новых сообщениях</p>
                    </div>
                    <Button variant="outline" size="sm">Настроить</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;