module.exports = function check(str, bracketsConfig) {
  let bracketsArray = [];

  let openingBrackets = bracketsConfig[0]
  let closingBrackets = bracketsConfig[1];

  //перебираю строку
  function checkElement(element) {
    let type = null; // can be one, opening, closing, both
    let pair = null; // pair to other bracket (closing to opening and viceversa)
    bracketsConfig.forEach(couple => {
      if (element === couple[0] && element === couple[1]) {
        type = 'both';
        pair = couple[1];
      } else if (element === couple[0]) {
        type = 'opening';
        pair = couple[1];
      } else if (element === couple[1]) {
        type = 'closing';
        pair = couple[0];

      }
    });
    return { type, pair }
  }

  for (element of str) {
    let last = bracketsArray[bracketsArray.length - 1]
    let checkResult = checkElement(element);
    // если тип элемента both (элемент есть в списке и открывающих и закрывающих)
    if (checkResult['type'] === 'both') {
      console.log('both: ' + element);
      // если элемент совпадает с последним в массиве скобок, то скобка из массива удаляется
      if (last === checkResult['pair']) {
        bracketsArray.pop();
        // иначе элемент в массив скобок добавляется
      } else {
        bracketsArray.push(element);
      }

      //  - если элемент в списке открывающих скобок - он добавляется в массив скобок
    } else if (checkResult['type'] === 'opening') {
      console.log('opening: ' + element)
      bracketsArray.push(element);
    }

    //  - если элемент в списке закрывающих скобок 
    //     - то проверяется, что этот элемент находится последним в массиве, и если это так, то удаляется из массива, цикл продолжается
    //     - если элементы не последний в массиве, то идет выход из функции с результатом false
    else if (checkResult['type'] === 'closing') {
      let last = bracketsArray[bracketsArray.length - 1]
      if (last === checkResult['pair']) {
        bracketsArray.pop();
      } else { return false }
    }
    // если элемент не в списке скобок, то он игнорируется, ошибка не выдается?? (из формулировки задания точно непонятно)

  }
  // после окончания цикла по строке, идет проверка что длина массива скобок равна 0.
  if (bracketsArray.length === 0) {
    return true
  } else {
    return false
  }
}
