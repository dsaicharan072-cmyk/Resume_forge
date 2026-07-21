import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, FileText, LayoutDashboard, Target, Settings, Building2, Moon, Sun, Laptop } from 'lucide-react';
import { useCommandPaletteStore } from '../hooks/useCommandPalette';
import { cn } from '../utils/cn';

const commands = [
  {
    group: 'Navigation',
    items: [
      { id: 'nav-dashboard', icon: LayoutDashboard, label: 'Go to Dashboard', action: (navigate) => navigate('/dashboard') },
      { id: 'nav-resume', icon: FileText, label: 'Go to Resume', action: (navigate) => navigate('/resume') },
      { id: 'nav-career', icon: Building2, label: 'Go to Career Intelligence', action: (navigate) => navigate('/career') },
      { id: 'nav-settings', icon: Settings, label: 'Go to Settings', action: (navigate) => navigate('/settings') },
    ]
  },
  {
    group: 'Actions',
    items: [
      { id: 'action-analyze', icon: Target, label: 'Analyze Resume', action: (navigate) => navigate('/resume/analyze') },
    ]
  },
  {
    group: 'Theme',
    items: [
      { 
        id: 'theme-dark', 
        icon: Moon, 
        label: 'Switch to Dark Theme', 
        action: () => document.documentElement.classList.add('dark') 
      },
      { 
        id: 'theme-light', 
        icon: Sun, 
        label: 'Switch to Light Theme', 
        action: () => document.documentElement.classList.remove('dark') 
      },
    ]
  }
];

export const CommandPalette = () => {
  const { isOpen, close, toggle } = useCommandPaletteStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, close, toggle]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      // Focus input after a tiny delay to ensure transition completes
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredCommands = commands.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.label.toLowerCase().includes(query.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const flatItems = filteredCommands.flatMap(group => group.items);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (flatItems[selectedIndex]) {
        executeCommand(flatItems[selectedIndex]);
      }
    }
  };

  const executeCommand = (item) => {
    item.action(navigate);
    close();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity" 
        onClick={close}
      />
      
      {/* Palette */}
      <div 
        className="relative w-full max-w-xl bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-border">
          <Search size={20} className="text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            className="flex h-14 w-full bg-transparent py-3 px-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="text-[10px] font-medium text-muted-foreground px-2 py-1 bg-muted rounded-md shrink-0">
            ESC
          </div>
        </div>

        <div className="max-h-[300px] overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </div>
          ) : (
            filteredCommands.map((group, groupIndex) => (
              <div key={group.group} className="mb-4 last:mb-0">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                  {group.group}
                </div>
                {group.items.map((item) => {
                  const itemIndex = flatItems.findIndex(i => i.id === item.id);
                  const isSelected = itemIndex === selectedIndex;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => executeCommand(item)}
                      onMouseEnter={() => setSelectedIndex(itemIndex)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors",
                        isSelected ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted/50"
                      )}
                    >
                      <item.icon size={16} className={isSelected ? "text-primary" : "text-muted-foreground"} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
