import { useState } from 'react';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Card, CardContent } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { grades, homeworks, students } from '../data/mockData';
import { useUser } from '../contexts/UserContext';

export function Diary() {
  const [selectedTab, setSelectedTab] = useState('week');
  const { currentUser } = useUser();

  const student = students.find((s) => s.id === currentUser.id) || students[0];
  const studentGrades = grades.filter((g) => g.studentId === student.id);

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  // Группируем оценки по дням недели
  const getWeekData = () => {
    const weekDays = [
      { day: 'Понедельник', date: '10.03', lessons: [] as any[] },
      { day: 'Вторник', date: '11.03', lessons: [] as any[] },
      { day: 'Среда', date: '12.03', lessons: [] as any[] },
      { day: 'Четверг', date: '13.03', lessons: [] as any[] },
      { day: 'Пятница', date: '14.03', lessons: [] as any[] },
    ];

    const subjects = ['Математика', 'Русский язык', 'Белорусская литература', 'Окружающий мир'];

    weekDays.forEach((day, index) => {
      subjects.forEach((subject) => {
        const grade = studentGrades.find(
          (g) => g.subject === subject && g.date.includes(`2026-03-${10 + index}`)
        );
        const homework = homeworks.find((h) => h.subject === subject);

        day.lessons.push({
          subject,
          grade: grade?.grade,
          homework: homework?.description,
        });
      });
    });

    return weekDays;
  };

  const weekData = getWeekData();

  // Группируем оценки по предметам для итоговых оценок
  const getSubjectAverages = () => {
    const subjectMap = new Map();

    studentGrades.forEach((grade) => {
      if (!subjectMap.has(grade.subject)) {
        subjectMap.set(grade.subject, []);
      }
      subjectMap.get(grade.subject).push(grade.grade);
    });

    return Array.from(subjectMap.entries()).map(([subject, grades]) => {
      const average = (grades as number[]).reduce((a, b) => a + b, 0) / grades.length;
      return {
        subject,
        grades: grades as number[],
        average: Math.round(average * 10) / 10,
      };
    });
  };

  const subjectAverages = getSubjectAverages();

  const getGradeColor = (grade: number) => {
    if (grade >= 8) return 'bg-green-500';
    if (grade >= 6) return 'bg-blue-500';
    if (grade >= 4) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Avatar className="h-20 w-20 border-4 border-primary">
          <AvatarFallback className="bg-primary text-white text-xl">
            {getInitials(student.firstName, student.lastName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-semibold">
            {student.firstName} {student.lastName}
          </h1>
          <p className="text-lg text-muted-foreground">Класс {student.class}</p>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 h-12">
          <TabsTrigger value="week" className="text-base">
            Неделя
          </TabsTrigger>
          <TabsTrigger value="month" className="text-base">
            Месяц
          </TabsTrigger>
          <TabsTrigger value="final" className="text-base">
            Итоговые
          </TabsTrigger>
        </TabsList>

        <TabsContent value="week" className="space-y-4 mt-6">
          {weekData.map((day) => (
            <Card key={day.day}>
              <CardContent className="p-0">
                <div className="bg-primary text-white px-6 py-3 rounded-t-lg">
                  <h3 className="font-semibold text-lg">
                    {day.day}, {day.date}
                  </h3>
                </div>
                <div className="divide-y">
                  {day.lessons.map((lesson, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-lg mb-2">{lesson.subject}</h4>
                          {lesson.homework && (
                            <p className="text-sm text-muted-foreground">
                              <span className="font-medium">ДЗ:</span> {lesson.homework}
                            </p>
                          )}
                        </div>
                        {lesson.grade && (
                          <div
                            className={`w-14 h-14 ${getGradeColor(
                              lesson.grade
                            )} rounded-full flex items-center justify-center flex-shrink-0`}
                          >
                            <span className="text-white text-2xl font-semibold">
                              {lesson.grade}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="month" className="space-y-4 mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Март 2026</h3>
              <div className="space-y-4">
                {studentGrades.map((grade) => (
                  <div
                    key={grade.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{grade.subject}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(grade.date).toLocaleDateString('ru-RU')} • {grade.type}
                      </p>
                      {grade.comment && (
                        <p className="text-sm text-muted-foreground mt-1">{grade.comment}</p>
                      )}
                    </div>
                    <div
                      className={`w-14 h-14 ${getGradeColor(
                        grade.grade
                      )} rounded-full flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-white text-2xl font-semibold">{grade.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="final" className="space-y-4 mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">Успеваемость по предметам</h3>
              <div className="space-y-6">
                {subjectAverages.map((subject) => (
                  <div key={subject.subject} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">{subject.subject}</h4>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          Средний балл:
                        </span>
                        <span className="text-2xl font-semibold text-primary">
                          {subject.average}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {subject.grades.map((grade, index) => (
                        <div
                          key={index}
                          className={`w-12 h-12 ${getGradeColor(
                            grade
                          )} rounded-lg flex items-center justify-center`}
                        >
                          <span className="text-white font-semibold text-lg">{grade}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}