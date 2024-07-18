const dialog = document.querySelector('.modal');
const addBookBtn = document.querySelector('.addbook-btn');
const acceptBtn = document.querySelector('.accept-btn');
const closeBtn = document.querySelector('.close-btn');
const booksContainer = document.querySelector('.books');

const bookAuthor = document.querySelector('.author');
const bookTitle = document.querySelector('.title');
const bookPages = document.querySelector('.pages');
const bookRead = document.querySelector('.readed');

const Books = [];

const initialBook = new Book(
  'Haruki Murakami',
  '1Q84',
  1400,
  true,
  false
);

Books.push(initialBook);

function Book(author, title, pages, readed) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.readed = readed;

  this.toggleRead = function() {
    this.readed = !this.readed;
  }
}

function cleanContainer() {
  while(booksContainer.firstChild) {
    booksContainer.removeChild(booksContainer.firstChild);
  }
}

function newElem(tag, className) {
  const elem = document.createElement(tag);
  elem.classList.add(className);

  return elem;
}

function cleanInputs() {
  bookAuthor.value = '';
  bookTitle.value = '';
  bookPages.value = '';
}

function createBook() {
  const author = bookAuthor.value;
  const title = bookTitle.value;
  const pages = bookPages.value;
  const readed =
    bookRead.options[bookRead.selectedIndex].text === 'Yes' ?
    true : false
  ;

  if(author && title && pages) {
    const _book =  new Book(author, title, pages, readed);
    Books.push(_book);
    cleanInputs();
    dialog.close();
  } else {
    alert('Please fill out all fields.');
  }
}

function renderBooks() {
  cleanContainer();

  Books.forEach((target, index) => {
    const container = newElem('div', 'book');
    const authorContainer = newElem('div', 'author-container');
    const authorHead = newElem('p', 'author-head');
    const author = newElem('p', 'book-author');
    const titleContainer = newElem('div', 'title-container');
    const titleHead = newElem('div', 'title-head');
    const title = newElem('p', 'book-title');
    const pagesContainer = newElem('div', 'pages-container');
    const pages = newElem('p', 'book-pages');
    const pagesHead = newElem('p', 'pages-head');
    const btnContainer = newElem('div', 'btns-container');
    const readBtn = newElem('button', 'book-read');
    const deleteBtn = newElem('button', 'book-delete');

    author.textContent = target.author;
    authorHead.textContent = 'Author:';
    title.textContent = target.title;
    titleHead.textContent = 'Title:';
    pages.textContent = target.pages;
    pagesHead.textContent = 'Pages:';
    readBtn.textContent = target.readed ? 'Readed' : 'Unread';
    deleteBtn.textContent = 'Delete';

    readBtn.addEventListener('click', () => {
      target.toggleRead()
      renderBooks();
    });

    deleteBtn.addEventListener('click', () => {
      Books.splice(index, 1);
      renderBooks();
    });

    authorContainer.append(authorHead, author);
    titleContainer.append(titleHead, title);
    pagesContainer.append(pagesHead, pages);
    btnContainer.append(readBtn, deleteBtn);

    container.append(
      authorContainer,
      titleContainer,
      pagesContainer,
      btnContainer
    );

    booksContainer.appendChild(container);
  });
}

addBookBtn.addEventListener('click', () => dialog.showModal());
closeBtn.addEventListener('click', () => dialog.close());
acceptBtn.addEventListener('click', () => {
  createBook();
  renderBooks();
});

renderBooks();