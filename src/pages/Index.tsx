import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

import Header from '@/components/Header';
import ProfileTab from '@/components/ProfileTab';
import FeedTab from '@/components/FeedTab';
import MessagesTab from '@/components/MessagesTab';
import FollowersTab from '@/components/FollowersTab';
import CommunitiesTab from '@/components/CommunitiesTab';
import SettingsTab from '@/components/SettingsTab';

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

interface Community {
  id: number;
  name: string;
  members: string;
  image: string;
  joined: boolean;
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

  const communities: Community[] = [
    { id: 1, name: 'Космические Разработчики', members: '12.5K', image: '🚀', joined: false },
    { id: 2, name: 'UI/UX Галактика', members: '8.2K', image: '🎨', joined: false },
    { id: 3, name: 'Стартап Орбита', members: '15.1K', image: '💫', joined: true },
    { id: 4, name: 'Фото Вселенной', members: '20.3K', image: '📸', joined: false }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-social-gray-50 to-social-gray-100">
      <Header profile={profile} />

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

          <TabsContent value="profile" className="animate-fade-in">
            <ProfileTab profile={profile} />
          </TabsContent>

          <TabsContent value="feed" className="animate-fade-in">
            <FeedTab 
              posts={posts}
              newPost={newPost}
              setNewPost={setNewPost}
              addPost={addPost}
              toggleLike={toggleLike}
              profile={profile}
            />
          </TabsContent>

          <TabsContent value="messages" className="animate-fade-in">
            <MessagesTab 
              chats={chats}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
            />
          </TabsContent>

          <TabsContent value="followers" className="animate-fade-in">
            <FollowersTab 
              followers={followers}
              addFriend={addFriend}
            />
          </TabsContent>

          <TabsContent value="communities" className="animate-fade-in">
            <CommunitiesTab communities={communities} />
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <SettingsTab 
              profile={profile}
              setProfile={setProfile}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;