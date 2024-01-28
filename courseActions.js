export const GETALL = "GETALL";
export const CREATE = "CREATE";
export const EDIT = "EDIT";
export const DELETE = "DELETE";



 export  const getAllCourses=(podcast) => {
    return {
        type: GETALL,
        payload: podcast
    };
 }

export const fetchAllCourses = () => {
    return (dispatch)  => {
            //step 1 call api
            const getData = async () => {
                const podcast = await fetch("http://localhost:5555/podcast");
                const data = await podcast.json();
                
                //step 2 call action - redux
                dispatch(getAllCourses(data));
            }
            getData();
            
    }
}

export const createCourse=(podcast) => {
    return {
        type: CREATE,
        payload: podcast,
    };
 }

export const postCourse = (data) => {
    return (dispatch) => {
        const postData = async () => {
        try {
             await fetch(`http://localhost:5555/podcast`,
            {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"},
            body: JSON.stringify(data)      
            });
            console.log('Show',data,"Added successfully");
        } catch (error) {
            console.log(error);
        }
    };
    
    postData();
    dispatch(createCourse(data));
    };
};

export const updateCourse = (podcast) =>{
    return {
        type: EDIT,
        payload:podcast,
    }
}

export const putCourse = (podcast) => {
    return (dispatch) => {
        const editData = async () => {
        try {
             await fetch(`http://localhost:5555/podcast/${podcast.id}`,
            {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"},
            body: JSON.stringify(podcast)      
            });
            
            console.log('status:',podcast, "Updated");
            
        } catch (error) {
            console.log(error,"Fail");
        }
    };
    
    editData();
    dispatch(updateCourse(id));
    
    };
};

export const DeleteTypes = (id) =>{
    return {
        type: DELETE,
        payload:id,
    }
}

export const DeleteAction = (id) => {
    return (dispatch) => {
      const DeleteData = async () => {
        try {
         await fetch(`http://localhost:5555/api/podcast/${id}`,{
            method:"DELETE",
        })
        console.log("Deleted");
        } catch (error) {
          console.log(error, "500");
        }
      };
      DeleteData();
      dispatch(DeleteTypes(id))
      
    };
  };

