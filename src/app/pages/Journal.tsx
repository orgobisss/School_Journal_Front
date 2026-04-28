import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { students, grades, classes, subjects } from '../data/mockData';

export function Journal() {
  const [selectedClass, setSelectedClass] = useState('3А');
  const [selectedSubject, setSelectedSubject] = useState('Математика');
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [newGrade, setNewGrade] = useState({
    grade: '',
    type: 'Ответ у доски',
    date: new Date().toISOString().split('T')[0],
    comment: '',
  });

  const classStudents = students.filter((s) => s.class === selectedClass);
  const dates = ['10.03', '11.03', '12.03', '13.03', '14.03'];

  const getStudentGrade = (studentId: string, date: string) => {
    const fullDate = `2026-03-${date.split('.')[0]}`;
    const grade = grades.find(
      (g) =>
        g.studentId === studentId &&
        g.subject === selectedSubject &&
        g.date === fullDate
    );
    return grade?.grade;
  };

  const openGradeDialog = (studentId: string) => {
    setSelectedStudent(studentId);
    setGradeDialogOpen(true);
  };

  const handleSaveGrade = () => {
    console.log('Saving grade:', { studentId: selectedStudent, ...newGrade });
    setGradeDialogOpen(false);
    setNewGrade({
      grade: '',
      type: 'Ответ у доски',
      date: new Date().toISOString().split('T')[0],
      comment: '',
    });
  };

  const getGradeColor = (grade: number | undefined) => {
    if (!grade) return 'bg-gray-100 text-gray-400';
    if (grade >= 8) return 'bg-green-100 text-green-700';
    if (grade >= 6) return 'bg-blue-100 text-blue-700';
    if (grade >= 4) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Журнал класса</h1>
        <p className="text-muted-foreground text-lg">Просмотр и выставление оценок</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="class" className="text-base mb-2 block">
                Класс
              </Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class" className="h-12 text-base">
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
            <div className="flex-1">
              <Label htmlFor="subject" className="text-base mb-2 block">
                Предмет
              </Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger id="subject" className="h-12 text-base">
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
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 font-semibold text-base bg-gray-50">
                    Ученик
                  </th>
                  {dates.map((date) => (
                    <th key={date} className="p-4 font-semibold text-base bg-gray-50">
                      {date}
                    </th>
                  ))}
                  <th className="p-4 font-semibold text-base bg-gray-50">Средний балл</th>
                </tr>
              </thead>
              <tbody>
                {classStudents.map((student) => {
                  const studentGrades = dates
                    .map((date) => getStudentGrade(student.id, date))
                    .filter((g): g is number => g !== undefined);
                  const average =
                    studentGrades.length > 0
                      ? Math.round(
                          (studentGrades.reduce((a, b) => a + b, 0) / studentGrades.length) *
                            10
                        ) / 10
                      : 0;

                  return (
                    <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-medium">
                        {student.lastName} {student.firstName}
                      </td>
                      {dates.map((date) => {
                        const grade = getStudentGrade(student.id, date);
                        return (
                          <td key={date} className="p-4 text-center">
                            <button
                              onClick={() => openGradeDialog(student.id)}
                              className={`w-12 h-12 rounded-lg font-semibold text-lg transition-colors hover:opacity-80 ${getGradeColor(
                                grade
                              )}`}
                            >
                              {grade || '—'}
                            </button>
                          </td>
                        );
                      })}
                      <td className="p-4 text-center">
                        <span className="text-lg font-semibold text-primary">
                          {average > 0 ? average : '—'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex gap-3">
            <Button className="h-12 text-base">
              <Plus className="h-5 w-5 mr-2" />
              Добавить столбец
            </Button>
            <Button variant="outline" className="h-12 text-base">
              Сохранить изменения
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grade Dialog */}
      <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Выставление оценки</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="student-name" className="text-base">
                Ученик
              </Label>
              <Input
                id="student-name"
                value={
                  selectedStudent
                    ? `${students.find((s) => s.id === selectedStudent)?.lastName} ${
                        students.find((s) => s.id === selectedStudent)?.firstName
                      }`
                    : ''
                }
                disabled
                className="h-12 text-base mt-2"
              />
            </div>

            <div>
              <Label htmlFor="subject-name" className="text-base">
                Предмет
              </Label>
              <Input
                id="subject-name"
                value={selectedSubject}
                disabled
                className="h-12 text-base mt-2"
              />
            </div>

            <div>
              <Label htmlFor="date" className="text-base">
                Дата
              </Label>
              <Input
                id="date"
                type="date"
                value={newGrade.date}
                onChange={(e) => setNewGrade({ ...newGrade, date: e.target.value })}
                className="h-12 text-base mt-2"
              />
            </div>

            <div>
              <Label htmlFor="type" className="text-base">
                Тип работы
              </Label>
              <Select value={newGrade.type} onValueChange={(value) => setNewGrade({ ...newGrade, type: value })}>
                <SelectTrigger id="type" className="h-12 text-base mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Контрольная работа" className="text-base">
                    Контрольная работа
                  </SelectItem>
                  <SelectItem value="Домашняя работа" className="text-base">
                    Домашняя работа
                  </SelectItem>
                  <SelectItem value="Ответ у доски" className="text-base">
                    Ответ у доски
                  </SelectItem>
                  <SelectItem value="Тест" className="text-base">
                    Тест
                  </SelectItem>
                  <SelectItem value="Диктант" className="text-base">
                    Диктант
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base mb-3 block">Оценка</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => setNewGrade({ ...newGrade, grade: num.toString() })}
                    className={`flex-1 h-14 rounded-lg font-semibold text-xl transition-all ${
                      newGrade.grade === num.toString()
                        ? 'bg-primary text-white scale-105'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="comment" className="text-base">
                Комментарий (необязательно)
              </Label>
              <Input
                id="comment"
                value={newGrade.comment}
                onChange={(e) => setNewGrade({ ...newGrade, comment: e.target.value })}
                placeholder="Добавьте комментарий к оценке"
                className="h-12 text-base mt-2"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSaveGrade} className="flex-1 h-12 text-base">
                Сохранить
              </Button>
              <Button
                variant="outline"
                onClick={() => setGradeDialogOpen(false)}
                className="flex-1 h-12 text-base"
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
