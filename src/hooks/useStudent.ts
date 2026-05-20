const STUDENTS_KEY = "mp_students";
const CURRENT_KEY = "mp_current";
const PROGRESS_KEY = "mp_progress";

export interface ModuleResult {
  score: number;
  total: number;
  stars: number;
  date: string;
  attempts: number;
}

export interface StudentProgress {
  [moduleId: string]: ModuleResult;
}

export interface AllProgress {
  [student: string]: StudentProgress;
}

export const MODULE_LABELS: Record<string, string> = {
  matematicas: "Figuras 3D",
  "ciencias-naturales": "Ciclo del Agua",
  "ciencias-sociales": "Nuestro Planeta",
  lenguaje: "Lectura",
  historia: "Historia",
  logica: "Lógica",
};

export function getStudents(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STUDENTS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function addStudent(name: string) {
  const list = getStudents();
  const trimmed = name.trim();
  if (trimmed && !list.includes(trimmed)) {
    list.push(trimmed);
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(list));
  }
}

export function removeStudent(name: string) {
  const list = getStudents().filter((s) => s !== name);
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(list));
  const p = getAllProgress();
  delete p[name];
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  if (getCurrentStudent() === name) localStorage.removeItem(CURRENT_KEY);
}

export function getCurrentStudent(): string | null {
  return localStorage.getItem(CURRENT_KEY);
}

export function setCurrentStudent(name: string | null) {
  name
    ? localStorage.setItem(CURRENT_KEY, name)
    : localStorage.removeItem(CURRENT_KEY);
}

export function getAllProgress(): AllProgress {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveResult(
  student: string,
  moduleId: string,
  score: number,
  total: number,
  stars: number
) {
  const p = getAllProgress();
  if (!p[student]) p[student] = {};
  p[student][moduleId] = {
    score,
    total,
    stars,
    date: new Date().toISOString(),
    attempts: (p[student][moduleId]?.attempts ?? 0) + 1,
  };
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}
