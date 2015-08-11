package tasks

import grails.converters.JSON

class TasksController {

    def index() {
        
    }
    def save () {
        println "Here is params: $params"
        def localStorage = JSON.parse(params.localStorage)
        println "Here is localStorage: ${localStorage}}" 
        localStorage.each{
                println(it.value.id)
                println(it.value.category)
                println(it.value.requiredBy)
                println(it.value.task)
                println(it.value.completed)
            }
        println("Save Executado!")
       redirect(controller:"CategoriaController", action: "save", params: [Nome: "Stephen King"])
        render localStorage as JSON
        
    }
        def delete () {
        println "Here is params: $params"
        def localStorage = JSON.parse(params.localStorage)
        println "Here is localStorage: ${localStorage}}" 
        localStorage.each{
                println(it.value.id)
                println(it.value.category)
                println(it.value.requiredBy)
                println(it.value.task)
                println(it.value.completed)
                
            }
        println("Delete Executado!")
        
        render localStorage as JSON
        
    }
    def findAll () {
        println "Here is params: $params"
        def localStorage = JSON.parse(params.localStorage)
        println "Here is localStorage: ${localStorage}}" 
        localStorage.each{
                println(it.value.id)
                println(it.value.category)
                println(it.value.requiredBy)
                println(it.value.task)
                println(it.value.completed)
                
            }
        println("Delete Executado!")
        
        render localStorage as JSON
        
    }    
    
}
