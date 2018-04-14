import { createStore } from 'redux';

const reducer = (state,action) => {
    if(action.type === "ADD_TO_STORE"){
        return{
            ...state,
            id: action.id,
            name: action.name,
            email: action.email,
            PAPA: action.PAPA,
            PBM: action.PBM
        }
    }
    return state;
};

export default createStore(reducer, {id: "sinnada",name: "sinnadas",email: "",PAPA: 0,PBM:0});