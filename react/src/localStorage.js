export const saveUserState = (login_response) =>
{
    try
    {
        window.localStorage.setItem("tnc_user_token", login_response.remember_token);
        window.localStorage.setItem("logged_in_details", JSON.stringify(login_response));
        return true;
    }
    catch (err) 
    {
        return undefined;
    }
}

export const loadUserState = () =>
{
    try
    {
        const serializedState = window.localStorage.getItem('logged_in_details');
        if (serializedState === null) 
        {
            return undefined;
        }
        return JSON.parse(serializedState);
    } 
    catch (err) 
    {
        return undefined;
    }
}

export const loadUserToken = () => {
    try
    {
        return window.localStorage.getItem('tnc_user_token');
    } 
    catch (err) 
    {
        return undefined;
    }
        
}

export const saveUserToken = () => {
    try
    {
        window.localStorage.setItem("tnc_user_token", null);
        return true;
    }
    catch (err) 
    {
        return undefined;
    }
}
