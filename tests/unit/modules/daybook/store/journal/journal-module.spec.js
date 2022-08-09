import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state';
import authApi from '@/api/authApi';

const createVuexStore = ( initialStore ) => createStore({
  modules: {
    journal: {
      ...journal,
      state: { ...initialStore }
    }
  }
})

describe('Vuex - test on Journal Module', () => {

  beforeAll(async() => {

    const { data } = await authApi.post(':signInWithPassword', {
      email: 'patito@test.com',
      password: '123123',
      returnSecureToken: true
    })

     localStorage.setItem('idToken', data.idToken)
  })

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

  // Actions
  test('actions: loadEntries', async() => {
    const store = createVuexStore({ isLoading: true, entries: []})

    await store.dispatch('journal/loadEntries')

    expect( store.state.journal.entries.length ).toBe(8)
  })

  test('actions: loadEntries', async() => {
    const store = createVuexStore( journalState )

    const updatedEntry = {
      "id": "-N3PLntxWSjEgGDGZepB",
      "date": 1654004594018,
      "text": "Hello From Tests\n'Labore dolor laborum aliqua est excepteur labore Lorem. Laborum sint elit sit culpa labore. Eiusmod id et amet elit exercitation. Eu amet deserunt commodo voluptate et. Consequat cupidatat aliqua id eu tempor mollit laborum sunt cupidatat ipsum Lorem. Reprehenderit labore do amet proident adipisicing nisi exercitation. Consectetur do magna nulla ut eiusmod do nulla veniam officia laborum et cillum tempor.',",
      "test": true,
      "picture": "test"
    }

    await store.dispatch('journal/updateEntry', updatedEntry)

    expect( store.state.journal.entries.length ).toBe(2)
    expect(
      store.state.journal.entries.find( e => e.id === updatedEntry.id )
    ).toEqual( {
      "id": "-N3PLntxWSjEgGDGZepB",
      "date": 1654004594018,
      "text": "Hello From Tests\n'Labore dolor laborum aliqua est excepteur labore Lorem. Laborum sint elit sit culpa labore. Eiusmod id et amet elit exercitation. Eu amet deserunt commodo voluptate et. Consequat cupidatat aliqua id eu tempor mollit laborum sunt cupidatat ipsum Lorem. Reprehenderit labore do amet proident adipisicing nisi exercitation. Consectetur do magna nulla ut eiusmod do nulla veniam officia laborum et cillum tempor.',",
      "picture": "test"
    })
  })

  test('actions: createEntry deleteEntry', async() => {
    const store = createVuexStore( journalState )

    // new entry { date: 312, text: 'New entry' }
    const newEntry = { date: 1654004594018, text: 'New Entry' }

    // dispatch de create entry
    // get id from the new entry
    const id = await store.dispatch('journal/createEntry', newEntry)

    // id should be a string
    expect( typeof id ).toBe('string')

    // the new entry should exists in state entries
    expect(
      store.state.journal.entries.find( e => e.id === id )
    ).toBeTruthy()

    // dispatch delete entry
    await store.dispatch('journal/deleteEntry', id)
    // asserts
    // the new entry shouldn't exists in state
    expect(
      store.state.journal.entries.find( e => e.id === id )
    ).toBeUndefined()
  })
})
