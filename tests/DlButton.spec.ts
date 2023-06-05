import { mount } from '@vue/test-utils'
import { DlButton } from '../src/components'
import { beforeAll, describe, expect, it } from 'vitest'

describe('DlButton', () => {
    describe('When mounting', () => {
        let wrapper: any
        beforeAll(() => {
            wrapper = mount(DlButton, {
                props: {
                    filled: true,
                    label: 'Filled',
                    disabled: false
                }
            })
        })
        it('should exist the component', function () {
            expect(wrapper.exists()).toBe(true)
        })
        it('should have the right props', () => {
            expect(wrapper.props()).toStrictEqual({
                filled: true,
                label: 'Filled',
                color: '',
                colorsObject: null,
                disabled: false,
                round: false,
                padding: '',
                margin: '0 auto',
                flat: false,
                styles: null,
                fluid: false,
                transform: 'default',
                icon: '',
                noWrap: false,
                outlined: false,
                size: 'm',
                textColor: '',
                iconColor: '',
                overflow: false,
                tooltip: null,
                dense: false,
                active: false,
                shaded: false,
                uppercase: false
            })
        })
    })
    describe('When trigger the events', () => {
        let wrapper: any
        let buttonElem: any
        beforeAll(async () => {
            wrapper = mount(DlButton, {
                props: {
                    filled: true,
                    label: 'Filled',
                    disabled: false
                }
            })
            buttonElem = await wrapper.find('.dl-button')
        })
        it('should exist the click event', async () => {
            buttonElem.trigger('click')

            expect(wrapper.emitted()).toHaveProperty('click')

            expect(wrapper.vm.isActionable).toBe(true)

            expect(buttonElem.attributes().tabindex).toBe('0')
        })
        it('should trigger right click event', function () {
            const clickEvent = wrapper.emitted('click')

            expect(clickEvent).toHaveLength(1)
        })
    })
    describe('When updating props', () => {
        let wrapper: any
        let buttonElem: any
        beforeAll(async () => {
            wrapper = mount(DlButton, {
                props: {
                    filled: true,
                    label: 'Filled',
                    disabled: false
                }
            })
            buttonElem = await wrapper.find('.dl-button')
        })
        it('should work disable button', async () => {
            await wrapper.setProps({
                filled: true,
                label: 'Filled',
                color: '',
                disabled: true,
                uppercase: false,
                flat: false,
                padding: '',
                fluid: false,
                icon: 'dl-add',
                outlined: false,
                size: 'm',
                textColor: ''
            })

            expect(wrapper.vm.isActionable).toBe(false)

            expect(buttonElem.attributes().tabindex).toBe('-1')
        })
        it('should be right style', async () => {
            await wrapper.setProps({
                filled: true,
                label: '',
                color: '',
                padding: '',
                disabled: true,
                flat: false,
                uppercase: false,
                fluid: false,
                icon: 'dl-add',
                iconColor: '',
                outlined: false,
                size: 'm',
                textColor: ''
            })

            const button = wrapper.find('.dl-button-container')

            expect(
                button.element.style.getPropertyValue(
                    '--dl-button-border-radius'
                )
            ).toBe('2px')
        })
    })
})
