const User = require("../models/userModel")

exports.loginValidate = async (payload) => {
    try {
        const validator = {
            employee_ID: "string",
            password: "string",
        }
        // console.log(Object.keys(User.schema.paths))
        if(Object.keys(payload).length === 0) {
            console.log(`[-] invalid login request length ${Object.keys(payload).length}`)
            return null
        }
        // console.log("<validate> ",payload)
        
        
        if(typeof payload.body === "object") {
            const payloadKeys = Object.keys(payload.body)
            let counter = 0;

            if(payloadKeys.length !== 2) {
                console.log(`[-] invalid login body ${payloadKeys.length}`)
                return null
            }

            for(let key in validator) {
                if(payload.body[key])  console.log(`[+] ${payloadKeys[counter]}`)
                else {
                    console.log(`[-] ${payloadKeys[counter]}`)
                    return null
                }

                if(typeof payload.body[key] === validator[key])  console.log(`[+] ${typeof payload.body[key]}`)
                else {
                    console.log(`[-] ${payload.body[key]}`)
                    return null
                }
                counter++;
            }
            return payload
        }
        return null
    }
    catch (err){
        console.log("Unexpected error on validate login")
        return null
    }
}

exports.registerValidate = async (payload) => {
    try {
        const validator = {
            department_ID: "string",
            password: "string",
            repassword: "string",  
            firstname: "string",
            lastname: "string"
        }
        // console.log(Object.keys(User.schema.paths))

        if(Object.keys(payload).length === 0) {
            console.log(`[-] invalid register request ${Object.keys(payload).length}`)
            return null
        }
        // console.log("<validate> ",payload)
        
        
        if(typeof payload.body === "object") {
            const payloadKeys = Object.keys(payload.body)
            let counter = 0;

            if(payloadKeys.length !== 5) {
                console.log(`[-] invalid register body length ${payloadKeys.length}`)
                return null
            }

            for(let key in validator) {
                if(payload.body[key])  console.log(`[+] ${payloadKeys[counter]}`)
                else {
                    console.log(`[-] ${payloadKeys[counter]}`)
                    return null
                }

                if(typeof payload.body[key] === validator[key])  console.log(`[+] ${typeof payload.body[key]}`)
                else {
                    console.log(`[-] ${typeof payload.body[key]}`)
                    return null
                }
                counter++;
            }
            return payload
        }
        return null
    }
    catch (err){
        console.log("Unexpected error on validate register")
        return null
    }
}

exports.sendEmailValidate = async (payload) => {
    try {
        const validator = {
            email: "string",
        }
        // console.log(Object.keys(User.schema.paths))

        if(Object.keys(payload).length === 0) {
            console.log(`[-] invalid send email request ${Object.keys(payload).length}`)
            return null
        }
        // console.log("<validate> ",payload)
        
        
        if(typeof payload.body === "object") {
            const payloadKeys = Object.keys(payload.body)
            let counter = 0;

            if(payloadKeys.length !== 1) {
                console.log(`[-] invalid send email body length ${payloadKeys.length}`)
                return null
            }

            for(let key in validator) {
                if(payload.body[key])  console.log(`[+] ${payloadKeys[counter]}`)
                else {
                    console.log(`[-] ${payloadKeys[counter]}`)
                    return null
                }

                if(typeof payload.body[key] === validator[key])  console.log(`[+] ${typeof payload.body[key]}`)
                else {
                    console.log(`[-] ${typeof payload.body[key]}`)
                    return null
                }
                counter++;
            }
            return payload
        }
        return null
    }
    catch (err){
        console.log("Unexpected error on validate send email")
        return null
    }
}

exports.resetPasswordValidate = async (payload) => {
    try {
        const validator = {
            confirm_new_password: "string",
            email: "string",
            new_password: "string",
        }
        // console.log(Object.keys(User.schema.paths))

        if(Object.keys(payload).length === 0) {
            console.log(`[-] invalid reset password request ${Object.keys(payload).length}`)
            return null
        }
        // console.log("<validate> ",payload)
        
        
        if(typeof payload.body === "object") {
            const payloadKeys = Object.keys(payload.body)
            let counter = 0;

            if(payloadKeys.length !== 3) {
                console.log(`[-] invalid reset password body length ${payloadKeys.length}`)
                return null
            }

            for(let key in validator) {
                if(payload.body[key])  console.log(`[+] ${payloadKeys[counter]}`)
                else {
                    console.log(`[-] ${payloadKeys[counter]}`)
                    return null
                }

                if(typeof payload.body[key] === validator[key])  console.log(`[+] ${typeof payload.body[key]}`)
                else {
                    console.log(`[-] ${typeof payload.body[key]}`)
                    return null
                }
                counter++;
            }
            return payload
        }
        return null
    }
    catch (err){
        console.log("Unexpected error on validate reset password")
        return null
    }
}

exports.checkTokenValidate = async (payload) => {
    try {
        const validator = {
            authtoken: "string",
        }
        // console.log(Object.keys(User.schema.paths))

        if(Object.keys(payload).length === 0) {
            console.log(`[-] invalid tiken request ${Object.keys(payload).length}`)
            return null
        }
        // console.log("<validate> ",payload)
        
        
        if(typeof payload.headers === "object") {
            const payloadKeys = Object.keys(payload.headers)
            let counter = 0;
            
            if(payloadKeys.length !== 17) {
                console.log(`[-] invalid token headers length ${payloadKeys.length}`)
                return null
            }

            for(let key in validator) {
                if(payload.headers[key])  console.log(`[+] ${key}`)
                else {
                    console.log(`[-] ${key}`)
                    return null
                }

                if(typeof payload.headers[key] === validator[key])  console.log(`[+] ${typeof payload.headers[key]}`)
                else {
                    console.log(`[-] ${typeof payload.headers[key]}`)
                    return null
                }
                counter++;
            }
            return payload
        }
        return null
    }
    catch (err){
        console.log("Unexpected error on validate check token")
        return null
    }
}

