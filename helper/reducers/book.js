  module.exports = {
      book: (state = [], action) => {
          switch (action.type) {
            case 'LAST_READ_INDEX':
              return action.index
            default:
              return state
          }
        }
  }