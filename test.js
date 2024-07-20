import { Ihbp } from './lib/index.js';


const ihbp = new Ihbp()

ihbp.init()

ihbp.when('client ready', () => {
    console.log('pronto!')
})
