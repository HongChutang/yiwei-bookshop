export const coerce = {
  // Convert a string to booleam. Otherwise, return the value without modification, so if is not boolean, Vue throw a warning.
  boolean: val => (typeof val === 'string' ? val === '' || val === 'true' ? true : (val === 'false' || val === 'null' || val === 'undefined' ? false : val) : val),
  // Attempt to convert a string value to a Number. Otherwise, return 0.
  number: (val, alt = null) => (typeof val === 'number' ? val : val === undefined || val === null || isNaN(Number(val)) ? alt : Number(val)),
  // Attempt to convert to string any value, except for null or undefined.
  string: val => (val === undefined || val === null ? '' : val + ''),
  // Pattern accept RegExp, function, or string (converted to RegExp). Otherwise return null.
  pattern: val => (val instanceof Function || val instanceof RegExp ? val : typeof val === 'string' ? new RegExp(val) : null)
}

export function getScrollBarWidth () {
  if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
    return 0
  }
  let inner = document.createElement('p')
  inner.style.width = '100%'
  inner.style.height = '200px'

  let outer = document.createElement('div')
  outer.style.position = 'absolute'
  outer.style.top = '0px'
  outer.style.left = '0px'
  outer.style.visibility = 'hidden'
  outer.style.width = '200px'
  outer.style.height = '150px'
  outer.style.overflow = 'hidden'
  outer.appendChild(inner)

  document.body.appendChild(outer)
  let w1 = inner.offsetWidth
  outer.style.overflow = 'scroll'
  let w2 = inner.offsetWidth
  if (w1 === w2) w2 = outer.clientWidth

  document.body.removeChild(outer)

  return (w1 - w2)
}
