import { shallowMount } from '@vue/test-utils'
import FabButton from '@/modules/daybook/components/FabButton'

describe('Test on FabButton Component', () => {
  test('should show the default button', () => {
    // fa-plus
    const wrapper = shallowMount( FabButton )

    expect( wrapper.find('i').classes() ).toContain('fa-plus')
  });

  test('should show the default button', () => {
    // fa-circle
    const wrapper = shallowMount( FabButton, {
      props: {
        icon: 'fa-circle'
      }
    })

    expect( wrapper.find('i').classes() ).toContain('fa-circle')
  });

  test('should emit the on:click', () => {
    // wrapper.emitted('on:click')
    const wrapper = shallowMount( FabButton )

    wrapper.find('button').trigger('click')

    expect( wrapper.emitted('on:click') ).toHaveLength(1)
  });
});

