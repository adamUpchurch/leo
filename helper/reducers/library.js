import Books from './BookList.json'

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
            

            return newState

          case 'TOGGLE_IS_CURRENTLY_READING':
            newState[action.book.title].isCurrentlyReading = !newState[action.book.title].isCurrentlyReading

            return newState
          default:
            return {...Books, ...newState}
        }
      },
    vocabulary: (state = {totalWordsExposedTo: 1, vocab: {bienvinidos: {text: "bienvinidos",translated: "welcome", exposures: 1}}}, action) => {
        let newState = {...state}


        switch (action.type) {
          case 'UPDATE_WORDS_EXPOSED_TO':
            var deltaVocab = {}
            
            action.words.map( word => {
              word = word.map(eachWord => eachWord.toLowerCase())
              var exposures;
              if (newState.vocab.hasOwnProperty(word[0])) {
                exposures = newState.vocab[`${word[0]}`].exposures + 1
              }
              deltaVocab[word[0]] = {
                  text: word[0],
                  translated: word[1],
                  exposures: exposures ? exposures : 1
              }
            })
            newState.totalWordsExposedTo = newState.totalWordsExposedTo + action.words.length;
            newState.vocab = {...newState.vocab, ...deltaVocab}

            return newState
            
          default:
            return newState
        }
      }
}