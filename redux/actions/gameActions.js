export const GETALL = "GETALL";

export const CREATE = "CREATE";
export const EDIT = "EDIT";
export const DELETE = "DELETE";

export const GETDETAIL = "GETDETAIL";
export const SEARCH = "SEARCH";

const URL = `http://localhost:5555/gameshop/`;

// get all games
export const getAllGames = (games) => {
    return {
        type: GETALL,
        payload: games,
    };
 };

export const fetchAll = () => {
    return (dispatch)  => {
      const getData = async () => {
        
          //step 1 call api
          const res = await fetch(URL);
          const data = await res.json();

          //step 2 call action - redux
          dispatch(getAllGames(data));
          
          };
          getData();
    };
};

// add new item
export const addGame = (game) => {
    return {
      type: CREATE,
      payload: game,
    };
  };

export const postAction = (game) => {
    return (dispatch) => {
        const postData = async () => {
            try {
                const res = await fetch(URL +"add",
                {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"},
                body: JSON.stringify(game)      
                });
            
            const data = await res.json();
            
          dispatch(addGame(data));
        } catch (error) {
            console.log(error);
        }
    };
    
    postData();
    };
};

//update item
export const updateGame = (game) =>{
    return {
        type: EDIT,
        payload:game,
    }
}

export const putAction = (game) => {
    return (dispatch) => {
        const updateData = async () => {
        try {
            const res = await fetch(URL + `update/${game.id}`,
            {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"},
            body: JSON.stringify(game)      
            });
            const data = await res.json();
          dispatch(updateGame(data));
        } catch (error) {
            console.log(error,"Failed");
        }
    };
    
    updateData();
    };
};

export const deleteGame = (id) =>{
    return {
        type: DELETE,
        payload:id,
    }
}
//delete item
export const DeleteAction = (id) => {
    return (dispatch) => {
      const DeleteData = async () => {
        try {
            const res = await fetch(URL + `delete/${id}`,{
            method:"DELETE",
        })
        console.log("Deleted");
        } catch (error) {
          console.log(error, "500");
        }
      };
      DeleteData();
      dispatch(deleteGame(id))
      
    };
  };
//search game by id
  export const getGameDetailById = (game) => {
    return {
      type: GETDETAIL,
      payload: game,
    };
  };
  
  export const searchGamebyId = (id) => {
    return (dispatch) => {
      const getDetail = async () => {
        try {
            const res = await fetch(URL+`${id}`, {
            method: "GET",
            headers: {
                //thieu 1 dong
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          dispatch(getGameDetailById(data));
        } catch (error) {
          console.log(error);
        }
      };
      getDetail();
    };
  };


//search Game By Name
  export const getGameDetailByName = (games) => {
    return {
      type: SEARCH,
      payload: games,
    };
  };
  
  export const searchGameByName = (name) => {
    return (dispatch) => {
      const getData = async () => {
        try {
            const res = await fetch(URL + `search/${name}`);
          const games = await res.json();
          dispatch(getGameDetailByName(games));
          console.log(games);
        } catch (error) {
          console.log(error);
        }
      };
      getData();
    };
  };