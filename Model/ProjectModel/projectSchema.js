import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const ProjectSchema = new Schema({
    title: { type: String, required: [true, "Add title"] },
    heading: { type: String, required: [true, "Add heading"] },
    image: {
        url: {
            type: String,
            default:null,          
        },
        public_id: {
            type: String,
            default:null,     
        },   
    },
    description: {
        type: String,
        required: [true, "Add Your Intro"]
    },
    startDate:{
        type: Date,
        required:[true,"Date Missing"]
    },
   
    liveLink:{   type: String,
        default:"https://portfolio-2-0-six-omega.vercel.app/",  },
    githubLink:{
        type: String,
        default:"https://github.com/harshprateek39",
    },
    technologies: [ { type: String  ,required:true}]
    
    
},
{ collection: "Project" });

export const ProjectModel = model("Project", ProjectSchema);
