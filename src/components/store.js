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
            PAPA: action.PAPA,
            PBM: action.PBM
        }
    }
    return state;
};

export default createStore(reducer, {id: "sinnada",name: "sinnadas",lastname:" ",level:"pregrado",email: "",dependence_id:0,PAPA: 0,PBM:0});