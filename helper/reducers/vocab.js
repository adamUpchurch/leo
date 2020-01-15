import Books from './BookList.json'
import AsyncStorage from '@react-native-community/async-storage';

module.exports = {
    library: (state = {}, action) => {
      // AsyncStorage.clear()
        let newState = {...state}

        switch (action.type) {
          
          case 'LAST_READ_INDEX':

            updatedNewState = Object.values(newState.library).map( book => {

              if (book._id === action.book._id) {
                if (action.index_current < book.text.en.length) {
                  delta = {
                    index_current: 0,
                    furthest_read: 0,
                    times_finished: book.times_finished ? book.times_finished ++ : 1,
                    hasFinished: true,
                    isCurrentlyReading: false,
                  }
                  return {...book, ...delta}
                }
                else {
                  delta = {
                    index_current: action.index_current,
                    furthest_read: book.furthest_read < action.index_current ? book.furthest_read : action.index_current,
                  }
                  return {...book, ...delta}
                }
              }
              return book
            })
            newState.library = {...newState.library, ...updateNewState}
            return newState

          case 'TOGGLE_IS_CURRENTLY_READING':

            updatedNewState = Object.values(newState.library).map( book => {
              if (book._id === action.book._id) {
                delta = {
                  isCurrentlyReading: !action.book.isCurrentlyReading
                }
                return {...book, ...delta}
              } else {
                return book
              }
            })
            newState.library = {...newState.library, ...updateNewState}
            return newState

          default:
            return newState
        }
      },
    vocabulary: (state = {"bienvinidos": "welcome"}, action) => {
        let newState = {...state}
        // AsyncStorage.clear()

        switch (action.type) {
          case 'UPDATE_WORDS_EXPOSED_TO':
            // case for calling to store last read index
            // checks each book in state for matching _id
            // stores the last_read_index in local storage by calling _storeData
            // returns newState
            const updateNewVocabulary = action.words.map( word => {
              word = word.toLowerCase()
              if (newState.vocabulary.hasOwnProperty(word[0])) {
                word.exposures = newState.vocabulary[word].exposures + 1
              }
              else {
                [word[0]] = {
                    text: word[0],
                    translated: word[1],
                    exposures: 1
                }
              }

            })
            return newState
          default:
            return Books.map((book) => ({...book, ..._retrieveData(book._id)}))
        }
      },
}



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