import { shallowMount } from '@vue/test-utils'

import NavBar from '@/modules/daybook/components/NavBar.vue'
import createVuexStore from '../../../mock-data/mock-store'


describe('Tests on NavBar component', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const store = createVuexStore({
    user: {
      name: 'Cristian',
      email: 'cristian2@test.com'
    },
    status: 'authenticated',
    idToken: 'ABC',
    refreshToken: 'XYZ'
  })

  test('should show the component', () => {

    const wrapper = shallowMount( NavBar, {
      global: {
        plugins: [ store ]
      }
    })

    expect( wrapper.html() ).toMatchSnapshot()
  })

  test('should logout, close session and redirect', async() => {

    const wrapper = shallowMount( NavBar, {
      global: {
        plugins: [ store ]
      }
    })

    await wrapper.find('button').trigger('click')

    expect( wrapper.router.push ).toHaveBeenCalledWith({ name: 'login' })

    expect( store.state.auth ).toEqual({
      user: null,
      status: 'not-authenticated',
      idToken: null,
      refreshToken: null
    })
  })

})
