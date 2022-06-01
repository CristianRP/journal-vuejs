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

})
