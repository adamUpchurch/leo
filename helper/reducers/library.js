import Books from './BookList.json'
import AsyncStorage from '@react-native-community/async-storage';

_retrieveData = async (id) => {
  // try to get value from local storage
  // might need to change up how to parse for lastReadIndex
  // could change it to [a_key] so can parse whatever key we call for 

  try {
    var index = await AsyncStorage.getItem(`${id}`);
    // let indexToReturn = JSON.parse(index).lastReadIndex ? JSON.parse(index).lastReadIndex : 0
    return JSON.parse(index.then(result => result))
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

_retrieveVocab = async () => {
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
    let vocab = await AsyncStorage.setItem(`vocabulary`, JSON.stringify(value));
    
  } catch (error) {
    // Error saving data
    console.log(error)
  }
};

module.exports = {
    library: (state = [], action) => {
      // AsyncStorage.clear()
      console.log('=======Library=========')
      console.log(state)
      console.log(action)
      let newState = [...state] 

        switch (action.type) {
          
          case 'LAST_READ_INDEX':
            // case for calling to store last read index
            // checks each book in state for matching _id
            // stores the last_read_index in local storage by calling _storeData
            // returns newState

            newState = newState.map((book, index) => {

              // ensuring same book to save last read index
              if (book._id === action.bookID) {
                book.isCurrentlyReading = true;

                //checking to see if last read indexToStore is greater than what is saved
                if (book.index_last_read < action.indexFurthestRead){
                  // check to see if index furthest read is higher than lenght of book
                  // Set to index or reset back to back to 0
                  var indexToStore = action.indexFurthestRead < book.text.en.length ? action.indexFurthestRead : 0
                  
                  // if so -- setting newState index to indexToStore then saving to local device
                  book.index_last_read = indexToStore
                  
                  delta = {
                    index_last_read: indexToStore,
                    isCurrentlyReading: true,
                  }
                  let savingData = _storeData(book._id, delta)
                  console.log(book)
                  return book
                }
              }
              
              return book
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
              if (book._id === action.book._id) {
                var valueToStore = !action.book.isCurrentlyReading
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

          default:
            return Books.map((book) => ({...book, ..._retrieveData(book._id)}))
        }
      },
    vocabulary: (state = {bienvinidos: {text: "bienvinidos",translated: "welcome", exposures: 1}}, action) => {
        let newState = {...state}
        AsyncStorage.clear()
        console.log('=======Vocab=========')
        console.log(newState)
        console.log(action)

        switch (action.type) {
          case 'UPDATE_WORDS_EXPOSED_TO':
            // case for calling to store last read index
            // checks each book in state for matching _id
            // stores the last_read_index in local storage by calling _storeData
            // returns newState

            var deltaState = {}
            
            action.words.map( word => {
              word = word.map(word => word.toLowerCase())
              deltaState[word[0]] = {
                  text: word[0],
                  translated: word[1],
                  exposures: 0
              }
              if (newState.hasOwnProperty(word[0])) {
                  deltaState[word[0]].exposures = newState[`${word[0]}`].exposures + 1
              }
              
            })
            newState = {...newState, ...deltaState}
            // save dictionary to device
            _storeVocab(newState)
            return newState
            
          default:
            // retrievedVocab = _retrieveVocab()
            // console.log("retrievedVocab!!!")
            // console.log(retrievedVocab)
            // newState = {...newState, ...retrievedVocab}
            return newState
        }
      },
}