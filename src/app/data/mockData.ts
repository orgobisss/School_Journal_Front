// Mock данные для демонстрации приложения

export type UserRole = 'student' | 'parent' | 'teacher';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
  class?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  class: string;
  avatar?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  date: string;
  grade: number;
  type: string;
  comment?: string;
}

export interface Homework {
  id: string;
  subject: string;
  class: string;
  description: string;
  dueDate: string;
  assignedDate: string;
  attachments?: string[];
}

export interface ScheduleLesson {
  id: string;
  class: string;
  dayOfWeek: number; // 1-5 (Пн-Пт)
  lessonNumber: number; // 1-5
  subject: string;
  teacher: string;
  room: string;
}

// Текущий пользователь (можно переключать для демонстрации)
export const currentUser: User = {
  id: '1',
  name: 'Иван Петров',
  role: 'student',
  class: '3А',
};

// Список учеников (для учителя и родителей)
export const students: Student[] = [
  { id: '1', firstName: 'Иван', lastName: 'Петров', class: '3А' },
  { id: '2', firstName: 'Мария', lastName: 'Сидорова', class: '3А' },
  { id: '3', firstName: 'Петр', lastName: 'Иванов', class: '3А' },
  { id: '4', firstName: 'Анна', lastName: 'Козлова', class: '3А' },
  { id: '5', firstName: 'Дмитрий', lastName: 'Смирнов', class: '3А' },
  { id: '6', firstName: 'Екатерина', lastName: 'Новикова', class: '3Б' },
  { id: '7', firstName: 'Александр', lastName: 'Волков', class: '3Б' },
];

// Оценки
export const grades: Grade[] = [
  {
    id: '1',
    studentId: '1',
    subject: 'Математика',
    date: '2026-03-10',
    grade: 8,
    type: 'Контрольная работа',
  },
  {
    id: '2',
    studentId: '1',
    subject: 'Русский язык',
    date: '2026-03-11',
    grade: 7,
    type: 'Диктант',
  },
  {
    id: '8',
    studentId: '1',
    subject: 'Русский язык',
    date: '2026-03-10',
    grade: 8,
    type: 'Домашняя работа',
  },
  {
    id: '3',
    studentId: '1',
    subject: 'Белорусская литература',
    date: '2026-03-12',
    grade: 10,
    type: 'Ответ у доски',
  },
  {
    id: '4',
    studentId: '3',
    subject: 'Математика',
    date: '2026-03-13',
    grade: 9,
    type: 'Домашняя работа',
  },
  {
    id: '5',
    studentId: '1',
    subject: 'Окружающий мир',
    date: '2026-03-14',
    grade: 9,
    type: 'Тест',
  },
  {
    id: '9',
    studentId: '1',
    subject: 'Окружающий мир',
    date: '2026-03-10',
    grade: 5,
    type: 'Ответ у доски',
  },
  {
    id: '6',
    studentId: '2',
    subject: 'Математика',
    date: '2026-03-10',
    grade: 6,
    type: 'Контрольная работа',
  },
  {
    id: '7',
    studentId: '3',
    subject: 'Математика',
    date: '2026-03-10',
    grade: 5,
    type: 'Контрольная работа',
  },
];

// Домашние задания
export const homeworks: Homework[] = [
  {
    id: '1',
    subject: 'Математика',
    class: '3А',
    description: 'Учебник стр. 45, задачи 3, 4, 5. Решить в тетради.',
    dueDate: '2026-03-17',
    assignedDate: '2026-03-15',
  },
  {
    id: '2',
    subject: 'Русский язык',
    class: '3А',
    description: 'Упражнение 128, написать сочинение "Моя семья" (10-12 предложений).',
    dueDate: '2026-03-18',
    assignedDate: '2026-03-15',
  },
  {
    id: '3',
    subject: 'Белорусская литература',
    class: '3А',
    description: 'Прочитать рассказ "Белолобый" А.П. Чехова, ответить на вопросы после текста.',
    dueDate: '2026-03-19',
    assignedDate: '2026-03-15',
  },
  {
    id: '4',
    subject: 'Окружающий мир',
    class: '3А',
    description: 'Подготовить доклад о любом животном (5-7 предложений), можно с картинками.',
    dueDate: '2026-03-20',
    assignedDate: '2026-03-14',
  },
];

// Расписание
export const schedule: ScheduleLesson[] = [
  // Понедельник
  { id: '1', class: '3А', dayOfWeek: 1, lessonNumber: 1, subject: 'Математика', teacher: 'Мария Ивановна', room: '201' },
  { id: '2', class: '3А', dayOfWeek: 1, lessonNumber: 2, subject: 'Русский язык', teacher: 'Мария Ивановна', room: '201' },
  { id: '3', class: '3А', dayOfWeek: 1, lessonNumber: 3, subject: 'Белорусская литература', teacher: 'Мария Ивановна', room: '201' },
  { id: '4', class: '3А', dayOfWeek: 1, lessonNumber: 4, subject: 'Физкультура', teacher: 'Сергей Петрович', room: 'Спортзал' },
  
  // Вторник
  { id: '5', class: '3А', dayOfWeek: 2, lessonNumber: 1, subject: 'Русский язык', teacher: 'Мария Ивановна', room: '201' },
  { id: '6', class: '3А', dayOfWeek: 2, lessonNumber: 2, subject: 'Математика', teacher: 'Мария Ивановна', room: '201' },
  { id: '7', class: '3А', dayOfWeek: 2, lessonNumber: 3, subject: 'Окружающий мир', teacher: 'Мария Ивановна', room: '201' },
  { id: '8', class: '3А', dayOfWeek: 2, lessonNumber: 4, subject: 'Музыка', teacher: 'Елена Васильевна', room: '305' },
  
  // Среда
  { id: '9', class: '3А', dayOfWeek: 3, lessonNumber: 1, subject: 'Математика', teacher: 'Мария Ивановна', room: '201' },
  { id: '10', class: '3А', dayOfWeek: 3, lessonNumber: 2, subject: 'Русский язык', teacher: 'Мария Ивановна', room: '201' },
  { id: '11', class: '3А', dayOfWeek: 3, lessonNumber: 3, subject: 'Английский язык', teacher: 'Ольга Сергеевна', room: '102' },
  { id: '12', class: '3А', dayOfWeek: 3, lessonNumber: 4, subject: 'ИЗО', teacher: 'Анна Николаевна', room: '308' },
  
  // Четверг
  { id: '13', class: '3А', dayOfWeek: 4, lessonNumber: 1, subject: 'Белорусская литература', teacher: 'Мария Ивановна', room: '201' },
  { id: '14', class: '3А', dayOfWeek: 4, lessonNumber: 2, subject: 'Математика', teacher: 'Мария Ивановна', room: '201' },
  { id: '15', class: '3А', dayOfWeek: 4, lessonNumber: 3, subject: 'Труды', teacher: 'Ирина Павловна', room: '210' },
  { id: '16', class: '3А', dayOfWeek: 4, lessonNumber: 4, subject: 'Физкультура', teacher: 'Сергей Петрович', room: 'Спортзал' },
  
  // Пятница
  { id: '17', class: '3А', dayOfWeek: 5, lessonNumber: 1, subject: 'Русский язык', teacher: 'Мария Ивановна', room: '201' },
  { id: '18', class: '3А', dayOfWeek: 5, lessonNumber: 2, subject: 'Математика', teacher: 'Мария Ивановна', room: '201' },
  { id: '19', class: '3А', dayOfWeek: 5, lessonNumber: 3, subject: 'Окружающий мир', teacher: 'Мария Ивановна', room: '201' },
  { id: '20', class: '3А', dayOfWeek: 5, lessonNumber: 4, subject: 'Английский язык', teacher: 'Ольга Сергеевна', room: '102' },
];

export const subjects = [
  'Математика',
  'Русский язык',
  'Белорусская литература',
  'Окружающий мир',
  'Английский язык',
  'Физкультура',
  'Музыка',
  'ИЗО',
  'Труды',
];

export const classes = ['3А', '3Б', '4А', '4Б'];
