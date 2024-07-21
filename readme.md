## IHBP - I Have been pwned Client

## About
**A client for a node APP to easily interact with IHAVEBEENPWNED website. Check if your email or 
password has been pwned directly when a user type a password and give instant feedback!**

**This library use puppeteer under the hood so you do not need apiKey nor configuration at all.**


## Example basic configuration

```javascript

import { Ihbp } from './lib/index.js';


const ihbp = new Ihbp()

ihbp.init()

ihbp.when('client ready', async () => {
    const result = await ihbp.isPasswordPwned('myPassword')
    console.log(result.isPasswordPwned) // -> true/false
})
```
