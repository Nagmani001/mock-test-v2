import { atom } from "jotai";

interface Test {
  id: string
  title: string,
  totalQuestions: number,
  time: number
}

export const testAtom = atom<Test[]>([]);
export const filteredTest = atom<Test[]>([]);
export const searchAtom = atom("");

export const testTimerAtom = atom({
  hour: 10,
  minute: 10,
  second: 10
});

export const questionTimeAtom = atom([]);
export const answerAtom = atom([]);
export const subAnswerAtom = atom([]);

export const sectionAtom = atom([]);

export const currentSectionAtom = atom<null | string>(null);


export const questionAtom = atom({
  id: "",
  title: "",
  totalTimeHour: 0,
  totalTimeMinute: 0,
  totalTimeSecond: 0,
  question: [{
    id: "",
    question: "",
    type: "",
    words: 0,
    successMarks: 0,
    failureMarks: 0,
    title: "",
    subQuestions: []
  }, {
    id: "",
    question: "",
    type: "",
    words: 0,
    successMarks: 0,
    failureMarks: 0,
    title: "",
    subQuestions: []
  }]
});

