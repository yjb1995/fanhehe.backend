import Register from './register';
import Emitter from '../../utils/emitter';

const e = new Emitter;
e.subscribe(Register);
export const dispatch = e.dispatch.bind(e);
