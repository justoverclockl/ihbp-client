### THIS LIBRARY IS CURRENT IN BETA AND UNDER DEVELOPMENT

## IHBP - I Have been pwned Client

## About
**A client for a node APP to easily interact with IHAVEBEENPWNED website. Check if your email or 
password has been pwned directly when a user type a password and give instant feedback!**

**This library use puppeteer under the hood so you do not need apiKey nor configuration at all.**


## Example basic configuration

```javascript

import { Ihbp } from 'ihbp-client'

const ih = new Ihbp()

ih.init()

ih.when('client_crashed', (error) => {
    console.log(error)
})

ih.when('client ready', async () => {
    const pw = await ih.isPasswordPwned('myPassword')
    console.log(pw.isPasswordPwned) // -> true/false
    console.log(pw)

    /* response of pw
    {
        isPasswordPwned: true,
        message: 'This password has been seen 345 times before'
    }
    */

    // at moment, the isEmailPwned method is not supported due to cloudflare turnstile protection
    const email = await ihbp.isEmailPwned('testemail@gmail.com')
})

```

## Or you can use a function to use and destroy the client

```javascript

import { Ihbp } from 'ihbp-client'

// Function to initialize and use the Ihbp client
async function useIhbp() {
    const ihbp = new Ihbp();

    ihbp.when('client_ready', async () => {
        try {
            const pw = await ihbp.isPasswordPwned('myPassword');
            console.log(pw);
        } catch (error) {
            console.error('Error checking password:', error);
        }
    });

    try {
        await ihbp.init();
    } catch (error) {
        console.error('Failed to initialize Ihbp client:', error);
    }

    // Destroy the client after usage if needed
    try {
        await ihbp.destroy();
    } catch (error) {
        console.error('Failed to destroy Ihbp client:', error);
    }
}

// Example usage
useIhbp()
    .then(() => console.log('Ihbp client used successfully'))
    .catch((error) => console.error('Error in Ihbp client usage:', error));

```
