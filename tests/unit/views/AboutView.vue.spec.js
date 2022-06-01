import { shallowMount } from '@vue/test-utils'
import AboutView from '@/views/AboutView'

describe('Tests on About View component', () => {
  test('should match with the snapshot', () => {
    const wrapper = shallowMount(AboutView)
    expect( wrapper.html ).toMatchSnapshot()
  })
});
