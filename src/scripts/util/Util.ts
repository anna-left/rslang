/* eslint-disable @typescript-eslint/no-unused-expressions */
export function regEventSeeker(homeNavHandler: (link: HTMLElement) => void, elems: HTMLElement[], type: string) {
  elems.forEach((el) => {
    el.addEventListener(type, () => homeNavHandler(el));
  });
}

export function createElement(tagName: string, classList: string[], dataAttr?: [string, string][], innerText?: string) {
  const el = document.createElement(tagName);
  // set all the classes from the provided array
  classList.length > 0 ? el.classList.add(...classList) : undefined;
  // set all attributes from the provided array
  dataAttr ? dataAttr.forEach((elem) => el.setAttribute(elem[0], elem[1])) : undefined;
  innerText ? (el.innerText = innerText) : null;
  // set provided text for the element
  return el;
}

export function createSVG(tagName: string, classList: string[], dataAttr?: [string, string][]) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  classList.length > 0 ? el.classList.add(...classList) : undefined;
  // set all attributes from the provided array
  dataAttr ? dataAttr.forEach((elem) => el.setAttribute(elem[0], elem[1])) : undefined;
  return el;
}
