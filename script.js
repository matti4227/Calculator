class Calculator {
    constructor(operationOutput, resultOutput) {
        this.operationOutput = operationOutput;
        this.resultOutput = resultOutput;
        this.clearAll();
        this.clearOperationHelp();
    }

    clearAll() {
        this.enteredNumber = '';
        this.operation = '';
        this.operationResultInMemory = undefined;
        this.clearOperatorInMemory();
        

        this.equalsFlag = false;
        this.calculationFlag = false;
        this.numberFlag = false;
        this.plusMinusSignFlag = false;
    }

    clearOperationHelp() {
        this.operationHelp = undefined;
    }

    changeEqualsFlag() {
        this.equalsFlag = true;
    }

    clearOperatorInMemory() {
        this.operatorInMemory = undefined;
    }

    togglePlusMinusNumber() {
        if (this.enteredNumber && this.enteredNumber !== 0) {
            this.enteredNumber = this.enteredNumber.toString().replace(',', '.');
            this.enteredNumber = -this.enteredNumber;
            this.enteredNumber = this.enteredNumber.toString().replace('.', ',');
        }
    }

    moveNumberToOperation() {
        for (let x = this.enteredNumber.toString().length; x > 0; x--) {
            if (this.enteredNumber.toString().charAt(this.enteredNumber.length - 1) === ',' ||
                (this.enteredNumber.toString().charAt(this.enteredNumber.length - 1) === '0' && this.enteredNumber.toString().includes(','))) {
                    this.enteredNumber = this.enteredNumber.toString().slice(0, -1);
            }
        }
        
        this.operation = this.operation.toString() + this.enteredNumber.toString();
    }

    chooseNumber(number) {
        if (this.equalsFlag) {
            this.equalsFlag = false;
            this.clearAll();
        }
        if (this.operatorInMemory !== undefined) this.calculationFlag = true;
        if (!this.numberFlag) this.numberFlag = true;

        if (this.enteredNumber === '0' && number !== ',') {
            this.enteredNumber = number.toString();
            return;
        } 
        if (number === ',' && this.enteredNumber.toString().includes(',')) return;
        if (number === ',' && this.enteredNumber === '') {
            this.enteredNumber = this.enteredNumber.toString() + '0';
        }

        this.enteredNumber = this.enteredNumber.toString() + number.toString();
    }
    
    chooseOperator(operator) {
        if (!this.numberFlag) return;
        if (this.operationHelp !== undefined) this.clearOperationHelp();
        if (this.equalsFlag) this.equalsFlag = false;
        
        if (this.operatorInMemory === undefined) {
            this.operatorInMemory = operator;
            this.appendOperator();
        } else if (this.calculationFlag) {
            this.calculate();
            this.operatorInMemory = operator;
            this.appendOperator();
        } else {
            this.operatorInMemory = operator;
            this.swapOperator();
        }
    }

    appendOperator() {
        this.operation = this.operation.toString() + this.operatorInMemory.toString();
        if (this.enteredNumber !== '') {
            this.operationResultInMemory = this.enteredNumber;
            this.enteredNumber = '';
        }
    }

    swapOperator() {
        this.operation = this.operation.toString().slice(0, -1);
        this.appendOperator();
    }

    choosePercent() {
        if (this.operatorInMemory === undefined) return;

        this.enteredNumber = this.enteredNumber.toString().replace(',', '.');
        this.operationResultInMemory = this.operationResultInMemory.toString().replace(',', '.');

        if ((this.operatorInMemory === '+' || this.operatorInMemory === '-') && this.enteredNumber !== '.') {
            if (this.enteredNumber === '') {
                if (!this.numberFlag) this.numberFlag = true;
                if (this.operatorInMemory !== undefined) this.calculationFlag = true;
                this.enteredNumber = Big(this.operationResultInMemory).times(0.01);
            } else {
                this.enteredNumber = Big(this.operationResultInMemory).times(0.01).times(this.enteredNumber);
            }
        }

        if ((this.operatorInMemory === 'x' || this.operatorInMemory === '/') && this.enteredNumber !== '.') {
            if (this.enteredNumber === '') {
                if (!this.numberFlag) this.numberFlag = true;
                if (this.operatorInMemory !== undefined) this.calculationFlag = true;
                this.enteredNumber = Big(this.operationResultInMemory).times(0.01);
            } else {
                this.enteredNumber = Big(this.enteredNumber).times(0.01);
            }
        }

        this.enteredNumber = this.enteredNumber.toString().replace('.', ',');
        this.operationResultInMemory = this.operationResultInMemory.toString().replace('.', ',');
    }

    changePlusMinusSign() {
        if (this.operatorInMemory === undefined && this.operationResultInMemory !== '' && this.operationResultInMemory !== undefined) {
            if (this.operationHelp === undefined) {
                this.enteredNumber = this.operationResultInMemory;
                this.operationHelp = this.operation;
                this.operation = '';
            } else {
                this.enteredNumber = '';
                this.operation = this.operationHelp;
                this.operationHelp = undefined;
            }
        }

        this.togglePlusMinusNumber();
    }

    calculate() {
        if (!this.calculationFlag || this.enteredNumber === ',') return;

        this.operationResultInMemory = this.operationResultInMemory.toString().replace(',', '.');
        this.enteredNumber = this.enteredNumber.toString().replace(',', '.');

        if (isNaN(this.operationResultInMemory)) {
            this.operationResultInMemory = this.enteredNumber;
        } else {
            const previousNumber = parseFloat(this.operationResultInMemory);
            const nextNumber = parseFloat(this.enteredNumber);

            switch (this.operatorInMemory) {
                case '+': 
                    this.operationResultInMemory = Big(previousNumber).plus(nextNumber);
                    break;
                case '-': 
                    this.operationResultInMemory = Big(previousNumber).minus(nextNumber);
                    break;
                case 'x': 
                    this.operationResultInMemory = Big(previousNumber).times(nextNumber);
                    break;
                case '/': 
                    if (nextNumber === 0) {
                        this.clearAll();
                        this.operationResultInMemory = 'Err';
                    } else {
                        this.operationResultInMemory = Big(previousNumber).div(nextNumber);
                    }
                    break;
                default: 
                    return;
            }

            this.enteredNumber = '';
            this.operationResultInMemory = this.operationResultInMemory.toString().replace('.', ',');
            this.displayOutput();
            this.calculationFlag = false;
        }
    }

    displayOutput() {
        this.resultOutput.innerText = (this.enteredNumber === '') ? this.operationResultInMemory || '' : this.enteredNumber;
        this.operationOutput.innerText = this.operation.toString() + this.enteredNumber.toString();
    }
}

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');
const operationOutput = document.querySelector('.operation');
const resultOutput = document.querySelector('.result');
const plusMinusSign = document.querySelector('.plus-minus');
const percent = document.querySelector('.percent');

const calculator = new Calculator(operationOutput, resultOutput);

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseNumber(button.innerText);
        calculator.displayOutput();
    })
});

operators.forEach(button => {
    button.addEventListener('click', () => {
        calculator.moveNumberToOperation();
        calculator.chooseOperator(button.innerText);
        calculator.displayOutput();
    })
});

clear.addEventListener('click', () => {
    calculator.clearAll();
    calculator.displayOutput();
});

equals.addEventListener('click', () => {
    if (calculator.enteredNumber !== ',' && calculator.calculationFlag === true) {
        calculator.moveNumberToOperation();
        calculator.calculate();
        calculator.changeEqualsFlag();
        calculator.clearOperatorInMemory();
    }
});

plusMinusSign.addEventListener('click', () => {
    calculator.changePlusMinusSign();
    calculator.displayOutput();
});

percent.addEventListener('click', () => {
    calculator.choosePercent();
    calculator.displayOutput();
});