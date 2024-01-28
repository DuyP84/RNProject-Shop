export const GETALL_PROFILE = "GETALL_PROFILE";
export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const GETDETAIL_PROFILE = "GETDETAIL_PROFILE";

const URL = `http://localhost:5555/profile/`;

//get all profile de lay username
export const getAllProfile = (profiles) => {
    return {
        type: GETALL_PROFILE,
        payload: profiles,
    };
 };

 export const fetchAllProfile = () => {
    return (dispatch)  => {
      const getData = async () => {
        
          //step 1 call api
          const res = await fetch(URL);
          const data = await res.json();

          //step 2 call action - redux
          dispatch(getAllProfile(data));
          
          };
          getData();
    };
};

//update profile 
export const updateProfile = (profile) =>{
    return {
        type: UPDATE_PROFILE,
        payload:profile,
    }
}

export const putAction = (profile) => {
    return (dispatch) => {
        const updateData = async () => {
        try {
            const res = await fetch(URL + `${profile.id}`,
            {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"},
            body: JSON.stringify(profile)      
            });
            const data = await res.json();
          dispatch(updateProfile(data));
        } catch (error) {
            console.log(error,"Failed");
        }
    };
    
    updateData();
    };
};

//search game by id
export const getProfilelById = (profile) => {
    return {
      type: GETDETAIL_PROFILE,
      payload: profile,
    };
  };
  
  export const searchProfilebyId = (id) => {
    return (dispatch) => {
      const getDetail = async () => {
        try {
          const res = await fetch(URL+`${id}`, 
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          dispatch(getProfilelById(data));
        } catch (error) {
          console.log(error);
        }
      };
      getDetail();
    };
  };