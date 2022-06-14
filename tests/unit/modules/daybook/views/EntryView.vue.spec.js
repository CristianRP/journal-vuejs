import { shallowMount } from '@vue/test-utils'
import { createStore } from 'vuex'

import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state'

import EntryView from '@/modules/daybook/views/EntryView'

import Swal from 'sweetalert2'

const createVuexStore = ( initialStore ) => createStore({
  modules: {
    journal: {
      ...journal,
      state: { ...initialStore }
    }
  }
})

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn()
}))

describe('Tests on EntryView component', () => {
  let wrapper

  const store = createVuexStore( journalState )
  store.dispatch = jest.fn()

  const mockRouter = {
    push: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()

    wrapper = shallowMount( EntryView, {
      props: {
        id: '-N3PLntxWSjEgGDGZepB'
      },
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [ store ]
      }
    })
  })

  test('should return the user to home if id does not exists', () => {
    wrapper = shallowMount( EntryView, {
      props: {
        id: 'does_not_exists'
      },
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [ store ]
      }
    })

    expect( mockRouter.push ).toHaveBeenCalled()
    expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })
  })

  test('should show the proper entry', () => {
    expect( wrapper.html() ).toMatchSnapshot()
    expect( mockRouter.push ).not.toHaveBeenCalled()
  })

  test('should delete the entry', (done) => {
    Swal.fire.mockReturnValueOnce( Promise.resolve({ isConfirmed: true }))

    wrapper.find('.btn-danger').trigger('click')

    expect( Swal.fire ).toHaveBeenCalledWith({
      title: 'Are you sure?',
      text: 'This will erase the entry permanently',
      showDenyButton: true,
      confirmButtonText: 'Yes, delete',
      denyButtonText: 'Cancel'
    })

    setTimeout(() => {
      expect( store.dispatch ).toHaveBeenCalledWith("journal/deleteEntry", "-N3PLntxWSjEgGDGZepB")
      expect( mockRouter.push ).toHaveBeenCalled()
      done()
    }, 1);
  })
})
