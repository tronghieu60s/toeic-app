import { create } from 'tailwind-rn';
import styles from './resource/styles.json';

const { tailwind, getColor } = create(styles);
export { tailwind, getColor };
