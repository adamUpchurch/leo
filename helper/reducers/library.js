import Books from './BookList.json'
import AsyncStorage from '@react-native-community/async-storage';

_retrieveData = (location) => {
  // try to get value from local storage
  // might need to change up how to parse for lastReadIndex
  // could change it to [a_key] so can parse whatever key we call for 
  console.log('Retrieving data')
  try {
    var index = AsyncStorage.getItem(location, (err, result) => result).then(result => result)
    if (index !== null) {
      // We have data!!
      console.log(index);
      console.log(index.then(result => result));
      return JSON.parse(index)
    }
  } catch (error) {
    // Error retrieving data
    console.log(error)
    return null
  }
};

_storeData = (location, value) => {
  // storing data, might need to add layer of protection to ensure not store index over the lenght of the book.
  // trying on receiving end. Might be worth doing it here?? Or trying to fix it before it hits here in the reading pane
  try {
    let vocab = AsyncStorage.mergeItem(location, JSON.stringify(value));
    
  } catch (error) {
    // Error saving data
    console.log(error)
  }
};

module.exports = {
    library: (state = {}, action) => {
      AsyncStorage.clear()
      let newState = {...state}
      console.log('===============')
      console.log(action)
      console.log(newState)

        switch (action.type) {
          
          case 'LAST_READ_INDEX':
            // case for calling to store last read index
            // checks each book in state for matching _id
            // stores the last_read_index in local storage by calling _storeData
            // returns newState
            delta = {
              isCurrentlyReading: true,
              index_last_read: action.book.index_last_read
            }
            console.log('LAST_READ_INDEXXXXXxxxxxx')
            console.log(action.book)
            newState[action.book._id] = {...newState[action.book._id], ...delta}
            console.log(newState)
            _storeData('LIBRARY', newState)
            return newState

          case 'TOGGLE_IS_CURRENTLY_READING':
            // case for calling to toggle whether user is reading book
            // checks each book in state for matching _id
            // toggles is_currently_reading in local storage by calling _storeData
            // returns newState
            newState[action.book._id].isCurrentlyReading = !newState[action.book._id].isCurrentlyReading
            _storeData('LIBRARY', newState)

            return newState
          default:
            retrievedData = _retrieveData('LIBRARY')
            console.log("LIBRARY!!!")
            console.log(retrievedData)
            newState = {...newState, ...retrievedData}

            return {...Books, ...newState}
        }
      },
    vocabulary: (state = {totalWordsExposedTo: 1, mostDayStreak:1, currentDayStreak: 1, lastReadDay: new Date(), streakStartDay: new Date(), streakStartWeek: new Date(), mostWeekStreak: 1, currentWeekStreak: 1, vocab: {bienvinidos: {text: "bienvinidos",translated: "welcome", exposures: 1}}}, action) => {
        let newState = {...state}
        AsyncStorage.clear()


        switch (action.type) {
          case 'UPDATE_WORDS_EXPOSED_TO':
            // case for calling to store last read index
            // checks each book in state for matching _id
            // stores the last_read_index in local storage by calling _storeData
            // returns newState

            var deltaVocab = {}
            
            action.words.map( word => {
              word = word.map(word => word.toLowerCase())
              var exposures;
              if (newState.vocab.hasOwnProperty(word[0])) {
                exposures = newState.vocab[`${word[0]}`].exposures + 1
              }
              else {
                exposures = 1
              }
              deltaVocab[word[0]] = {
                  text: word[0],
                  translated: word[1],
                  exposures: exposures
              }
              
            })
            newState.totalWordsExposedTo = newState.totalWordsExposedTo + action.words.length;
            newState.vocab = {...newState.vocab, ...deltaVocab}
            
            let now = new Date()

            if(now > (newState.lastReadDay + 86400000*2)) {
              newState.streakStartDay = now
            }

            if(now > (newState.lastReadDay + 604800000*2)) {
              newState.streakStartWeek = now
            }
            
            newState.lastReadDay = now
            newState.currentDayStreak = newState.lastReadDay - newState.streakStartDay
            newState.currentWeekStreak = newState.lastReadDay - newState.streakStartWeek
            newState.mostDayStreak = (newState.mostDayStreak > newState.currentDayStreak) ? newState.mostDayStreak : newState.currentDayStreak
            newState.mostWeekStreak = (newState.mostWeekStreak > newState.currentWeekStreak) ? newState.mostWeekStreak : newState.currentWeekStreak


            
            // save dictionary to device
            _storeData('VOCABULARY', newState)
            return newState
            
          default:
            retrievedVocab = _retrieveData('VOCABULARY')
            console.log("VOCABULARY!!!")
            console.log(retrievedVocab)
            newState = {...newState, ...retrievedVocab}
            return newState
        }
      }
}