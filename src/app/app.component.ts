import { 
  Component, 
  OnInit
} from '@angular/core';
import { QuizService } from './quiz.service';

import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private quizSvc: QuizService
  ) {
    
  }

  errorLoadingQuizzes = false; 
  loading = true; 

  quizzes = []; 

  ngOnInit() {
    this.quizSvc.loadQuizzes()
        .subscribe(
            // lambda with data
            (data) => {
                console.log(data);
                this.quizzes = data;
                this.errorLoadingQuizzes = false;
                this.loading = false;
            },
            // lambda with errors
            (error) => {
                console.log(error);
                this.errorLoadingQuizzes = true;
                this.loading = false; 
            }
        ); 
    // console.log(this.quizzes);
    
  }

  selectedQuiz = undefined; 

  selectQuiz(q) {
    this.selectedQuiz = q;
    // console.log(this.selectedQuiz.questions);
    
  }

  title = 'quiz-editor';

  addNewQuiz() {
    // add a new quiz to quizzes
    let newQuiz = {
      name: "Untitled Quiz", 
      questions: []
    }

    this.quizzes = [
        ...this.quizzes, 
        newQuiz
    ]; 
     
    // set the selectedQuiz to the newest quiz
    this.selectQuiz(newQuiz); 

  }

  addNewQuestion() {
    let newQuestion = {
        name: "New Question"
    }; 

    this.selectedQuiz.questions = [
        ...this.selectedQuiz.questions, 
        newQuestion
    ]
    
}

  removeQuestion(questionToDelete) {
      this.selectedQuiz.questions = this.selectedQuiz.questions.filter(x => x != questionToDelete);
  }
  
}
