import { Link } from 'react-router';
import { BookOpen, Calendar, ClipboardList, BookMarked, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useUser } from '../contexts/UserContext';

export function Home() {
  const { currentUser } = useUser();

  const getGreeting = () => {
    if (currentUser.role === 'student') {
      return `Привет, ${currentUser.name.split(' ')[0]}!`;
    }
    if (currentUser.role === 'parent') {
      return `Здравствуйте, ${currentUser.name}!`;
    }
    if (currentUser.role === 'teacher') {
      return `Здравствуйте, ${currentUser.name}!`;
    }
    return 'Добро пожаловать!';
  };

  const getStudentCards = () => [
    {
      title: 'Мой дневник',
      description: 'Просмотр оценок и расписания',
      icon: BookOpen,
      path: '/diary',
      color: 'bg-green-500',
    },
    {
      title: 'Расписание',
      description: 'Расписание уроков на неделю',
      icon: Calendar,
      path: '/schedule',
      color: 'bg-blue-500',
    },
    {
      title: 'Домашние задания',
      description: 'Актуальные задания по предметам',
      icon: ClipboardList,
      path: '/homework',
      color: 'bg-orange-500',
    },
  ];

  const getParentCards = () => [
    {
      title: `Дневник ребёнка`,
      description: 'Успеваемость и оценки',
      icon: BookOpen,
      path: '/diary',
      color: 'bg-green-500',
    },
    {
      title: 'Успеваемость',
      description: 'Сводка по предметам',
      icon: ClipboardList,
      path: '/diary',
      color: 'bg-purple-500',
    },
    {
      title: 'Расписание',
      description: 'Расписание уроков',
      icon: Calendar,
      path: '/schedule',
      color: 'bg-blue-500',
    },
  ];

  const getTeacherCards = () => [
    {
      title: 'Мои классы',
      description: 'Список закреплённых классов',
      icon: Users,
      path: '/journal',
      color: 'bg-indigo-500',
    },
    {
      title: 'Журнал',
      description: 'Выставление оценок',
      icon: BookMarked,
      path: '/journal',
      color: 'bg-green-500',
    },
    {
      title: 'Расписание',
      description: 'Моё расписание уроков',
      icon: Calendar,
      path: '/schedule',
      color: 'bg-blue-500',
    },
    {
      title: 'Домашние задания',
      description: 'Создать и просмотреть задания',
      icon: ClipboardList,
      path: '/homework',
      color: 'bg-orange-500',
    },
  ];

  const getCards = () => {
    if (currentUser.role === 'student') return getStudentCards();
    if (currentUser.role === 'parent') return getParentCards();
    if (currentUser.role === 'teacher') return getTeacherCards();
    return [];
  };

  const cards = getCards();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold">{getGreeting()}</h1>
        {currentUser.class && (
          <p className="text-lg text-muted-foreground">Класс {currentUser.class}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.path} to={card.path}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-2 hover:border-primary">
                <CardHeader>
                  <div className={`w-14 h-14 ${card.color} rounded-xl flex items-center justify-center mb-3`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-base">{card.description}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {currentUser.role === 'teacher' && (
        <Card className="border-2 border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <ClipboardList className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Непроверенные работы</h3>
                <p className="text-muted-foreground">У вас 5 непроверенных контрольных работ</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}