import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

interface FeedTabProps {
  posts: Post[];
  newPost: string;
  setNewPost: (value: string) => void;
  addPost: () => void;
  toggleLike: (postId: number) => void;
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

const FeedTab = ({ posts, newPost, setNewPost, addPost, toggleLike, profile }: FeedTabProps) => {
  return (
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
  );
};

export default FeedTab;