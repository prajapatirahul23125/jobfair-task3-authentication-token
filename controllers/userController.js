
const postModel=require('../models/postModel')

const getpost=async(req,res)=>{
    try{
        var search='';
        if(req.query.search){
            search=req.query.search;
        }
        var page='';
        if(req.query.page){
            page=req.query.page;
        }
        const limit=5;  
        const user=await postModel.find({
            $or:[
                {name:{$regex:'-*'+search+'-*',$options:'i'}},
                {email:{$regex:'-*'+search+'-*',$options:'i'}},
            ]
        })
        .limit(limit*1)
        .skip( page > 0 ? (page - 1) * limit : 0)
        .exec();
        const pagination=await postModel.find({
            $or:[
                {name:{$regex:'-*'+search+'-*',$options:'i'}},
                {email:{$regex:'-*'+search+'-*',$options:'i'}},
            ]
        }).countDocuments();
        res.status(200).send({
            success:true,
            message:"UserPost Get Succesfuly",
            user:user,
            totalpage:Math.ceil(pagination/limit),
            currentpage:page,
            previous:page-1,
            next:page+1,
        });
    }
    catch(err){
        res.status(500).send({
            success:false,
            message:"Get UserPost Error"
        })
    }
}

const addPost=async(req,res)=>{
    try{
        const {name,email,salary,designation,status}=req.body;
        //validation
        if(!name || !email || !salary || !designation) {
            return res.status(500).send({
              success: false,
              message: "Please Provide All Fields",
            });
          }
          //create new Post
            const postuser =new postModel({
                name,email,salary,designation,status
            });
            postuser.save();
            res.status(201).send({
                success: true,
                message: "Successfully Post",
                postuser,
            });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error In PostUser API",
          error,
        });
    }
}
const updatepost=async(req,res)=>{
    try{
        const id=req.params.id;
        const {name,email,salary,designation}=req.body;
        
        const update=await postModel.findByIdAndUpdate(id,{name:name,email:email,salary:salary,designation:designation},{new: true}
        );
        res.status(200).send({
            success:true,
            message:"Post Update SuccesFully",
            update
        })
    }
    catch(err){
        res.status(500).send({
            success:false,
            message:"Update Post Error"
        })
    }
    
}

const deletepost=async(req,res)=>{
    try{
        const id=req.params.id;
        
        const deletepost=await postModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Post Deleted SuccesFully",
            
        })
    }
    catch(err){
        res.status(500).send({
            success:false,
            message:"Delete Post Error"
        })
    }
    
}

const deleteMultiuser=async(req,res)=>{
    try{
        const user=await postModel.deleteMany(req.body)
        res.status(200).send({
            success:true,
            message:"Multiple UserPost Delete Succesfuly",
            user:user,
        });
    }catch(err){
        res.status(500).send({
            success:false,
            message:"Delete Multi User Error",
            err
        })
    }
    
}

module.exports={addPost,getpost,updatepost,deletepost,deleteMultiuser}