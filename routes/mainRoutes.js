const express = require('express')
const mainRoutes = express.Router()
const taskSchema = require('../model/taskManagement')
const isAuth = require('../isAuth')

mainRoutes.get('/',(req,res)=>{

    console.log(req.url, req.method)
    res.render("welcomePage", {
        pageTitle : "Home",
        isLoggedIn : req.session.isLoggedIn
    })
})

mainRoutes.get('/add-tasks',isAuth, (req,res)=>{

    console.log(req.url, req.method)
    res.render("addTask",{
        pageTitle : "Add Task"
    })
})

mainRoutes.post('/task-submitted',isAuth,  async (req,res) => {
  
    console.log(req.url, req.method)
    try{    
        const {taskname, description, date, priority, status, assigned, category} = req.body
        const data = taskSchema.create({
            taskname, description, date, priority, status, assigned, category
        })
        console.log(req.body)
        res.redirect('/view-tasks')
    }
    catch(e){
        console.log("Something went wrong ",e)
        res.render("errorPage", {
            pageTitle : "Internal Server Error"
        })
    }
})

mainRoutes.get('/view-tasks',isAuth,  async (req,res) => {
    
    console.log(req.url, req.method)
    try{
        const viewData = await taskSchema.find()

        if(!viewData || viewData.length === 0){
            return res.render("dataNotFound", {
                pageTitle : "Data not found"
            })
        }
        
        res.render("viewTask",{
            pageTitle : "View Tasks",
            viewData : viewData
        })
    }
    catch(e){
       console.log("Something went wrong ",e)
        res.render("errorPage", {
            pageTitle : "Internal Server Error"
        }) 
    }
})

mainRoutes.get('/view-tasks/details/:id',isAuth,  async (req,res) => {
    
    console.log(req.url, req.method)
    try{
        const detailData = await taskSchema.findById(req.params.id)

        if(!detailData){
            res.render("dataNotFound",{
                pageTitle : "Data not found"
            })
        }
        
        res.render("detailTask", {
            pageTitle : "Task detail",
            detailData : detailData
        })
    }
    catch(e){
        console.log("Something went wrong ",e)
        res.render("errorPage", {
            pageTitle : "Internal Server Error"
        }) 
    }
})

mainRoutes.get('/delete/:id',isAuth,  async (req,res) => {
    
    console.log(req.url, req.method)
    try{
        const deleteData = await taskSchema.findByIdAndDelete(req.params.id)
        
        res.redirect('/add-tasks')
    }
    catch(e){
       console.log("Something went wrong ",e)
        res.render("errorPage", {
            pageTitle : "Internal Server Error"
        }) 
    }
})

module.exports = mainRoutes