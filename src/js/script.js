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
    const filters = [];
    const searchFilter = document.querySelector('.filters');

    function initActions() {

        const booksElements = document.querySelector(select.containerOf.booksList);
        const booksImage = booksElements.querySelectorAll('.book__image');

        for (let img of booksImage) {
            img.addEventListener('dblclick', function(event) {
                event.preventDefault();
                const img = event.target.offsetParent;
                const bookId = img.getAttribute('data-id');
                if (!img.classList.contains(classNames.books.favoriteBook)) {
                    img.classList.add(classNames.books.favoriteBook);
                    favoriteBooks.push(bookId);

                } else {
                    favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
                    console.log(favoriteBooks);
                    img.classList.remove(classNames.books.favoriteBook);
                }
            });

        }

        searchFilter.addEventListener('change', function(event) {
            event.preventDefault();

            if (event.target.name == 'filter' && event.target.tagName == 'INPUT' && event.target.type == 'checkbox') {
                if (event.target.checked) {
                    filters.push(event.target.value);
                } else {
                    filters.splice(filters.indexOf(event.target.value));
                }
            }
            searchBooks();
        })

        function searchBooks() {
            for (let book of dataSource.books) {
                let hide = false;
                for (const filter of filters) {
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
    }
    initActions();
}
