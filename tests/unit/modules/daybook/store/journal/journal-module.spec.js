import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state';

const createVuexStore = ( initialStore ) => createStore({
  modules: {
    journal: {
      ...journal,
      state: { ...initialStore }
    }
  }
})

describe('Vuex - test on Journal Module', () => {

  test('should be a valid state', () => {
    // Basics
    const store = createVuexStore( journalState )
    const { isLoading, entries } = store.state.journal

    expect( isLoading ).toBeFalsy()
    expect( entries ).toEqual(journalState.entries )
  })

  // Mutations
  test('mutation: setEntries', () => {
    const store = createVuexStore({ isLoading: true, entries: []})

    store.commit('journal/setEntries', journalState.entries)

    expect( store.state.journal.entries.length ).toBe(2)
    expect( store.state.journal.isLoading ).toBeFalsy()
  })

  test('mutation: updateEntry', () => {
    // create store with entries
    const store = createVuexStore( journalState )
    // updatedEntry
    const updatedEntry = {
      "id": "-N3PLntxWSjEgGDGZepB",
      "date": 1654004594018,
      "text": "Hello From Test"
    }

    // commit mutation
    store.commit('journal/updateEntry', updatedEntry)
    // expects
    // entries.lenght = 2
    const storeEntries = store.state.journal.entries

    expect( storeEntries.length ).toBe(2)
    // entries has to exists updatedEntry toEqual
    expect(
      storeEntries.find( e => e.id === updatedEntry.id )
    ).toEqual( updatedEntry )
  })

  test('mutation: addEntry deleteEntry', () => {
    const store = createVuexStore( journalState )

    // commit add entry { id: 'ABC-123', text: 'Hello World' }
    const entry = { id: 'ABC-123', text: 'Hello World' }
    store.commit('journal/addEntry', entry)

    // expects
    // entries.length to 3
    const storeEntries = store.state.journal.entries
    expect( storeEntries.length ).toBe(3)
    // new entry has to existis on store
    expect(
      storeEntries.find( e => e.id === entry.id )
    ).not.toBeNull()

    // delete entry, 'ABC-123'
    store.commit('journal/deleteEntry', entry.id)
    // expects
    // length should be 2
    expect( store.state.journal.entries.length ).toBe(2)
    // entry with id 'ABC-123' shouldnt exists
    expect(
      store.state.journal.entries.find( e => e.id === entry.id )
    ).toBeUndefined()
  })

  // Getters
  test('getters: getEntriesByTerm getEntryByID', () => {
    const store = createVuexStore( journalState )

    const [ entry1, entry2 ] = journalState.entries

    expect( store.getters['journal/getEntriesByTerm']('').length ).toBe(2)
    expect( store.getters['journal/getEntriesByTerm']('Test 1').length ).toBe(1)

    expect( store.getters['journal/getEntriesByTerm']('Test 1') ).toEqual( [ entry2 ])

    expect( store.getters['journal/getEntryById']('-N3PLntxWSjEgGDGZepB') ).toEqual(entry1)
  })

})
