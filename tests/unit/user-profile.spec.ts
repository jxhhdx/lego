import { mount, VueWrapper } from '@vue/test-utils'
import UserProfile from '@/components/UserProfile.vue'
import { message } from 'ant-design-vue'
import store from '@/store/index'
let wrapper: VueWrapper<any>
jest.mock('ant-design-vue', () => {
    return {
        message: {
            success: jest.fn()
        }
    }
})
jest.mock('vuex')
jest.mock('vue-router')

const mockComponent = {
    template: '<div><slot></slot></div>'
}
const mockComponent2 = {
    template: '<div><slot></slot><slot name="overlay"></slot></div>'
}
const globalComponent = {
    'a-button': mockComponent,
    'a-dropdown-button': mockComponent2,
    'router-link': mockComponent,
    'a-menu': mockComponent,
    'a-menu-item': mockComponent,
}

describe('UserProfile.vue', () => {
    beforeAll(() => {
        wrapper = mount(UserProfile, {
            props: {
                user: { isLogin: false }
            },
            global: {
                components: globalComponent
            }
        })
    })
    it('should render login button when login is false.', async () => {
        console.log(wrapper.html());
        expect(wrapper.get('div').text()).toBe('登录')
        await wrapper.get('div').trigger('click')
        expect(message.success).toHaveBeenCalled()
        // expect(store.state.user.data.username).toBe('gaoxiang')
    })
    it('should render login username when login is true.', async () => {
        await wrapper.setProps({
            user: { isLogin: true, data: { username: 'gaoxiang' } }
        })
        console.log(wrapper.html());
        expect(wrapper.get('.user-profile-component').html()).toContain('gaoxiang')
        expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy()
        
    })
})