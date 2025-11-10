
export const randomInt = (low, high) => {
  return Math.floor(Math.random()*(high-low+1) + low)
}

export const notificationPopUp = (setNotification, text, color, timer) => {
  const notification = {text: text, color: color, visible: true}
  setNotification({text: text, color: color, visible: true})
  setTimeout(() => {
    setNotification({...notification, visible: false})
  }, timer * 1000);
}

export const flashTextColor = (flashColor, oldColor, setColor, flashTime=200) => {
  setColor(flashColor)
  setTimeout(() => {
    setColor(oldColor)
  }, flashTime);
}

export function generateRandomExpression(numbers) {
  // Clone and shuffle the numbers to use in random order
  let nums = [...numbers];
  nums.sort(() => Math.random() - 0.5)

  // Divide numbers into groups of random size (bracket groups)
  const numGroups = []
  while (nums.length > 0) {
    let group = []
    const n = randomInt(1, 3)
    group = nums.slice(0, n)
    numGroups.push(group)
    if (n == nums.length) {
      break
    } else {
      nums = nums.slice(n)
    }
  }

  let bracketedGroups = []
  numGroups.forEach( group => {
    if (group.length == 1) {
      bracketedGroups.push(group[0])
    } else {
      bracketedGroups.push(`( ${joinElementRandomOp(group)} )`)
    }
  })

  const finalExpression = joinElementRandomOp(bracketedGroups)
  console.log(finalExpression)
  let finalResult = 0
  try {
    finalResult = safeEval(finalExpression)
  } catch {
    return {
      expression: "",
      result: 0
    }
  }
  return {
    expression: finalExpression,
    result: finalResult
  }
}

// Safe evaluation using Function constructor (safer than eval)
export function safeEval(expr) {
  // Basic sanitization
  const sanitized = expr.replace(/[^0-9+\-*/().\s]/g, '');
  return new Function(`return (${sanitized})`)();
}

export function joinElementRandomOp(arr) {
  // Operators
  const operators = ['+', '-', '*'];
  let resultString = ""
  for (let i=0; i<arr.length; i++) {
    // Choose random operator
    const op = operators[randomInt(0, operators.length - 1)];
    if (i == arr.length - 1) {
      resultString += arr[i]
    } else {
      resultString += `${arr[i]} ${op} `
    }
  }
  return resultString
}