import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculatorDemo';
  clearAll(){

  }
  addBrackets(){

  }
  addSymbol(symbol:any){
    console.log(symbol);
  }
  addNumber(number:number){
    console.log(number);
  }
}
