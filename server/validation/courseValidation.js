
exports.createCourseValidate = async (payload) => {
    try {
        const validator = {
            name: "string",
            description: "string",
            course_number: "string",
            password: "string",
            teacher: "string",
            room: "string",
            status: "string",
        }
        console.log(payload.body)
        // for(let i in payload.body) {
        //     console.log(typeof i)
        // }

        if(Object.keys(payload).length === 0) {
            console.log(`[-] invalid login request length ${Object.keys(payload).length}`)
            return {valid: false, data: `Payload must contain data`}
        }
        console.log("<validate> ",payload)
        
        if(typeof payload.body === "object") {
            const payloadKeys = Object.keys(payload.body)
            let counter = 0;

            if(payloadKeys.length !== 2) {
                console.log(`[-] invalid login body ${payloadKeys.length}`)
                return {valid: false, data: `Length of body in payload does not match`}
            }

            for(let key in validator) {
                if(payload.body[key])  console.log(`[+] ${payloadKeys[counter]}`)
                else {
                    console.log(`[-] ${payloadKeys[counter]}`)
                    return {valid: false, data: `Please enter ${key}`, field: key}
                }

                if(typeof payload.body[key] === validator[key])  console.log(`[+] ${typeof payload.body[key]}`)
                else {
                    console.log(`[-] ${payload.body[key]}`)
                    return {valid: false, data: `${key} is not ${typeof payload.body[key]}`, field: key}
                }

                if(key === "employee_ID") {
                    if(!isNaN(payload.body[key]))  console.log(`[+] ${payload.body[key]} is number`)
                    else {
                        console.log(`[-] ${payload.body[key]} is not a number`)
                        return {valid: false, data: `${key} is must be number`, field: key}
                    }

                    if(payload.body[key].length === 7)  console.log(`[+] ${key} length is correct`)
                    else {
                        console.log(`[-] ${payload.body[key]} length is not correct`)
                        return {valid: false, data: `${key} length is not correct`, field: key}
                    }
                }

                counter++;
            }
            return {valid: true, data: payload}
        }
        return {valid: false, data: "Payload is not an object"}
    }
    catch (err){
        console.log("Unexpected error on validate login")
        return {valid: false, data: `Unexpected error on validate login`}
    }
}