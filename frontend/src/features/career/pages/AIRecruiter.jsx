import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/Card';
import Button from '../../../components/Button';
import { Send, Sparkles, User, Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

const AIRecruiter = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hi there! I am your AI Recruiter. I have reviewed your resume and matched you with Stripe and Vercel. Would you like to do a quick mock screening, or should I review your system design skills?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: `That's great. Regarding "${userMessage}", let's dive deeper. Can you explain how you would handle state management in a massive Next.js application like Vercel's dashboard?` 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex flex-col gap-2 mb-6 shrink-0">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <Sparkles className="text-primary" /> AI Recruiter
        </h1>
        <p className="text-muted-foreground">Practice your pitch and technical screening with our conversational agent.</p>
      </div>

      <Card className="flex-1 flex flex-col min-h-0 border-border overflow-hidden shadow-lg">
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={cn("flex gap-4 max-w-[80%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0", 
                msg.role === 'ai' ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              )}>
                {msg.role === 'ai' ? <Sparkles size={16} /> : <User size={16} />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm",
                msg.role === 'ai' ? "bg-muted rounded-tl-none" : "bg-primary text-primary-foreground rounded-tr-none"
              )}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4 max-w-[80%]">
               <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Sparkles size={16} />
              </div>
              <div className="p-4 rounded-2xl bg-muted rounded-tl-none flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-muted-foreground" />
                <span className="text-xs text-muted-foreground">AI is typing...</span>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 border-t border-border bg-card">
          <form onSubmit={handleSend} className="flex w-full gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your response..." 
              className="flex-1 bg-muted/50 border border-border rounded-full px-6 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              disabled={isTyping}
            />
            <Button type="submit" disabled={!input.trim() || isTyping} className="rounded-full px-6">
              Send <Send size={16} className="ml-2" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIRecruiter;
