import { withThemeSwitcher } from 'storybook-theme-switcher'
import themes from '../src/themes'

addDecorator(withThemeSwitcher({ themes }))