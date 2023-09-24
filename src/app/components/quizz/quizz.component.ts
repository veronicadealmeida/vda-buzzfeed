import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.sass'],
})
export class QuizzComponent implements OnInit {
  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
      this.questionSelected = this.questions[this.questionIndex];
    }
  }
  title: string = '';

  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  playerChoice(choice: string): void {
    this.answers.push(choice);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);

      this.finished = true;
      this.answerSelected =
        quizz_questions.results[
          finalAnswer as keyof typeof quizz_questions.results
        ];
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce(
      (previous: string, current: string, i: number, arr: string[]) => {
        if (
          arr.filter((item) => item === previous).length >
          arr.filter((item) => item === current).length
        ) {
          return previous;
        } else {
          return current;
        }
      }
    );
    return result;
  }
}
