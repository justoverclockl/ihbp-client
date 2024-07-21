import { Ihbp } from './lib/index.js';


const ihbp = new Ihbp()

ihbp.init()

ihbp.when('client ready', async () => {
    const isPwned = await ihbp.isPasswordPwned('pistola12')
    console.log('aaaaaaaaaaaaa', isPwned)
})

