import { Ihbp } from './lib/index.js';


const ihbp = new Ihbp()

ihbp.init()

ihbp.when('client ready', async () => {
    const pw = await ihbp.isPasswordPwned('myPassword')

    // at moment, the isEmailPwned method is not supported due to cloudflare turnstile
    const email = await ihbp.isEmailPwned('testemail@gmail.com')
    console.log(pw, email)
})

