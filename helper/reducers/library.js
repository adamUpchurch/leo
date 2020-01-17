import Books from './BookList.json'
import AsyncStorage from '@react-native-community/async-storage';

_retrieveData = (location) => {
  try {
    var index = AsyncStorage.getItem(location, (err, result) => result).then(result => result)
    if (index !== null) {
      return JSON.parse(index)
    }
  } catch (error) {
    return null
  }
};

_storeData = (location, value) => {
  try {
    let vocab = AsyncStorage.mergeItem(location, JSON.stringify(value));
    
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
    library: (state = {}, action) => {
      let newState = {...state}
        switch (action.type) {
          
          case 'LAST_READ_INDEX':
            delta = {
              isCurrentlyReading: true,
              index_last_read: action.book.index_last_read
            }
            newState[action.book.title] = {...newState[action.book.title], ...delta}
            _storeData('LIBRARY', newState)
            return newState

          case 'TOGGLE_IS_CURRENTLY_READING':
            newState[action.book.title].isCurrentlyReading = !newState[action.book.title].isCurrentlyReading
            _storeData('LIBRARY', newState)

            return newState
          default:
            retrievedData = _retrieveData('LIBRARY')
            newState = {...newState, ...retrievedData}

            return {...Books, ...newState}
        }
      },
    vocabulary: (state = {totalWordsExposedTo: 1, mostDayStreak:1, currentDayStreak: 1, lastReadDay: new Date(), streakStartDay: new Date(), streakStartWeek: new Date(), mostWeekStreak: 1, currentWeekStreak: 1, vocab: {bienvinidos: {text: "bienvinidos",translated: "welcome", exposures: 1}}}, action) => {
        let newState = {...state}


        switch (action.type) {
          case 'UPDATE_WORDS_EXPOSED_TO':
            var deltaVocab = {}
            
            action.words.map( word => {
              word = word.map(eachWord => eachWord.toLowerCase())
              var exposures = 1;
              if (newState.vocab.hasOwnProperty(word[0])) {
                exposures = newState.vocab[`${word[0]}`].exposures + 1
              }
              deltaVocab[word[0]] = {
                  text: word[0],
                  translated: word[1],
                  exposures
              }
            })
            newState.totalWordsExposedTo = newState.totalWordsExposedTo + action.words.length;
            newState.vocab = {...newState.vocab, ...deltaVocab}
            
            // let now = new Date()

            // if(now > (newState.lastReadDay + 86400000*2)) {
            //   newState.streakStartDay = now
            // }

            // if(now > (newState.lastReadDay + 604800000*2)) {
            //   newState.streakStartWeek = now
            // }
            
            // newState.lastReadDay = now
            // newState.currentDayStreak = newState.lastReadDay - newState.streakStartDay
            // newState.currentWeekStreak = newState.lastReadDay - newState.streakStartWeek
            // newState.mostDayStreak = (newState.mostDayStreak > newState.currentDayStreak) ? newState.mostDayStreak : newState.currentDayStreak
            // newState.mostWeekStreak = (newState.mostWeekStreak > newState.currentWeekStreak) ? newState.mostWeekStreak : newState.currentWeekStreak

            _storeData('VOCABULARY', newState)
            return newState
            
          default:
            retrievedVocab = _retrieveData('VOCABULARY')
            newState = {...newState, ...retrievedVocab}
            return newState
        }
      }
}