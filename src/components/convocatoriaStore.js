import { createStore } from 'redux';


const newReducer = (state,action) => {
    if(action.type === "ADD_TO_STORE"){
        return{
            ...state,
            id: action.id,
            name: action.name,
            description: action.description,
            level: action.level,
            end_date: action.end_date,
            admin:action.admin,
            vacants: action.vacants,
            hours_per_week: action.hours_per_week,
            payout: action.payout,
            duration: action.PBM,
            requeriments: action.requeriments,
            dependences: action.dependences,
            profile: action.profile,
            activities: action.activities,
            required_files: action.required_files
        }
    }
    return state;
};

export default createStore(newReducer, {id: "",name: "",description: "",level: ""
    ,end_date:0,admin:[],vacants:0,hours_per_week: 0,payout: 0,duration: 0,requeriments: [],
dependences:[],profile:[],activities:[],required_files:[]});