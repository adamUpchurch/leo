
module.exports = {
    indexRecent: (book)=> {
        return {    
            type: 'LAST_READ_INDEX',
            book,
        }
    },
    toggleIsReading: (book) => {
        return {
            type: 'TOGGLE_IS_CURRENTLY_READING',
            book
        }
    },
    updateVocabulary: (words) => {
            return {    
                type: 'UPDATE_WORDS_EXPOSED_TO',
                words
            }
    },

}


// export function indexRecent(bookID, indexFurthestRead, title){
//     return {    
//         type: 'LAST_READ_INDEX',
//         bookID,
//         indexFurthestRead,
//         title
//     }
// }

// export function updateVocabulary(words){
//     return {    
//         type: 'UPDATE_WORDS_EXPOSED_TO',
//         words
//     }
// }

// export function library(books){
//     return {
//         type: 'LIBRARY',
//         books
//     }
// }