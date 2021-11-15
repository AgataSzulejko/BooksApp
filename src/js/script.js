{
  'use strict';

  const select = {
    templateOf: {
      templateBook: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    booksImages: {
      images: '.books-list .book__image',
    }

  };

  const classNames = {
    books: {
      favoriteBook: 'favorite.books-list',
    }
  };

  const templates = {
    templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
  };


  function renderInBooks() {

    for (let book of dataSource.books) {

      const generatedHTML = templates.templateBook(book);

      const element = utils.createDOMFromHTML(generatedHTML);

      const booksListContainer = document.querySelector(select.containerOf.booksList);
      booksListContainer.appendChild(element);
    }
  }

  renderInBooks();

  const favoriteBooks = [];

  function initActions() {

    const booksElements = document.querySelector(select.containerOf.booksList);
    const booksImage = booksElements.querySelectorAll('.book__image');

    for (let img of booksImage) {
      img.addEventListener('dblclick', function(event) {
        event.preventDefault();
        img.classList.add('favorite');
        const bookId = img.getAttribute('data-id');
        favoriteBooks.push(bookId);
      });
      if (!img.classList.contains('favorite')) {
        img.classList.add(classNames.books.favoriteBook);
        const bookId = img.getAttribute('data-id');
        favoriteBooks.push(bookId);
      } else {
        favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
        const bookId = img.getAttribute('data-id');
        img.classList.remove(classNames.book.favoriteBook);
      }
    }
  }

  initActions();

}
