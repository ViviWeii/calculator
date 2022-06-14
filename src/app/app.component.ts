import { Component,ViewChild } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculatorDemo';
  result = 0;
  @ViewChild("input") input:any;
  clearAll(){

  }
  addBrackets(){

  }
  addSymbol(symbol:any){
    console.log(symbol);
  }
  addNumber(number:number):void{
    console.log(number);
    this.input.nativeElement.innerText = number;
    console.log(this.input.nativeElement.innerText);
  }
}
