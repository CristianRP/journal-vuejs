import journalApi from '@/api/journalApi'
// export const myAction = async({ commit }) => {


// }

export const loadEntries = async({ commit }) => {
  const { data } = await journalApi.get('/entries.json')

  if ( !data ) {
    commit('setEntries', [])
  }

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
  const { date, text, picture } = entry
  const dataToSave = { date, text, picture}

  // await journalApi.put (path, .json, dataToSave)
  await journalApi.put(`/entries/${entry.id}.json`, dataToSave)
  dataToSave.id = entry.id

  // Commit a mutation
  commit('updateEntry', { ...dataToSave } )
}

export const createEntry = async({ commit }, entry) => {
  const { date, text, picture } = entry
  const dataToSave = { date, text, picture }

  const { data } = await journalApi.post(`/entries.json`, dataToSave)

  dataToSave.id = data.name

  commit('addEntry', dataToSave)

  return data.name
}

export const deleteEntry = async({ commit }, id) => {

  await journalApi.delete(`/entries/${id}.json`)

  commit('deleteEntry', id)

  return id
}
