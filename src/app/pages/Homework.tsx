import { useState } from 'react';
import { Plus, Calendar, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { homeworks, classes, subjects } from '../data/mockData';
import { useUser } from '../contexts/UserContext';

export function Homework() {
  const { currentUser } = useUser();
  const [homeworkDialogOpen, setHomeworkDialogOpen] = useState(false);
  const [newHomework, setNewHomework] = useState({
    subject: 'Математика',
    class: currentUser.class || '3А',
    assignedDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    description: '',
  });

  const userHomeworks =
    currentUser.role === 'teacher'
      ? homeworks
      : homeworks.filter((h) => h.class === currentUser.class);

  const handleSaveHomework = () => {
    console.log('Saving homework:', newHomework);
    setHomeworkDialogOpen(false);
    setNewHomework({
      subject: 'Математика',
      class: currentUser.class || '3А',
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      description: '',
    });
  };

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      'Математика': 'bg-blue-500',
      'Русский язык': 'bg-red-500',
      'Белорусская литература': 'bg-purple-500',
      'Окружающий мир': 'bg-green-500',
      'Английский язык': 'bg-yellow-500',
    };
    return colors[subject] || 'bg-gray-500';
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const sortedHomeworks = [...userHomeworks].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Домашние задания</h1>
          <p className="text-muted-foreground text-lg">
            {currentUser.role === 'teacher'
              ? 'Создавайте и управляйте заданиями'
              : 'Актуальные задания по предметам'}
          </p>
        </div>
        {currentUser.role === 'teacher' && (
          <Button onClick={() => setHomeworkDialogOpen(true)} size="lg" className="h-12 text-base">
            <Plus className="h-5 w-5 mr-2" />
            Новое задание
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {sortedHomeworks.map((homework) => {
          const daysUntil = getDaysUntilDue(homework.dueDate);
          const isOverdue = daysUntil < 0;
          const isDueSoon = daysUntil >= 0 && daysUntil <= 2;

          return (
            <Card
              key={homework.id}
              className={`border-l-4 ${
                isOverdue
                  ? 'border-l-red-500'
                  : isDueSoon
                  ? 'border-l-orange-500'
                  : 'border-l-primary'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`w-12 h-12 ${getSubjectColor(
                        homework.subject
                      )} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{homework.subject}</CardTitle>
                        {currentUser.role === 'teacher' && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {homework.class}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Срок:{' '}
                            {new Date(homework.dueDate).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                            })}
                          </span>
                        </div>
                        {isOverdue ? (
                          <span className="text-red-600 font-medium">Просрочено</span>
                        ) : isDueSoon ? (
                          <span className="text-orange-600 font-medium">
                            Осталось {daysUntil} {daysUntil === 1 ? 'день' : 'дня'}
                          </span>
                        ) : (
                          <span className="text-green-600 font-medium">
                            Осталось {daysUntil} дней
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base whitespace-pre-line">{homework.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {sortedHomeworks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Нет домашних заданий</h3>
            <p className="text-muted-foreground">
              {currentUser.role === 'teacher'
                ? 'Создайте первое задание для класса'
                : 'На данный момент нет активных заданий'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Homework Dialog */}
      <Dialog open={homeworkDialogOpen} onOpenChange={setHomeworkDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Новое домашнее задание — {newHomework.class} класс
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hw-subject" className="text-base">
                  Предмет
                </Label>
                <Select
                  value={newHomework.subject}
                  onValueChange={(value) => setNewHomework({ ...newHomework, subject: value })}
                >
                  <SelectTrigger id="hw-subject" className="h-12 text-base mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject} className="text-base">
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="hw-class" className="text-base">
                  Класс
                </Label>
                <Select
                  value={newHomework.class}
                  onValueChange={(value) => setNewHomework({ ...newHomework, class: value })}
                >
                  <SelectTrigger id="hw-class" className="h-12 text-base mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls} className="text-base">
                        {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hw-assigned-date" className="text-base">
                  Дата выдачи
                </Label>
                <Input
                  id="hw-assigned-date"
                  type="date"
                  value={newHomework.assignedDate}
                  onChange={(e) =>
                    setNewHomework({ ...newHomework, assignedDate: e.target.value })
                  }
                  className="h-12 text-base mt-2"
                />
              </div>

              <div>
                <Label htmlFor="hw-due-date" className="text-base">
                  Срок сдачи
                </Label>
                <Input
                  id="hw-due-date"
                  type="date"
                  value={newHomework.dueDate}
                  onChange={(e) => setNewHomework({ ...newHomework, dueDate: e.target.value })}
                  className="h-12 text-base mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="hw-description" className="text-base">
                Описание задания
              </Label>
              <Textarea
                id="hw-description"
                value={newHomework.description}
                onChange={(e) => setNewHomework({ ...newHomework, description: e.target.value })}
                placeholder="Введите текст задания..."
                rows={8}
                className="text-base mt-2 resize-none"
              />
            </div>

            <div>
              <Label className="text-base mb-2 block">Прикрепить файл</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Перетащите файл сюда или нажмите для выбора
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSaveHomework} className="flex-1 h-12 text-base">
                Опубликовать
              </Button>
              <Button variant="outline" className="flex-1 h-12 text-base">
                Сохранить как черновик
              </Button>
              <Button
                variant="ghost"
                onClick={() => setHomeworkDialogOpen(false)}
                className="h-12 text-base"
              >
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}