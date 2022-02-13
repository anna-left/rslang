export function createHTMLElement(tag = '', className = '', text = ''): HTMLElement {
  const element = document.createElement(`${tag}`);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.innerHTML = text;
  }
  return element;
}

export function createNSElement(name: string): SVGElement {
  return document.createElementNS('http://www.w3.org/2000/svg', name);
}

export function setAttributes(element: HTMLElement | SVGElement, attributes: object) {
  Object.entries(attributes).forEach((keyValuePair) => {
    element.setAttribute(keyValuePair[0], keyValuePair[1]);
  });
}

export function removeTags(text: string) {
  let newString = text.replace(/i>/g, 'em>');
  newString = newString.replace(/b>/g, 'em>');
  return newString;
}
