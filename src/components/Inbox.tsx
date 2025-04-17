
import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Mail, Trash } from 'lucide-react';
import { EmailMessage, generateMessages } from '@/data/messages';
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

interface InboxProps {
  email: string;
}

const Inbox = ({ email }: InboxProps) => {
  const [messages, setMessages] = useState<EmailMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<EmailMessage | null>(null);
  
  // Generate messages when the email changes
  useEffect(() => {
    if (email) {
      refreshInbox();
    }
  }, [email]);
  
  const refreshInbox = () => {
    setLoading(true);
    // Simulate network delay for realism
    setTimeout(() => {
      const newMessages = generateMessages(email, 5);
      setMessages(newMessages);
      setLoading(false);
    }, 800);
  };
  
  const handleMessageClick = (message: EmailMessage) => {
    // Mark as read and select
    if (!message.read) {
      const updatedMessages = messages.map(m => 
        m.id === message.id ? { ...m, read: true } : m
      );
      setMessages(updatedMessages);
    }
    setSelectedMessage(message);
  };
  
  const handleDeleteMessage = (messageId: string) => {
    const updatedMessages = messages.filter(m => m.id !== messageId);
    setMessages(updatedMessages);
    if (selectedMessage && selectedMessage.id === messageId) {
      setSelectedMessage(null);
    }
  };
  
  const unreadCount = messages.filter(m => !m.read).length;
  
  return (
    <div className="bg-black/10 backdrop-blur-xl border border-white/10 rounded-xl p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Inbox for {email}</h2>
        <Button 
          onClick={refreshInbox} 
          variant="outline" 
          size="sm" 
          disabled={loading}
          className="text-gray-300 border-gray-700 hover:bg-gray-800"
        >
          <RefreshCw size={16} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      <Tabs defaultValue="inbox">
        <TabsList className="bg-black/30 border border-gray-800">
          <TabsTrigger value="inbox" className="data-[state=active]:bg-gray-800">
            Inbox
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-purple-600 text-white">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="inbox" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px]">
            {/* Message List */}
            <div className="md:col-span-1 border border-gray-800 rounded-md overflow-hidden">
              <ScrollArea className="h-[400px]">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full p-4 text-gray-400">
                    <Mail size={32} className="mb-2" />
                    <p className="text-center">No messages yet</p>
                    <Button 
                      onClick={refreshInbox} 
                      variant="link" 
                      size="sm"
                      className="mt-2"
                    >
                      Check for new messages
                    </Button>
                  </div>
                ) : (
                  <div>
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        onClick={() => handleMessageClick(message)}
                        className={`
                          p-3 border-b border-gray-800 cursor-pointer hover:bg-gray-800/50
                          ${selectedMessage?.id === message.id ? 'bg-gray-800/70' : ''}
                          ${!message.read ? 'bg-black/40' : ''}
                        `}
                      >
                        <div className="flex justify-between">
                          <p className={`font-medium text-sm ${!message.read ? 'text-white' : 'text-gray-300'}`}>
                            {message.from.split('@')[0]}
                          </p>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(message.date, { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm truncate text-gray-400">
                          {message.subject}
                        </p>
                        {!message.read && (
                          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
            
            {/* Message Content */}
            <div className="md:col-span-2 border border-gray-800 rounded-md p-4 h-[400px] overflow-auto">
              {selectedMessage ? (
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {selectedMessage.subject}
                      </h3>
                      <p className="text-sm text-gray-400">
                        From: {selectedMessage.from}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedMessage.date.toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      className="text-gray-400 hover:text-red-400 hover:bg-transparent"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                  <div className="border-t border-gray-800 pt-4 mt-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-300 font-sans">
                      {selectedMessage.content}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Mail size={32} className="mb-2" />
                  <p>Select a message to view its contents</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inbox;
