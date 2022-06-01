import { shallowMount } from '@vue/test-utils'
import HomeView from '@/views/HomeView'

describe('Tests on HomeView component', () => {
  test('should match with the snapshot', () => {
    const wrapper = shallowMount( HomeView )
    expect( wrapper.html() ).toMatchSnapshot()
  });

  test('click on button to redired to no-entry', () => {
    const mockRouter = {
      push: jest.fn()
    }

    const wrapper = shallowMount( HomeView, {
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })

    wrapper.find( 'button' ).trigger('click')

    expect( mockRouter.push ).toHaveBeenCalled()
    expect( mockRouter.push ).toHaveBeenCalledWith({ name: 'no-entry' })
  });
});

