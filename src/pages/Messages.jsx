
import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Image as ImageIcon, Smile } from 'lucide-react';

const mockConversations = [
    { id: 1, name: "Dr. James Carter", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James", lastMessage: "Don't forget the assignment is due tomorrow.", time: "10:30 AM", unread: 2, status: 'online' },
    { id: 2, name: "Physics Group", avatar: "group", lastMessage: "Sarah: Has anyone solved Q3?", time: "09:15 AM", unread: 5, status: 'online', isGroup: true },
    { id: 3, name: "Ms. Diana Ross", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Diana", lastMessage: "Great work on your essay!", time: "Yesterday", unread: 0, status: 'offline' },
    { id: 4, name: "Alex Rivera", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", lastMessage: "Can we study together later?", time: "Yesterday", unread: 0, status: 'online' },
    { id: 5, name: "Support Team", avatar: "support", lastMessage: "Your ticket #1234 has been resolved.", time: "Mon", unread: 0, status: 'offline' },
];

const mockMessages = {
    1: [
        { id: 1, senderId: 'me', text: "Hi Dr. Carter, I had a question about the calculus problem.", time: "10:00 AM" },
        { id: 2, senderId: 1, text: "Sure, go ahead. Which problem specifically?", time: "10:05 AM" },
        { id: 3, senderId: 'me', text: "Problem 5 from the homework sheet. I'm stuck on the integration part.", time: "10:08 AM" },
        { id: 4, senderId: 1, text: "Ah, that one requires integration by parts. Try setting u = ln(x).", time: "10:15 AM" },
        { id: 5, senderId: 1, text: "Don't forget the assignment is due tomorrow.", time: "10:30 AM" },
    ],
    2: [
        { id: 1, senderId: 4, name: "Alex", text: "Hey guys, when is the lab due?", time: "09:00 AM" },
        { id: 2, senderId: 6, name: "Jessica", text: "I think it's Friday.", time: "09:05 AM" },
        { id: 3, senderId: 7, name: "Sarah", text: "Has anyone solved Q3?", time: "09:15 AM" },
    ]
};

const Messages = () => {
    const [activeConversation, setActiveConversation] = useState(mockConversations[0]);
    const [messages, setMessages] = useState(mockMessages[1]);
    const [inputText, setInputText] = useState("");

    const handleConversationClick = (conv) => {
        setActiveConversation(conv);
        setMessages(mockMessages[conv.id] || []);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage = {
            id: Date.now(),
            senderId: 'me',
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputText("");
    };

    return (
        <AppLayout>
            <div className="flex h-[calc(100vh-100px)] -mt-4 -mx-4 lg:-mx-8 border-t border-border/40">
                {/* Sidebar - Conversation List */}
                <div className="w-full md:w-80 lg:w-96 border-r border-border/40 flex flex-col bg-card/30">
                    <div className="p-4 border-b border-border/40">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input placeholder="Search messages..." className="pl-9 bg-secondary/50 border-0 focus-visible:ring-1" />
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="flex flex-col">
                            {mockConversations.map(conv => (
                                <button
                                    key={conv.id}
                                    onClick={() => handleConversationClick(conv)}
                                    className={`flex items-start gap-3 p-4 text-left transition-colors hover:bg-accent/5 ${activeConversation.id === conv.id ? 'bg-primary/5 border-r-2 border-primary' : ''}`}
                                >
                                    <div className="relative">
                                        <Avatar className="w-10 h-10 border border-border">
                                            {conv.isGroup ? (
                                                <AvatarFallback className="bg-primary/10 text-primary">GR</AvatarFallback>
                                            ) : (
                                                <AvatarImage src={conv.avatar} />
                                            )}
                                            <AvatarFallback>{conv.name[0]}</AvatarFallback>
                                        </Avatar>
                                        {conv.status === 'online' && (
                                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-background"></span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 overflow-hidden">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className={`font-medium truncate ${conv.unread > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>{conv.name}</span>
                                            <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">{conv.time}</span>
                                        </div>
                                        <p className={`text-xs truncate ${conv.unread > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                                            {conv.lastMessage}
                                        </p>
                                    </div>
                                    {conv.unread > 0 && (
                                        <div className="flex flex-col justify-center h-10">
                                            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold">
                                                {conv.unread}
                                            </span>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Main Chat Area */}
                <div className="hidden md:flex flex-1 flex-col bg-background">
                    {/* Chat Header */}
                    <div className="h-16 border-b border-border/40 flex items-center justify-between px-6 bg-card/30 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-9 h-9 border border-border">
                                {activeConversation.isGroup ? (
                                    <AvatarFallback className="bg-primary/10 text-primary">GR</AvatarFallback>
                                ) : (
                                    <AvatarImage src={activeConversation.avatar} />
                                )}
                                <AvatarFallback>{activeConversation.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="font-semibold text-sm">{activeConversation.name}</h2>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    {activeConversation.status === 'online' ? (
                                        <><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online</>
                                    ) : 'Offline'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                                <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                                <Video className="w-4 h-4" />
                            </Button>
                            <Separator orientation="vertical" className="h-6 mx-2" />
                            <Button variant="ghost" size="icon" className="text-muted-foreground">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Messages List */}
                    <ScrollArea className="flex-1 p-6">
                        <div className="space-y-6">
                            <div className="flex justify-center">
                                <span className="text-xs text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full">Today</span>
                            </div>

                            {messages.map((msg) => {
                                const isMe = msg.senderId === 'me';
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} gap-3 max-w-[80%] ${isMe ? 'ml-auto' : ''}`}>
                                        {!isMe && (
                                            <Avatar className="w-8 h-8 mt-1 border border-border">
                                                {activeConversation.isGroup ? (
                                                    <AvatarFallback className="text-[10px]">{msg.name?.[0]}</AvatarFallback>
                                                ) : (
                                                    <AvatarImage src={activeConversation.avatar} />
                                                )}
                                                <AvatarFallback>{activeConversation.name[0]}</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                            {activeConversation.isGroup && !isMe && (
                                                <span className="text-[10px] text-muted-foreground ml-1 mb-1">{msg.name}</span>
                                            )}
                                            <div className={`p-3 rounded-2xl text-sm ${isMe ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-secondary text-secondary-foreground rounded-tl-none'}`}>
                                                {msg.text}
                                            </div>
                                            <span className="text-[10px] text-muted-foreground mt-1 px-1">
                                                {msg.time}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 border-t border-border/40 bg-card/30">
                        <form onSubmit={handleSendMessage} className="flex items-end gap-2 bg-background border rounded-xl p-2 shadow-sm focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                            <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground shrink-0 rounded-lg">
                                <Paperclip className="w-4 h-4" />
                            </Button>
                            <Input
                                placeholder="Type a message..."
                                className="border-0 focus-visible:ring-0 px-2 py-2 h-auto min-h-[36px] max-h-32 resize-none"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <div className="flex items-center gap-1 shrink-0">
                                <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground rounded-lg">
                                    <Smile className="w-4 h-4" />
                                </Button>
                                <Button type="submit" size="icon" className="h-9 w-9 gradient-primary text-primary-foreground rounded-lg shadow-sm" disabled={!inputText.trim()}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Messages;
