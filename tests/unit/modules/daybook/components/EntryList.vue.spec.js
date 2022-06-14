import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import EntryList from '@/modules/daybook/components/EntryList'

import journal from '@/modules/daybook/store/journal'
import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters'
import { journalState } from '../../../mock-data/test-journal-state'

const createVuexStore = ( initialStore ) => createStore({
  modules: {
    journal: {
      ...journal,
      state: { ...initialStore }
    }
  }
})

describe('Tests on EntryList', () => {

  let wrapper

  const store = createVuexStore( journalState )
  const mockRouter = {
    push: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()

    wrapper = shallowMount( EntryList, {
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [ store ]
      }
    })
  })

  test('should call getEntriesByTerm and show 2 entries', () => {
    expect( wrapper.findAll('entry-item-stub').length ).toBe(2)
    expect( wrapper.html() ).toMatchSnapshot()
  })

  test('should call getEntriesByTerm and filter entries', async() => {
    const input = wrapper.find('input')
    await input.setValue('Test')

    expect( wrapper.findAll('entry-item-stub').length ).toBe(1)
  })

  test('new button should redirect to /new', () => {
    wrapper.find('button').trigger('click')

    expect( mockRouter.push ).toHaveBeenCalledWith({
      name: 'entry',
      params: {
        id: 'new'
      }
    })
  })
})
