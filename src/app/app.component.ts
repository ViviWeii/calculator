import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calculatorDemo';
  // 結果
  result: any = 0;
  // 儲存值
  num: any = 0;
  // 顯示計算
  inputBox: any = "";
  // 紀錄運算子
  operator: any = "";
  // 清空按鈕
  clearAll() {
    this.result = 0;
    this.num = 0;
    this.inputBox = "";
    this.operator = "";
  }
  // 返回按鈕
  backspace() {
    let inputBoxLength = this.inputBox.length;
    this.inputBox = this.inputBox.slice(0,inputBoxLength - 1);
  }
  // 符號按鈕
  addSymbol(symbol: any) {
    this.num = "";
    if (this.inputBox == "") {
      alert("請點選數字");
    }else if (this.operator != symbol) {
      this.operator = symbol;
      this.inputBox += symbol;
    } else if (this.operator == symbol) {
      this.operator = "";
      alert("請點選數字");
    }
  }
  // 數字按鈕
  addNumber(number: any): void {
    if(number == 0 && this.inputBox.substr(0, 1) == 0){
      alert("第一個數字不可為0");
    }
    else if (this.inputBox == "") {
      this.inputBox = number;
      this.num = number;
    } else {
      this.inputBox += number;
      this.num += number;
    }
    console.log(6%9);
  }
  // 結算按鈕
  settlement() {
    if(this.inputBox == ""){
      alert("已結算");
    }
    if(this.result != eval(this.inputBox)){
      this.result = eval(this.inputBox);
      this.inputBox = "";
    }
  }

  bounceClick(bounce:any){
    let bounceClass = document.getElementsByClassName(bounce);
  }
}
