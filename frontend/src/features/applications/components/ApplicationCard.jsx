import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '../../../components/Card';
import Badge from '../../../components/Badge';
import { MoreHorizontal, Calendar, DollarSign, Building2 } from 'lucide-react';
import { useUpdateApplicationStatus } from '../hooks/useApplications';

const statuses = [
  { id: 'wishlist', label: 'Wishlist', color: 'bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700' },
  { id: 'applied', label: 'Applied', color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/30' },
  { id: 'interviewing', label: 'Interviewing', color: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/30' },
  { id: 'offer', label: 'Offer', color: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/30' },
  { id: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/30' },
];

export const ApplicationCard = ({ application }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { mutate: updateStatus } = useUpdateApplicationStatus();

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStatusChange = (newStatus) => {
    if (newStatus !== application.status) {
      updateStatus({ id: application.id, status: newStatus });
    }
    setIsMenuOpen(false);
  };

  const currentStatusObj = statuses.find(s => s.id === application.status);

  return (
    <Card className="hover:shadow-md transition-shadow group cursor-pointer relative overflow-visible">
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-muted flex items-center justify-center font-bold text-sm">
              {application.logo}
            </div>
            <div>
              <h3 className="font-semibold text-sm leading-tight">{application.company}</h3>
              <p className="text-xs text-muted-foreground">{application.role}</p>
            </div>
          </div>
          
          <div className="relative" ref={menuRef}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="p-1 rounded text-muted-foreground hover:bg-muted transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <MoreHorizontal size={16} />
            </button>
            
            {/* Status Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-6 w-36 bg-popover border border-border rounded-md shadow-lg z-50 py-1 overflow-hidden">
                <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Move to...
                </div>
                {statuses.map(s => (
                  <button
                    key={s.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(s.id);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-muted transition-colors ${application.status === s.id ? 'font-bold' : ''}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {application.salary && (
            <Badge variant="outline" className="text-[10px] h-5 py-0 px-1.5 flex items-center gap-1">
              <DollarSign size={10} /> {application.salary}
            </Badge>
          )}
          {application.dateApplied && (
            <Badge variant="outline" className="text-[10px] h-5 py-0 px-1.5 flex items-center gap-1">
              <Calendar size={10} /> {application.dateApplied}
            </Badge>
          )}
        </div>
        
        {/* Visual Indicator of Status */}
        <div className={`h-1 w-full absolute bottom-0 left-0 rounded-b-xl opacity-70 ${currentStatusObj?.color.split(' ')[0]}`}></div>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
