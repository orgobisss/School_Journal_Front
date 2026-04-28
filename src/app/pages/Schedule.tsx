import { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Label } from '../components/ui/label';
import { schedule, classes } from '../data/mockData';
import { useUser } from '../contexts/UserContext';
import { Edit } from 'lucide-react';

export function Schedule() {
  const { currentUser } = useUser();
  const [selectedClass, setSelectedClass] = useState(currentUser.class || '3А');
  const [isEditing, setIsEditing] = useState(false);

  const daysOfWeek = [
    { id: 1, name: 'Понедельник', short: 'Пн' },
    { id: 2, name: 'Вторник', short: 'Вт' },
    { id: 3, name: 'Среда', short: 'Ср' },
    { id: 4, name: 'Четверг', short: 'Чт' },
    { id: 5, name: 'Пятница', short: 'Пт' },
  ];

  const lessons = [1, 2, 3, 4];

  const getLesson = (dayId: number, lessonNumber: number) => {
    return schedule.find(
      (s) =>
        s.class === selectedClass &&
        s.dayOfWeek === dayId &&
        s.lessonNumber === lessonNumber
    );
  };

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      'Математика': 'bg-blue-100 border-blue-300',
      'Русский язык': 'bg-red-100 border-red-300',
      'Белорусская литература': 'bg-purple-100 border-purple-300',
      'Окружающий мир': 'bg-green-100 border-green-300',
      'Английский язык': 'bg-yellow-100 border-yellow-300',
      'Физкультура': 'bg-orange-100 border-orange-300',
      'Музыка': 'bg-pink-100 border-pink-300',
      'ИЗО': 'bg-indigo-100 border-indigo-300',
      'Труды': 'bg-teal-100 border-teal-300',
    };
    return colors[subject] || 'bg-gray-100 border-gray-300';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Расписание уроков</h1>
        <p className="text-muted-foreground text-lg">Расписание на неделю</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
            {currentUser.role === 'teacher' && (
              <div className="flex-1">
                <Label htmlFor="class-select" className="text-base mb-2 block">
                  Класс
                </Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger id="class-select" className="h-12 text-base">
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
            )}
            {currentUser.role === 'teacher' && (
              <Button
                variant={isEditing ? 'default' : 'outline'}
                onClick={() => setIsEditing(!isEditing)}
                className="h-12 text-base"
              >
                <Edit className="h-5 w-5 mr-2" />
                {isEditing ? 'Сохранить' : 'Редактировать'}
              </Button>
            )}
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left font-semibold text-base bg-gray-50 border border-gray-200">
                    Урок
                  </th>
                  {daysOfWeek.map((day) => (
                    <th
                      key={day.id}
                      className="p-3 text-center font-semibold text-base bg-gray-50 border border-gray-200"
                    >
                      {day.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lessons.map((lessonNumber) => (
                  <tr key={lessonNumber}>
                    <td className="p-3 text-center font-semibold bg-gray-50 border border-gray-200">
                      <div className="text-lg">{lessonNumber}</div>
                      <div className="text-xs text-muted-foreground">
                        {lessonNumber === 1 && '8:00-8:45'}
                        {lessonNumber === 2 && '9:00-9:45'}
                        {lessonNumber === 3 && '10:00-10:45'}
                        {lessonNumber === 4 && '11:00-11:45'}
                      </div>
                    </td>
                    {daysOfWeek.map((day) => {
                      const lesson = getLesson(day.id, lessonNumber);
                      return (
                        <td
                          key={day.id}
                          className="p-3 border border-gray-200 align-top"
                        >
                          {lesson ? (
                            <div
                              className={`p-3 rounded-lg border-2 ${getSubjectColor(
                                lesson.subject
                              )} min-h-[100px]`}
                            >
                              <div className="font-semibold text-base mb-1">
                                {lesson.subject}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Каб. {lesson.room}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {lesson.teacher}
                              </div>
                            </div>
                          ) : (
                            <div className="h-[100px]"></div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            {daysOfWeek.map((day) => (
              <Card key={day.id}>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-4 text-primary">
                    {day.name}
                  </h3>
                  <div className="space-y-3">
                    {lessons.map((lessonNumber) => {
                      const lesson = getLesson(day.id, lessonNumber);
                      return (
                        <div key={lessonNumber}>
                          {lesson ? (
                            <div
                              className={`p-4 rounded-lg border-2 ${getSubjectColor(
                                lesson.subject
                              )}`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <span className="text-sm font-medium text-muted-foreground">
                                  {lessonNumber} урок
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {lessonNumber === 1 && '8:00-8:45'}
                                  {lessonNumber === 2 && '9:00-9:45'}
                                  {lessonNumber === 3 && '10:00-10:45'}
                                  {lessonNumber === 4 && '11:00-11:45'}
                                </span>
                              </div>
                              <div className="font-semibold text-base mb-1">
                                {lesson.subject}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Каб. {lesson.room} • {lesson.teacher}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}