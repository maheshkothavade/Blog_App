// API_NOTIFICATION_MESSAGES
export const API_NOTIFICATION_MESSAGES = {
    loading:{
        title:"loading...",
        message:"Data is being loaded,please wait"
    },
    success:{
        title:"success",
        message:"data is successfully loaded"
    },
    responseFailure:{
        title:"error",
        message:"An error occured while fetching response from server.Please try again"
    },
    requestFailure:{
        title:"error",
        message:"An error occured while parsing the data"
    },
    networkError:{
       title:"error",
       message:"unable to connect with server"
    }
}

// API SERVICE CALL

export const SERVICE_URLS = {
    userSignup:{url:'/signup',method:'POST'},
    userLogin:{url:'/login',method:'POST'},
    uploadFile:{url:'/file/upload',method:'POST'},
    createPost:{url:'create',method:'POST'},
    getAllPosts:{url:'/posts',method:'GET',params:true},
    getPostById:{url:'post',method:'GET',query:true},
    UpdatePost:{url:'update',method:'PUT',query:true},
    deletePost:{url:'delete',method:'DELETE',query:true},
    newComment:{url:'/comment/new',method:'POST'},
    getAllComments:{url:'comments',method:'GET',query:true},
    deleteComment:{url:'comment/delete',method:'DELETE',query:true}
}