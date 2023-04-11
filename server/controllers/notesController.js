import notesSchema from "../models/notesSchema.js";

//create(post)
export const createNote = async(req, res) => {
    try {
        const {title, description } = req.body; //destructuring req.body
        const createNote = await notesSchema.create({
            title,
            description,
        })
        if(createNote)
        {
                res.status(200).json ({
                status :200,
                success:true,
                message:"Note Created Successfully",
            })
        }

    }
    catch(error) {
            console.log(error);
            res.json({
            success:false,
            message:"Failed to Create Note.."
        })
    }
 }

 //read(get)
  export const getAll = async(req, res) => {
    try {
        const notes = await notesSchema.find({});
        if(notes)
        {
            res.status(200).json ({
                status : 200,
                success:true,
                message:"Note Fetched Successfully",
                notes,
            }) 
        }

    }
    catch(err){
        console.log(err);
        res.json({
            success:false,
            message:"Failed to Fetch Note"
        })

    }
  }  

export const getById = async(req, res) => {
    try {
    const notes = await notesSchema.findById(req.params.id);
    if(notes) {
        res.status(200).json ({
            status :200,
            success:true,
            message:"Note fetched Successfully",
            notes,
        }) 

      }
    }
    catch(err)
    {
        console.log(err);
            res.json({
            success:false,
            message:"Failed to fetch"
        })
    }

}

//update(put)
export const updateNote = async(req, res) => {
    try {
    const {id} = req.params;
    const {title, description} = req.body;
    const notes = await notesSchema.findById(id);
    if(notes) {
        notes.title = title;
        notes.description = description;
        await notes.save();
            res.status(200).json ({
            status : 200,
            success:true,
            message:"Note Updated Successfully",
            notes,
        }) 
      }
    }
    catch (err){
        console.log(err);
        res.json({
            success:false,
            message:"Failed to Update Note"
        })     
    }
}

//delete(delete)
export const deleteNote = async(req, res) => {
    try{
        const notes = await notesSchema.findByIdAndDelete(req.params.id);
        if(notes){
            res.status(200).json ({
                status : 200,
                success:true,
                message:"Note Deleted Successfully",
                notes,
            }) 
        }

    }

    catch(err){
        console.log(err);
        res.json({
            success:false,
            message:"Failed to update"
        })
    }
}

