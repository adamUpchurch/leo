
export function indexRecent(bookID, indexFurthestRead, title){
    return {    
        type: 'LAST_READ_INDEX',
        bookID,
        indexFurthestRead,
        title
    }
}

export function library(books){
    return {
        type: 'LIBRARY',
        books
    }
}