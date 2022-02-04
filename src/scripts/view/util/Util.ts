export function regEventSeeker(homeNavHandler: (link: HTMLElement) => void, elems: HTMLElement[], type: string) {
  elems.forEach(el => {
    el.addEventListener(type, () => homeNavHandler(el));
  });
}

export function createElement(tagName: string, classList: string[], dataAttr?: [string, string][], innerText?: string) {
  // create element with provided tag name
  const el = document.createElement(tagName);
  // set all the classes from the provided array
  el.classList.add(...classList);
  // set all attributes from the provided array
  dataAttr ? dataAttr.forEach(elem => el.setAttribute(elem[0], elem[1])) : null;
  // set provided text for the element
  innerText ? (el.innerText = innerText) : null;
  return el;
}