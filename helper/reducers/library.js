import books from './BookList.json'
// import console = require('console');

module.exports = {
    library: (state = [], action) => {
        let newState = {...state}
        console.log('This is the state -----------')  
        console.log(state)
        console.log('This is the action -----------')  
        console.log(action)
        switch (action.type) {
          case 'LIBRARY':
            return [books]
          case 'LAST_READ_INDEX':
          const book = state[0].forEach( (book, index) => {
              if (book._id === action.bookID) {
                console.log('This is the book -----------', book.title)  
                console.log(book)
                if (newState[0][index].index_last_read < action.indexFurthestRead){
                  newState[0][index].index_last_read = action.indexFurthestRead
                }
              }
            })
            console.log('Returning this state =============')
            console.log(newState)
            
            return newState
          default:
            return [books]
        }
      }
}