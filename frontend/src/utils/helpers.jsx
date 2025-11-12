import { createUser, updateUser } from "../services/users"
import { LOCALSTORAGE_USER } from "./constants"

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
  const sanitized = expr.replace(/[^0-9+\-*/().\s]/g, '');
  return new Function(`return (${sanitized})`)();
}

export function joinElementRandomOp(arr) {
  // Operators
  const operators = ['+', '-', '*', "/"];
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

export function validateNumbersUsed(expression, numbers) {
  // Validator for the expression game. Every number given should be used once, and no other number should be used.
  for (const n of numbers) {

    expression = expression.replace(n, "")
  }
  for (const n of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    if (expression.includes(n)) {
      return false
    }
  }
  return true
}

export async function highscoreCheck(score, gametype, highscores, setHighscores, setNotification) {
  if (score > 0) {
    const username = localStorage.getItem(LOCALSTORAGE_USER)
    const userData = highscores.find( u => u.username == username) ?? { username: username }
    let previousScore = -1
    switch (gametype) {
      case "multiplication":
        previousScore = userData.multiplication ?? -1
        break;
      case "expressions":
        previousScore = userData.expressions ?? -1
        break;
      default:
        console.log("Error: unknown game type as input")
        notificationPopUp(setNotification, "Error: unknown game type as input", "red", 5)
        return
    }
    // Store a new high score
    if (score > previousScore) {
      notificationPopUp(setNotification, `Uusi oma ennätys!\n${score} pistettä.`, "green", 5)
      switch (gametype) {
        case "multiplication":
          userData.multiplication = score
          break;
        case "expressions":
          userData.expressions = score
          break;
        default:
          break;
      }
      if ( highscores.find( u => u.username == username) == undefined) {
        const dbUserData = await createUser(userData)
        console.log(dbUserData)
        setHighscores(highscores.concat(dbUserData))
      } else {
        setHighscores(highscores.map( u => u.username == username ? userData : u))
        await updateUser(userData)
      }
      return
    }
    // If the score is not a new high score, show a notification.
    notificationPopUp(setNotification, `Tuloksesi oli ${score} pistettä. Ennätyksesi on ${previousScore} pistettä.`, "green", 5)
  }
}