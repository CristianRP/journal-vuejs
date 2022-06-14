import { shallowMount } from '@vue/test-utils'
import EntryItem from '@/modules/daybook/components/EntryItem.vue'

describe('Tests on EntryItem component', () => {

  let mockRouter, wrapper

  beforeEach(() => {
    // mockRouter
    mockRouter = {
      push: jest.fn()
    }

    // const wrapper = shallowMount( entry, {.. props .. global} )
    wrapper = shallowMount( EntryItem, {
      props: {
        entry: {
                  "id": "-N3PLntxWSjEgGDGZepB",
                  "date": 1654004594018,
                  "text": "Hello From Journal\n'Labore dolor laborum aliqua est excepteur labore Lorem. Laborum sint elit sit culpa labore. Eiusmod id et amet elit exercitation. Eu amet deserunt commodo voluptate et. Consequat cupidatat aliqua id eu tempor mollit laborum sunt cupidatat ipsum Lorem. Reprehenderit labore do amet proident adipisicing nisi exercitation. Consectetur do magna nulla ut eiusmod do nulla veniam officia laborum et cillum tempor.',"
              }
      },
      global: {
        mocks: {
          $router: mockRouter
        }
      }
    })
  })

  test('should match with the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should redirect when click on the container', () => {
    wrapper.find('.entry-container').trigger('click')

    expect( mockRouter.push ).toHaveBeenCalled()
    expect( mockRouter.push ).toHaveBeenCalledWith({
      name: 'entry',
      params: {
        id: expect.any(String)
      }
    })
  })

  test('tests on computed properties', () => {
    // wrapper.vm <-- see computed properties
    // day: 23
    // month: July
    // yearDay: '2022, Friday'
    expect( typeof wrapper.vm.day ).toBe("number")
    expect( typeof wrapper.vm.month ).toBe("string")
    expect( typeof wrapper.vm.yearDay ).toBe("string")

  })
})

