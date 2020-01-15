module.exports = {
    indexRecent: (book, currentIndex)=> {
        return {    
            type: 'LAST_READ_INDEX',
            book,
            currentIndex,
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