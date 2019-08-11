import Books from './BookList.json'
import AsyncStorage from '@react-native-community/async-storage';

_retrieveData = async (item, id) => {
  // try to get value from local storage
  // might need to change up how to parse for lastReadIndex
  // could change it to [a_key] so can parse whatever key we call for 

  try {
    var index = await AsyncStorage.getItem(`${item}:${id}`);
    console.log(index)
    return JSON.parse(index).lastReadIndex
  } catch (error) {
    // Error retrieving data
    console.log(error)
    return 0
  }
};

_storeData = async (item, id, value) => {
  // storing data, might need to add layer of protection to ensure not store index over the lenght of the book.
  // trying on receiving end. Might be worth doing it here?? Or trying to fix it before it hits here in the reading pane
  try {
    let index = {
      lastReadIndex: value
    }
    await AsyncStorage.setItem(`${item}:${id}`, JSON.stringify(index));
    
  } catch (error) {
    // Error saving data
    console.log("ERROR")
    console.log(error)
  }
};

module.exports = {
    library: (state = [], action) => {
        let newState = [...state]
        // AsyncStorage.clear()

        switch (action.type) {
          case 'LIBRARY':
            books = []
            state[0].forEach(book => {
              let lastReadIndex = _retrieveData('last_read_index', book.index).then( index =>{
                book.index_last_read = index
                books.push(book)
              }
              )
            })
            return [Books]
          
          case 'LAST_READ_INDEX':
            // case for calling to store last read index
            // checks each book in state for matching _id
            // stores the last_read_index in local storage by calling _storeData
            // returns newState

            const book = state[0].map( (book, index) => {

              // ensuring same book to save last read index
              if (book._id === action.bookID) {

                //checking to see if last read indexToStore is greater than what is saved
                if (newState[0][index].index_last_read < action.indexFurthestRead){
                  // check to see if index furthest read is higher than lenght of book
                  // Set to index or reset back to back to 0
                  var indexToStore = action.indexFurthestRead < book.text.en.length ? action.indexFurthestRead : 0
                  
                  // if so -- setting newState index to indexToStore then saving to local device
                  newState[0][index].index_last_read = indexToStore
                  
                  _storeData('last_read_index', book._id, indexToStore).then(
                    nothing => newState
                  );
                }
              }
            })
            return newState
            

          default:

          // Retrieve last read index for each book, set the index value to .index_last_read before returning
            Books.forEach((book, index) => {
              _retrieveData('last_read_index', book._id).then( value =>{
                // Check is index value is not null or set to 0
                var indexValue = value ? value : 0
                // Check to see if indexValue is greater than length of book - if so, reset to 0
                Books[index].index_last_read = indexValue < book.text.en.length ? indexValue : 0
              }
              )
            })
            return [Books]
        }
      }
}