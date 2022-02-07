function createHtmlElement(tag: string, parent: HTMLElement, classEl = '', inner = '', type = '', value = '') {
  const element = document.createElement(tag);
  if (classEl) {
    element.classList.add(classEl);
  }
  if (inner) {
    element.innerHTML = inner;
  }
  if (type) {
    element.setAttribute('type', type);
  }
  if (value) {
    element.setAttribute('value', value);
  }
  parent.appendChild(element);
  return element;
}

export { createHtmlElement };
