import {} from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';
declare module 'styled-components' {
  type LightTheme = typeof lightTheme;
  type DarkTheme = typeof darkTheme;
  export interface DefaultTheme extends LightTheme, DarkTheme {}
}
