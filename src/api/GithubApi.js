import axios from "axios"

export const fetchData = async(username)=>{
    const {data} = await axios.get(`https://api.github.com/users/${username}`)
    
    return data;
}
export const fetchRepos= async(username)=>{
    const {data} = await axios.get(`https://api.github.com/users/${username}/repos`)
    return data
}

export const fetchFollowers = async (username)=>{
    const {data} = await axios.get(`https://api.github.com/users/${username}/followers`)
    return data
}

