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
            favoriteBook: 'favorite',
            filters: '.filters',
            rating: 'book__rating__fill',
        }
    };

    const templates = {
        templateBook: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
    };

    class Books {

        constructor() {
            const thisBook = this;
            thisBook.initData();
            thisBook.getElements();
            thisBook.render();
            thisBook.initActions();
        }

        initData() {
            this.data = dataSource.books;
        }

        getElements() {
            const thisBook = this;
            thisBook.templateBook = document.querySelector(select.templateOf.templateBook);
            thisBook.booksList = document.querySelector(select.containerOf.booksList);
            thisBook.form = document.querySelector(classNames.books.filters);
            thisBook.favoriteBooks = [];
            thisBook.filters = [];
        }

        initActions() {
            const thisBook = this;
            const booksElements = document.querySelector(select.containerOf.booksList);
            const booksImage = booksElements.querySelectorAll('.book__image');

            for (let img of booksImage) {
                img.addEventListener('dblclick', function(event) {
                    event.preventDefault();
                    const img = event.target.offsetParent;
                    const bookId = img.getAttribute('data-id');
                    if (!img.classList.contains(classNames.books.favoriteBook)) {
                        img.classList.add(classNames.books.favoriteBook);
                        thisBook.favoriteBooks.push(bookId);

                    } else {
                        thisBook.favoriteBooks.splice(thisBook.favoriteBooks.indexOf(bookId), 1);
                        img.classList.remove(classNames.books.favoriteBook);
                    }
                });
            }

            thisBook.form.addEventListener('change', function(event) {
                event.preventDefault();
                if (event.target.name == 'filter' && event.target.tagName == 'INPUT' && event.target.type == 'checkbox') {
                    if (event.target.checked) {
                        thisBook.filters.push(event.target.value);
                    } else {
                        thisBook.filters.splice(thisBook.filters.indexOf(event.target.value));
                    }
                }
                thisBook.searchBooks();
            });
        }

        searchBooks() {
            const thisBook = this;
            for (let book of this.data) {
                let hide = false;
                for (const filter of thisBook.filters) {
                    if (!book.details[filter]) {
                        hide = true;
                        break;
                    }
                }
                const selectedBooks = document.querySelector('.book__image[data-id= "' + book.id + '"]');
                if (hide)
                    selectedBooks.classList.add('hidden');
                else
                    selectedBooks.classList.remove('hidden');
            }
        }

        render() {
            const thisBook = this;
            for (let book of this.data) {

                const ratingBcg = thisBook.determineRatingBgc(book.rating);

                const ratingWidth = book.rating * 10;

                book.ratingBgc = ratingBcg;

                book.ratingWidth = ratingWidth;

                const generatedHTML = templates.templateBook(book);

                const element = utils.createDOMFromHTML(generatedHTML);

                const booksListContainer = document.querySelector(select.containerOf.booksList);
                booksListContainer.appendChild(element);
            }
        }

        determineRatingBgc(rating) {
            if (rating < 6) {
                return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
            } else if (rating > 6 && rating <= 8) {
                return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
            } else if (rating > 8 && rating <= 9) {
                return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
            } else if (rating > 9) {
                return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
            }
        }
    }
    new Books();
}
