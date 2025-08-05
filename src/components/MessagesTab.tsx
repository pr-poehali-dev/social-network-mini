import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  author: string;
  content: string;
  time: string;
  isOwn: boolean;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

interface MessagesTabProps {
  chats: Chat[];
  selectedChat: number | null;
  setSelectedChat: (chatId: number | null) => void;
  newMessage: string;
  setNewMessage: (value: string) => void;
  sendMessage: () => void;
}

const MessagesTab = ({ chats, selectedChat, setSelectedChat, newMessage, setNewMessage, sendMessage }: MessagesTabProps) => {
  const getCurrentChat = () => {
    return chats.find(chat => chat.id === selectedChat);
  };

  return (
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
  );
};

export default MessagesTab;