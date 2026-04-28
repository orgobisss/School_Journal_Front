import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  BookOpen,
  Calendar,
  Home,
  Menu,
  ClipboardList,
  BookMarked,
  LogOut,
  User,
  X,
} from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useUser } from '../contexts/UserContext';
import { RoleSwitcher } from './RoleSwitcher';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentUser } = useUser();

  const getNavigationItems = () => {
    const baseItems = [
      { path: '/', icon: Home, label: 'Главная' },
      { path: '/schedule', icon: Calendar, label: 'Расписание' },
    ];

    if (currentUser.role === 'student') {
      return [
        ...baseItems,
        { path: '/diary', icon: BookOpen, label: 'Мой дневник' },
        { path: '/homework', icon: ClipboardList, label: 'Домашние задания' },
      ];
    }

    if (currentUser.role === 'parent') {
      return [
        ...baseItems,
        { path: '/diary', icon: BookOpen, label: 'Дневник ребёнка' },
        { path: '/homework', icon: ClipboardList, label: 'Домашние задания' },
      ];
    }

    if (currentUser.role === 'teacher') {
      return [
        ...baseItems,
        { path: '/journal', icon: BookMarked, label: 'Журнал' },
        { path: '/homework', icon: ClipboardList, label: 'Домашние задания' },
      ];
    }

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 md:px-6 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold">Электронный журнал</h1>
                <p className="text-xs text-muted-foreground hidden md:block">
                  Начальная школа
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground hidden md:block">
              {new Date().toLocaleDateString('ru-RU', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarFallback className="bg-primary text-white text-base">
                      {getInitials(currentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col gap-1 p-2">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {currentUser.role === 'student' && 'Ученик'}
                    {currentUser.role === 'parent' && 'Родитель'}
                    {currentUser.role === 'teacher' && 'Учитель'}
                    {currentUser.class && ` • ${currentUser.class}`}
                  </p>
                </div>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Профиль</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:sticky top-[73px] left-0 h-[calc(100vh-73px)] bg-white border-r border-gray-200 
            transition-transform duration-300 ease-in-out z-30
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            w-64
          `}
        >
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Role Switcher */}
      <RoleSwitcher />
    </div>
  );
}