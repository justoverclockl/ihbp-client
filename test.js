import { Ihbp } from './lib/index.js';


const ihbp = new Ihbp()

ihbp.init()

ihbp.when('client ready', async () => {
    //const result = await ihbp.isPasswordPwned('myPassword')
    const result = await ihbp.isEmailPwned('markoxaser@gmail.com')
    console.log(result)
})

