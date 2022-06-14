import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import EntryList from '@/modules/daybook/components/EntryList'

import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters'
import { journalState } from '../../../mock-data/test-journal-state'

describe('Tests on EntryList', () => {

  const journalMockModule = {
    namespaced: true,
    getters: {
      // getEntriesByTerm: jest.fn()
      getEntriesByTerm
    },
    state: () => ({
      isLoading: false,
      entries: journalState.entries
    })
  }

  const store = createStore({
    modules: {
      journal: { ...journalMockModule }
    }
  })

  const wrapper = shallowMount( EntryList, {
    global: {
      mocks: {
        // $router:
      },
      plugins: [ store ]
    }
  })

  test('should call getEntriesByTerm and show 2 entries', () => {
    console.log(wrapper.html());
  })
})
