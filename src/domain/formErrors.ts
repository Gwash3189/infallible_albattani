export function getFirstErrorMessage (messages: string[] = []) {
  return messages[0]
}

export function hasErrors (messages: string[] = []) {
  return messages.length > 0
}
