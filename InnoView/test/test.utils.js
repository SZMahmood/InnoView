export function createJSONFromCredentials(email, name, password)
{
    return {
        "email": email,
        "name": name,
        "password": password
    };
}

export function checkForCredentialWithinList(list, email, name, password)
{
    for (let index = 0; index < list.length; index++) 
    {
        let element = list[index];
        if(element?.email == email && element?.name == name && element?.password == password)
        {
            return true;
        }
    }

    return false
}