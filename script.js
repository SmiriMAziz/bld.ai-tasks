const courseTemplate = document.querySelector("[template-container]")
const courseTemplateone = document.querySelector("[template-containerone]")
const userCardContainer = document.querySelector("[all-courses]")
const userCardContainerone = document.querySelector("[courses-names]")
const searchInput = document.querySelector("[data-search]")
console.log(userCardContainer) ; 

const fields = ["python" , "excel" , "web" , "js" , "data" , "aws" , "draw"] ; 
let courses = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  
  courses.forEach(course => {
    const isVisible =
      course.header.toLowerCase().includes(value) ||
      course.description.toLowerCase().includes(value)
    course.element.classList.toggle("hide", !isVisible)
  })
})


function change_to(field){
  
  userCardContainer.innerHTML = "" ; 
  userCardContainerone.innerHTML = "" ; 
  let t = "active" ; 
  course = [] ; 
  fetch(`${field}.json`)
  .then(res => res.json())
  .then(data => {
    const templatecourseone = courseTemplateone.content.cloneNode(true).children[0]
    templatecourseone.querySelector("[header-text-container]").textContent = data.head.content ; 
    templatecourseone.querySelector("[par-text-container]").textContent = data.desc.content ; 
    templatecourseone.querySelector("[explore-python-container]").textContent = data.btn.content ; 
    userCardContainerone.appendChild(templatecourseone) ; 
      courses = data.coursees.map(course => {

        const templatecourse = courseTemplate.content.cloneNode(true).children[0]
        console.log(course) ; 
        console.log(templatecourse) ; 
        if(t!=""){
          templatecourse.querySelector("[course-title]").classList.add(t) ; 
           t = "" ; 
        }
        templatecourse.querySelector("[course-image]").src = course.img
        templatecourse.querySelector("[course-header]").textContent = course.header
        templatecourse.querySelector("[course-paragraph]").textContent = course.description
        templatecourse.querySelector("[course-note]").textContent = course.rating
        templatecourse.querySelector("[course-students]").textContent = course.students
        templatecourse.querySelector("[price-div]").textContent = course.price
        
        
        userCardContainer.append(templatecourse)
        
      
      
        return {header:course.header , description:course.description ,element:templatecourse}
      })
    
  })
}

change_to("python") ; 

fields.forEach(field =>{
  const clik = document.getElementById(field) ; 
  clik.addEventListener("click" , () => {
    

    change_to(field) ; 
  })
})
