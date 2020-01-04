import Books from './BookList.json'
import AsyncStorage from '@react-native-community/async-storage';

_retrieveData = async (id) => {
  // try to get value from local storage
  // might need to change up how to parse for lastReadIndex
  // could change it to [a_key] so can parse whatever key we call for 

  try {
    var index = await AsyncStorage.getItem(`${id}`);
    // let indexToReturn = JSON.parse(index).lastReadIndex ? JSON.parse(index).lastReadIndex : 0
    return JSON.parse(index)
  } catch (error) {
    // Error retrieving data
    console.log(error)
    return 0
  }
};

_storeData = async (id, delta) => {
  // storing data, might need to add layer of protection to ensure not store index over the lenght of the book.
  // trying on receiving end. Might be worth doing it here?? Or trying to fix it before it hits here in the reading pane

  try {
    var data = await AsyncStorage.mergeItem(id, JSON.stringify(delta), () => {
      AsyncStorage.getItem(id, (err, result) => {
        return result
      })
    })
    return data

  } catch {
    try {
      var data = await AsyncStorage.setItem(id, JSON.stringify(delta), () => {
        AsyncStorage.getItem(id, (err, result) => {
          return result
        })
      })
    } catch (error) {
      console.log(error)
    }

  }
};

_retrieveVocab = async (item, id) => {
  // try to get value from local storage
  // might need to change up how to parse for lastReadIndex
  // could change it to [a_key] so can parse whatever key we call for 

  try {
    var index = await AsyncStorage.getItem(`vocabulary`);
    return JSON.parse(index)
  } catch (error) {
    // Error retrieving data
    console.log(error)
    return 0
  }
};

_storeVocab = async (value) => {
  // storing data, might need to add layer of protection to ensure not store index over the lenght of the book.
  // trying on receiving end. Might be worth doing it here?? Or trying to fix it before it hits here in the reading pane
  try {
    let index = {
      vovabulary: value
    }
    let vocab = await AsyncStorage.setItem(`vocabulary`, JSON.stringify(index));
    
  } catch (error) {
    // Error saving data
    console.log(error)
  }
};

module.exports = {
    library: (state = [], action) => {
        let newState = [...state]
        // AsyncStorage.clear()

        switch (action.type) {
          
          case 'LIBRARY':
            return Books.map((book) => ({...book, ..._retrieveData(book._id)}))
          
          case 'LAST_READ_INDEX':
            // case for calling to store last read index
            // checks each book in state for matching _id
            // stores the last_read_index in local storage by calling _storeData
            // returns newState

            newState = newState.map((book, index) => {

              // ensuring same book to save last read index
              if (book._id === action.bookID) {

                //checking to see if last read indexToStore is greater than what is saved
                if (book.index_last_read < action.indexFurthestRead){
                  // check to see if index furthest read is higher than lenght of book
                  // Set to index or reset back to back to 0
                  var indexToStore = action.indexFurthestRead < book.text.en.length ? action.indexFurthestRead : 0
                  
                  // if so -- setting newState index to indexToStore then saving to local device
                  book.index_last_read = indexToStore
                  book.isCurrentlyReading = true;
                  delta = {
                    index_last_read: indexToStore,
                    isCurrentlyReading: true,
                  }
                  let savingData = _storeData(book._id, delta)
                  console.log(book)
                  return book
                }
              }
              else {
                return book
              }
            })
            console.log("&&&&& This is the newState")
            console.log(newState)
            return newState

          case 'TOGGLE_IS_CURRENTLY_READING':
            // case for calling to toggle whether user is reading book
            // checks each book in state for matching _id
            // toggles is_currently_reading in local storage by calling _storeData
            // returns newState


            newState = newState.map( (book, index) => {

              // ensuring same book to save last read index
              if (book._id === action.bookInfo.bookID) {
                var valueToStore = !action.bookInfo.isCurrentlyReading
                delta = {
                  isCurrentlyReading: valueToStore
                }
                book.isCurrentlyReading = valueToStore
                _storeData(book._id, delta)
                return book
              }
                return book
            })
            return newState

          case 'UPDATE_WORDS_EXPOSED_TO':
            // case for calling to store last read index
            // checks each book in state for matching _id
            // stores the last_read_index in local storage by calling _storeData
            // returns newState
            const dictionary = action.words.map( (word, index) => {
              if(newState.length == 1) {
                newState.push(Object)
              }
              word = word.map(word => word.toLowerCase())
              if (newState[1].hasOwnProperty(`${word[0]}`)) {
                newState[1][`${word[0]}`].exposures = newState[1][`${word[0]}`].exposures + 1
              }
              else {
                newState[1][word[0]] = {
                    text: word[0],
                    translated: word[1],
                    exposures: 1
                }
              }
              // save dictionary to device
              _storeVocab(newState).then(
                nothing => newState
              );
            })
            return newState
          default:
            return Books.map((book) => ({...book, ..._retrieveData(book._id)}))
        }
      },
}