// export const myMutation = (state) => {
// }

export const setEntries = ( state, entries ) => {
  state.entries = [ ...state.entries, ...entries ]
  state.isLoading = false
}

export const updateEntry = ( state, entry ) => { // updated entry
  // state.entries => an array...
  const idx = state.entries.map( e => e.id ).indexOf( entry.id )
  state.entries[idx] = entry
  // state.entries = ...entries
}

export const addEntry = ( state, entry ) => {
  // state.entries.unshift(entry)
  state.entries = [ entry, ...state.entries ]
}

export const deleteEntry = ( state, id ) => {
  state.entries = state.entries.filter( entry => entry.id !== id)
}

export const clearEntries = ( state ) => {
  state.entries = []
}
