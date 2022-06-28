import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  title = 'calculatorDemo';
  // 結果&當前輸入值
  resultNum = '';
  // 儲存的值
  storeNum = '';
  // 確定目前輸入值
  currentNum = '';
  // 當前運算符號
  currentOperator = '';
  // 歷史輸入內容
  historyInput: any[] = [];
  // 紀錄歷史紀錄視窗是否被開啟
  isOpenHistoryWindows:boolean = false;
  // 紀錄Memory功能是否被開啟
  isMemoryOn: boolean = false;
  // 紀錄Memory視窗是否被開啟
  isOpenMemoryWindows: boolean = false;
  // 當前記憶體型態(增、減、儲存)
  currentMemoryType = '';
  // 記憶體視窗內容
  memoryNums: any[] = [];
  // id初始
  id = 0;
  // 判斷MS是否被點選
  isMemorySave: boolean = false;

  // 開啟歷史紀錄視窗
  openHistoryWindows() {
    // 若儲存記憶體視窗無開啟即可開啟歷史紀錄視窗
    if (!this.isOpenMemoryWindows) {
      this.isOpenHistoryWindows = !this.isOpenHistoryWindows;
    }
    // 若儲存記憶體視窗開啟，即關掉儲存記憶體視窗，並開啟歷史紀錄視窗
    else {
      this.isOpenMemoryWindows = false;
      this.isOpenHistoryWindows = true;
    }
  }

  // 套用歷史紀錄的值
  changeHistoryFormulaBtn(
    storeNum: string,
    currentOperator: string,
    currentNum: string,
    resultNum: string
  ) {
    this.storeNum = storeNum;
    this.currentOperator = currentOperator;
    this.currentNum = currentNum;
    this.resultNum = resultNum;
  }

  // 刪除所有歷史紀錄
  deleteHistoryNumBtn() {
    this.historyInput.splice(0, this.historyInput.length);
  }

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
      case 'log':
        this.storeNum = this.resultNum = String(
          Math.log(parseFloat(this.storeNum)) /
            Math.log(parseFloat(this.resultNum))
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
        case 'x^2':
          this.resultNum = String(Math.pow(parseFloat(this.resultNum), 2));
          break;
        case '√':
          this.resultNum = String(Math.sqrt(parseFloat(this.resultNum)));
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

    // 若結算後還要繼續運算，結果值變為儲存值
    if (this.currentNum != '') {
      this.storeNum = this.resultNum;
      this.currentOperator = operator;
      this.currentNum = '';
      this.resultNum = '';
    } else if (this.resultNum != '') {
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
        case 'log':
          this.resultNum = String(
            Math.log(parseFloat(this.storeNum)) /
              Math.log(parseFloat(this.resultNum))
          );
          break;
      }

      // 計算結果後，將其放到歷史紀錄
      let historyNum = {
        storeNum: this.storeNum,
        currentOperator: this.currentOperator,
        currentNum: this.currentNum,
        resultNum: this.resultNum,
      };
      this.historyInput.push(historyNum);
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

    // 判斷記憶體儲存後再按數字鈕會清空上個值
    if (this.isMemorySave == true) {
      this.isMemorySave = false;
      this.resultNum = '';
    }

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

  // 記憶體清除
  memoryClearBtn() {
    this.isMemoryOn = false;
    this.isOpenMemoryWindows = false;
    this.currentMemoryType = '';
    this.memoryNums.length = 0;
    this.id = 0;
    this.isMemorySave = false;
  }

  // 拿出當前計算的數字
  memoryRecallBtn() {
    this.resultNum = this.memoryNums[0].number;
  }

  // 新增的記憶體加減
  memoryBtn(memoryType: string) {
    switch (memoryType) {
      case 'M+':
        this.memoryNums[0].number = String(
          parseFloat(this.memoryNums[0].number) + parseFloat(this.resultNum)
        );
        break;
      case 'M-':
        this.memoryNums[0].number = String(
          parseFloat(this.memoryNums[0].number) - parseFloat(this.resultNum)
        );
        break;
    }
  }

  // 新增記憶體
  memorySaveNumBtn() {
    if (this.resultNum != '') {
      this.isMemoryOn = true;
      let memoryNum = {
        id: this.id,
        number: this.resultNum,
      };
      this.memoryNums.push(memoryNum);
      this.id++;
      this.isMemorySave = true;
    }
  }

  // 打開儲存記憶體視窗
  openMemoryWindows() {
    // 若歷史紀錄視窗無開啟即可開啟儲存記憶體視窗
    if (!this.isOpenHistoryWindows) {
      this.isOpenMemoryWindows = !this.isOpenMemoryWindows;
    }
    // 若歷史紀錄視窗開啟，即關掉歷史紀錄視窗，並開啟儲存記憶體視窗
    else {
      this.isOpenHistoryWindows = false;
      this.isOpenMemoryWindows = true;
    }
  }

  // 儲存的記憶體加減、刪除
  memorySeveralBtn(index: number, value: string, memoryType: string) {
    switch (memoryType) {
      case 'M+':
        this.memoryNums[index].number = String(
          parseFloat(this.memoryNums[index].number) + parseFloat(this.resultNum)
        );
        break;
      case 'M-':
        this.memoryNums[index].number = String(
          parseFloat(this.memoryNums[index].number) - parseFloat(this.resultNum)
        );
        break;
      case 'MC':
        this.memoryNums = this.memoryNums.filter((memory) => {
          return memory.number != value;
        });
        break;
    }
  }

  // 將記憶體中的數字拿出來
  changeResultNumBtn(memoryNum: string) {
    this.resultNum = memoryNum;
  }

  // 刪除記憶體內全數字
  deleteMemoryNumBtn() {
    this.memoryNums.splice(0, this.memoryNums.length);
  }
}
