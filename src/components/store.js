import { createStore } from 'redux';

const reducer = (state,action) => {
    if(action.type === "ADD_TO_STORE"){
        return{
            ...state,
            id: action.id,
            name: action.name,
            lastname: action.lastname,
            level:action.level,
            email: action.email,
            dependence_id: action.dependence_id,
            isAdmin: action.isAdmin
        
        }
    }
    return state;
};

export default createStore(reducer, {id: "sinnada",name: "sinnadas",lastname:" ",level:"pregrado",email: "",dependence_id:0,isAdmin:false});