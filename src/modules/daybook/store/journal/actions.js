import journalApi from '@/api/journalApi'
// export const myAction = async({ commit }) => {


// }

export const loadEntries = async({ commit }) => {
  const { data } = await journalApi.get('/entries.json')
  const entries = []
  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id]
    })
  }

  commit('setEntries', entries)
}

export const updateEntry = async({ commit }, entry) => { // entry should be a param

  // exctract only what we need // -id
  const { date, text } = entry
  const dataToSave = { date, text}

  // await journalApi.put (path, .json, dataToSave)
  await journalApi.put(`/entries/${entry.id}.json`, dataToSave)

  // Commit a mutation
  commit('updateEntry', entry)
}

export const createEntry = async(/*{ commit }*/) => {

}

