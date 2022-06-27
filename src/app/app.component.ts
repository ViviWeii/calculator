import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'calculatorDemo';
  // 結果
  resultNum = '';
  // 儲存的值
  storeNum = '';
  // 目前輸入值
  currentNum = '';
  // 當前運算符號
  currentOperator = '';

  // 計算function( 加減乘除 & log )
  calculateFn() {
    switch (this.currentOperator) {
      case '+':
        this.storeNum = this.resultNum = String(
          parseFloat(this.storeNum) + parseFloat(this.resultNum)
        );
        break;
      case '-':
        this.storeNum = this.resultNum = String(
          parseFloat(this.storeNum) - parseFloat(this.resultNum)
        );
        break;
      case '*':
        this.storeNum = this.resultNum = String(
          parseFloat(this.storeNum) * parseFloat(this.resultNum)
        );
        break;
      case '/':
        this.storeNum = this.resultNum = String(
          parseFloat(this.storeNum) / parseFloat(this.resultNum)
        );
        break;
    }
  }
  // 百分比、平方、開根號按鈕
  percentOrSquareBtn(percentOrSquare: string) {
    // 當前無值不可點選
    if (this.resultNum == '') {
      this.resultNum = '';
    }
    // 若無結算才可進行運算
    if (this.resultNum != '' && this.currentNum == '') {
      switch (percentOrSquare) {
        case '%':
          this.resultNum = String(parseFloat(this.resultNum) / 100);
          break;
      }
    }
  }
  // 返回鍵
  backspace() {
    // 若無結算才可進行運算
    if (this.currentNum == '') {
      let resultNumLength = this.resultNum.length;
      this.resultNum = this.resultNum.slice(0, resultNumLength - 1);
    }
  }
  // 重置當前值
  resetCurrentNumBtn() {
    this.resultNum = '';
  }
  // 重置鍵
  resetBtn() {
    this.resultNum = '';
    this.storeNum = '';
    this.currentNum = '';
    this.currentOperator = '';
  }
  // 運算符號
  operatorBtn(operator: string) {
    // 結果為0的話，當前值即為結果值
    if (this.resultNum == '0' || this.resultNum == '') {
      this.resultNum = this.resultNum;
    }
    if (this.resultNum != '') {
      // 按下運算符號即運算
      this.calculateFn();
      // 紀錄當前運算符號
      this.currentOperator = operator;
      this.storeNum = this.resultNum;
      this.resultNum = '';
    } else {
      // 當前無值無法點選運算符號
      this.currentOperator = '';
      this.resultNum = '';
    }
  }
  // 結算結果
  equalBtn() {
    // 當前無值，結果為預設
    if (this.resultNum == '') {
      this.resultNum == this.resultNum;
    }
    // 當前值不為空即計算
    if (this.resultNum != '') {
      this.currentNum = this.resultNum + '=';
      switch (this.currentOperator) {
        case '+':
          this.resultNum = String(
            parseFloat(this.storeNum) + parseFloat(this.resultNum)
          );
          break;
        case '-':
          this.resultNum = String(
            parseFloat(this.storeNum) - parseFloat(this.resultNum)
          );
          break;
        case '*':
          this.resultNum = String(
            parseFloat(this.storeNum) * parseFloat(this.resultNum)
          );
          break;
        case '/':
          this.resultNum = String(
            parseFloat(this.storeNum) / parseFloat(this.resultNum)
          );
          break;
      }
    }
  }
  // 數字按鈕
  inputNum(number: string) {
    // this.currentNum = number + this.currentNum * 10;
    // 計算完結果再點選數字即重置
    if (this.currentNum != '') {
      this.storeNum = '';
      this.currentNum = '';
      this.resultNum = '';
      this.currentOperator = '';
    }
    // 第一個數字不可為0
    // 當前無值點選小數點即出現0.
    if (number == '.' && this.resultNum.substr(0, 1) == '') {
      this.resultNum = '0.';
    }
    // 判斷字串內有無重複小數點
    if (this.resultNum.includes('.') && number == '.') {
      this.resultNum = this.resultNum;
    }
    // 第一個數字可為0但不可重複0
    else if (number == '0' && this.resultNum.substr(0, 1) == '0') {
      this.resultNum = '';
    } else {
      this.resultNum += number;
    }
  }
  // 切換正負號
  changePositiveOrNegative() {
    // 若無結算才可進行運算
    if (this.currentNum == '' && this.resultNum != '') {
      this.resultNum = String(parseFloat(this.resultNum) * -1);
    }
  }
}
