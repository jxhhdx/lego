import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Hello from '@/components/Hello.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = mount(HelloWorld, {
      props: { msg }
    })
    console.log(wrapper.findComponent(Hello).props());
    console.log(wrapper.get('h1').text());
  })
  it('should update the count when clicking thne button', async () => {
    const msg = 'new message'
    const wrapper = mount(HelloWorld, {
      props: { msg }
    })
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('button').text()).toBe('1')
  })
  it('should update the count when fill the input add click the add button', async () => {
    const msg = 'new message'
    const todoContent = 'buy milk'
    const wrapper = mount(HelloWorld, {
      props: { msg }
    })
    await wrapper.get('input').setValue(todoContent)
    expect(wrapper.get('input').element.value).toBe(todoContent)
    await wrapper.get('.addTodo').trigger('click')
    expect(wrapper.findAll('li')).toHaveLength(1)
    expect(wrapper.get('li').text()).toBe(todoContent)
    const events = wrapper.emitted('send') ?? []
    console.log(events);
    
    expect(events[0]).toEqual([todoContent])
  })
})
