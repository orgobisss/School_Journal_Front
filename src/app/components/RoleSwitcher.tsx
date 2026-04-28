import { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Card, CardContent } from './ui/card';
import { User, GraduationCap, Users } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { UserRole } from '../data/mockData';

export function RoleSwitcher() {
  const [open, setOpen] = useState(false);
  const { setUserRole } = useUser();

  const roles = [
    {
      id: 'student' as UserRole,
      name: 'Ученик',
      description: 'Иван Петров, 3А класс',
      icon: GraduationCap,
      color: 'bg-blue-500',
    },
    {
      id: 'parent' as UserRole,
      name: 'Родитель',
      description: 'Ольга Сергеевна',
      icon: Users,
      color: 'bg-purple-500',
    },
    {
      id: 'teacher' as UserRole,
      name: 'Учитель',
      description: 'Мария Ивановна',
      icon: User,
      color: 'bg-green-500',
    },
  ];

  const handleRoleSelect = (roleId: UserRole) => {
    setUserRole(roleId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="fixed bottom-4 right-4 z-50 shadow-lg h-12 text-base"
        >
          <User className="h-5 w-5 mr-2" />
          Сменить роль
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Выберите роль пользователя</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-primary"
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{role.name}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* <p className="text-sm text-muted-foreground text-center pt-2">
          Это демо-режим для переключения между ролями пользователей
        </p> */}
      </DialogContent>
    </Dialog>
  );
}