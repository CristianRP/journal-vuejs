import { shallowMount } from '@vue/test-utils';
import Login from '@/modules/auth/views/LoginView.vue'

import createVuexStore from '../../../mock-data/mock-store'

import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn()
}))

describe('Tests on Login component', () => {

  const store = createVuexStore({
    status: 'not-authenticated',
    user: null,
    idToken: null,
    refreshToken: null
  })

  store.dispatch = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  test('should match with snapshot', () => {
    const wrapper = shallowMount( Login, {
      global: {
        plugins: [ store ]
      }
    })

    expect( wrapper.html() ).toMatchSnapshot()
  })

  test('wrong credentials, shows Swal alert', async() => {

    store.dispatch.mockReturnValueOnce({ ok: false, message: 'Credentials errors' })

    const wrapper = shallowMount( Login, {
      global: {
        plugins: [ store ]
      }
    })

    await wrapper.find('form').trigger('submit')

    expect(store.dispatch).toHaveBeenCalledWith('auth/signInUser', { email: '', password: '' })
    expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Credentials errors', 'error')

  })

  test('should redirect to no-entry route', async() => {

    store.dispatch.mockReturnValueOnce({ ok: true })

    const wrapper = shallowMount( Login, {
      global: {
        plugins: [ store ]
      }
    })

    const [ txtEmail, txtPassword ] = wrapper.findAll('input')
    await txtEmail.setValue('cristia@test.com')
    await txtPassword.setValue('123123')

    await wrapper.find('form').trigger('submit')

    expect( store.dispatch ).toHaveBeenCalledWith('auth/signInUser', {'email': 'cristia@test.com', 'password': '123123'})
    expect( wrapper.router.push ).toHaveBeenCalledWith({'name': 'no-entry'})

  })
})
