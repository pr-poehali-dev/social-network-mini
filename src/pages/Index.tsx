import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  liked?: boolean;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

interface Message {
  id: number;
  author: string;
  content: string;
  time: string;
  isOwn: boolean;
}

interface User {
  id: number;
  name: string;
  avatar: string;
  mutual?: string;
  status?: 'online' | 'offline';
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);
  const [newPost, setNewPost] = useState('');
  const [profile, setProfile] = useState({
    name: 'Александр Космонавтов',
    bio: 'Frontend разработчик и исследователь космоса 🚀',
    location: 'Москва, Россия',
    website: 'github.com/cosmonaut',
    postsCount: 234,
    followersCount: 1247,
    likesCount: 890
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('socialPosts');
    const savedChats = localStorage.getItem('socialChats');
    const savedFollowers = localStorage.getItem('socialFollowers');
    const savedProfile = localStorage.getItem('socialProfile');

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      const initialPosts: Post[] = [
        {
          id: 1,
          author: 'Мария Звёздная',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e7?w=32&h=32&fit=crop&crop=face',
          time: '2 часа назад',
          content: 'Только что вернулась с тренировки по подготовке к космическому полёту! Невесомость - это нечто особенное ✨🚀',
          likes: 42,
          comments: 12,
          shares: 5,
          liked: false
        },
        {
          id: 2,
          author: 'Дмитрий Галактик',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
          time: '4 часа назад',
          content: 'Завершили разработку нового модуля для МКС. Командная работа - основа успеха! 🛰️',
          likes: 89,
          comments: 23,
          shares: 15,
          liked: false
        }
      ];
      setPosts(initialPosts);
      localStorage.setItem('socialPosts', JSON.stringify(initialPosts));
    }

    if (savedChats) {
      setChats(JSON.parse(savedChats));
    } else {
      const initialChats: Chat[] = [
        {
          id: 1,
          name: 'Космическая команда',
          lastMessage: 'Готовимся к запуску!',
          time: '15:30',
          unread: 3,
          messages: [
            { id: 1, author: 'Анна', content: 'Все системы в норме', time: '15:25', isOwn: false },
            { id: 2, author: 'Вы', content: 'Отлично! Готов к старту', time: '15:28', isOwn: true },
            { id: 3, author: 'Михаил', content: 'Готовимся к запуску!', time: '15:30', isOwn: false }
          ]
        },
        {
          id: 2,
          name: 'Елена Орбитальная',
          lastMessage: 'Как проходит подготовка?',
          time: '14:45',
          unread: 1,
          messages: [
            { id: 1, author: 'Елена', content: 'Привет! Как дела?', time: '14:40', isOwn: false },
            { id: 2, author: 'Елена', content: 'Как проходит подготовка?', time: '14:45', isOwn: false }
          ]
        }
      ];
      setChats(initialChats);
      localStorage.setItem('socialChats', JSON.stringify(initialChats));
    }

    if (savedFollowers) {
      setFollowers(JSON.parse(savedFollowers));
    } else {
      const initialFollowers: User[] = [
        { id: 1, name: 'Анна Звёздочка', mutual: '15 общих друзей', avatar: '👩‍🚀', status: 'online' },
        { id: 2, name: 'Максим Космос', mutual: '8 общих друзей', avatar: '👨‍🚀', status: 'offline' },
        { id: 3, name: 'София Планета', mutual: '23 общих друга', avatar: '👩‍🔬', status: 'online' }
      ];
      setFollowers(initialFollowers);
      localStorage.setItem('socialFollowers', JSON.stringify(initialFollowers));
    }

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('socialPosts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('socialChats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('socialFollowers', JSON.stringify(followers));
  }, [followers]);

  useEffect(() => {
    localStorage.setItem('socialProfile', JSON.stringify(profile));
  }, [profile]);

  const addPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now(),
        author: profile.name,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face',
        time: 'только что',
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setProfile(prev => ({ ...prev, postsCount: prev.postsCount + 1 }));
    }
  };

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked 
          }
        : post
    ));
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedChat !== null) {
      const message: Message = {
        id: Date.now(),
        author: 'Вы',
        content: newMessage,
        time: new Date().toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };

      setChats(chats.map(chat => 
        chat.id === selectedChat 
          ? { 
              ...chat, 
              messages: [...chat.messages, message],
              lastMessage: newMessage,
              time: message.time
            }
          : chat
      ));
      setNewMessage('');
    }
  };

  const addFriend = (userId: number) => {
    setFollowers(followers.map(follower => 
      follower.id === userId 
        ? { ...follower, mutual: '✓ Друг добавлен' }
        : follower
    ));
  };

  const communities = [
    { id: 1, name: 'Космические Разработчики', members: '12.5K', image: '🚀', joined: false },
    { id: 2, name: 'UI/UX Галактика', members: '8.2K', image: '🎨', joined: false },
    { id: 3, name: 'Стартап Орбита', members: '15.1K', image: '💫', joined: true },
    { id: 4, name: 'Фото Вселенной', members: '20.3K', image: '📸', joined: false }
  ];

  const getCurrentChat = () => {
    return chats.find(chat => chat.id === selectedChat);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-social-gray-50 to-social-gray-100">
      {/* Header */}
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

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 w-full max-w-3xl mx-auto mb-8 bg-white/50 backdrop-blur-sm p-1 rounded-2xl shadow-lg">
            <TabsTrigger value="profile" className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-social-primary data-[state=active]:to-social-secondary data-[state=active]:text-white">
              <Icon name="User" size={16} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="feed" className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-social-primary data-[state=active]:to-social-secondary data-[state=active]:text-white">
              <Icon name="Home" size={16} />
              <span className="hidden sm:inline">Лента</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-social-primary data-[state=active]:to-social-secondary data-[state=active]:text-white">
              <Icon name="MessageSquare" size={16} />
              <span className="hidden sm:inline">Чаты</span>
            </TabsTrigger>
            <TabsTrigger value="followers" className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-social-primary data-[state=active]:to-social-secondary data-[state=active]:text-white">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Друзья</span>
            </TabsTrigger>
            <TabsTrigger value="communities" className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-social-primary data-[state=active]:to-social-secondary data-[state=active]:text-white">
              <Icon name="Users2" size={16} />
              <span className="hidden sm:inline">Группы</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-social-primary data-[state=active]:to-social-secondary data-[state=active]:text-white">
              <Icon name="Settings" size={16} />
              <span className="hidden sm:inline">Настройки</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="animate-fade-in">
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
          </TabsContent>

          {/* Feed Tab */}
          <TabsContent value="feed" className="animate-fade-in">
            <div className="max-w-2xl mx-auto space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <Avatar className="w-12 h-12 ring-2 ring-social-primary/20">
                      <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=48&h=48&fit=crop&crop=face" />
                      <AvatarFallback className="bg-gradient-to-r from-social-primary to-social-secondary text-white">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea 
                        placeholder="Поделитесь своими мыслями о космосе..." 
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        className="resize-none border-none bg-social-gray-50/50 rounded-xl"
                      />
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-social-primary hover:bg-social-primary/10">
                            <Icon name="Image" size={16} className="mr-2" />
                            Фото
                          </Button>
                          <Button variant="ghost" size="sm" className="text-social-secondary hover:bg-social-secondary/10">
                            <Icon name="MapPin" size={16} className="mr-2" />
                            Место
                          </Button>
                          <Button variant="ghost" size="sm" className="text-social-accent hover:bg-social-accent/10">
                            <Icon name="Smile" size={16} className="mr-2" />
                            Эмоции
                          </Button>
                        </div>
                        <Button 
                          onClick={addPost} 
                          disabled={!newPost.trim()}
                          className="bg-gradient-to-r from-social-primary to-social-secondary hover:from-social-primary/90 hover:to-social-secondary/90 text-white rounded-xl"
                        >
                          <Icon name="Send" size={16} className="mr-2" />
                          Опубликовать
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {posts.map((post) => (
                <Card key={post.id} className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-social-primary to-social-secondary text-white">
                          {post.author[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-3">
                          <h4 className="font-semibold text-social-gray-800">{post.author}</h4>
                          <span className="text-sm text-social-gray-500">•</span>
                          <span className="text-sm text-social-gray-500">{post.time}</span>
                        </div>
                        <p className="text-social-gray-800 mb-4 leading-relaxed">{post.content}</p>
                        <div className="flex items-center space-x-8">
                          <button 
                            onClick={() => toggleLike(post.id)}
                            className={`flex items-center space-x-2 transition-all duration-200 hover:scale-105 ${
                              post.liked 
                                ? 'text-social-danger' 
                                : 'text-social-gray-500 hover:text-social-danger'
                            }`}
                          >
                            <Icon 
                              name={post.liked ? "Heart" : "Heart"} 
                              size={18} 
                              className={`transition-all duration-200 ${post.liked ? 'fill-current' : ''}`}
                            />
                            <span className="font-medium">{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-social-gray-500 hover:text-social-primary transition-colors duration-200 hover:scale-105">
                            <Icon name="MessageCircle" size={18} />
                            <span className="font-medium">{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-social-gray-500 hover:text-social-secondary transition-colors duration-200 hover:scale-105">
                            <Icon name="Share" size={18} />
                            <span className="font-medium">{post.shares}</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="lg:col-span-1 bg-white/80 backdrop-blur-sm shadow-xl border-0">
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-bold bg-gradient-to-r from-social-primary to-social-secondary bg-clip-text text-transparent">
                    Чаты
                  </h3>
                </CardHeader>
                <CardContent className="p-0">
                  {chats.map((chat) => (
                    <div 
                      key={chat.id} 
                      onClick={() => setSelectedChat(chat.id)}
                      className={`p-4 hover:bg-social-gray-50 cursor-pointer border-b border-social-gray-100 last:border-0 transition-all duration-200 ${
                        selectedChat === chat.id ? 'bg-gradient-to-r from-social-primary/10 to-social-secondary/10 border-l-4 border-l-social-primary' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-gradient-to-r from-social-primary to-social-secondary text-white">
                              {chat.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-social-success rounded-full border-2 border-white"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-medium truncate text-social-gray-800">{chat.name}</h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-social-gray-500">{chat.time}</span>
                              {chat.unread > 0 && (
                                <Badge className="bg-gradient-to-r from-social-primary to-social-secondary text-white text-xs px-2 py-1 rounded-full">
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
              
              <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm shadow-xl border-0">
                {selectedChat ? (
                  <>
                    <CardHeader className="border-b border-social-gray-100 bg-gradient-to-r from-social-primary/5 to-social-secondary/5">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-r from-social-primary to-social-secondary text-white">
                            {getCurrentChat()?.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-social-gray-800">{getCurrentChat()?.name}</h3>
                          <p className="text-sm text-social-success">В сети</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="h-96 overflow-y-auto p-4 space-y-4">
                        {getCurrentChat()?.messages.map((message) => (
                          <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                              message.isOwn 
                                ? 'bg-gradient-to-r from-social-primary to-social-secondary text-white' 
                                : 'bg-social-gray-100 text-social-gray-800'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                              <p className={`text-xs mt-1 ${message.isOwn ? 'text-white/70' : 'text-social-gray-500'}`}>
                                {message.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-social-gray-100 p-4 bg-social-gray-50/50">
                        <div className="flex space-x-3">
                          <Input 
                            placeholder="Напишите сообщение..." 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            className="flex-1 rounded-xl border-social-gray-200"
                          />
                          <Button 
                            onClick={sendMessage}
                            size="icon" 
                            className="bg-gradient-to-r from-social-primary to-social-secondary hover:from-social-primary/90 hover:to-social-secondary/90 text-white rounded-xl"
                          >
                            <Icon name="Send" size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <CardContent className="h-96 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-social-primary/20 to-social-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="MessageSquare" size={32} className="text-social-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-social-gray-800 mb-2">Выберите чат</h3>
                      <p className="text-social-gray-600">Выберите собеседника для начала общения</p>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </TabsContent>

          {/* Followers Tab */}
          <TabsContent value="followers" className="animate-fade-in">
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
          </TabsContent>

          {/* Communities Tab */}
          <TabsContent value="communities" className="animate-fade-in">
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
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="animate-fade-in">
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
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="rounded-xl border-social-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-social-gray-700 mb-2">О себе</label>
                    <Textarea 
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      className="rounded-xl border-social-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-social-gray-700 mb-2">Местоположение</label>
                    <Input 
                      value={profile.location}
                      onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                      className="rounded-xl border-social-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-social-gray-700 mb-2">Веб-сайт</label>
                    <Input 
                      value={profile.website}
                      onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;