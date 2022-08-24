const courseTemplate = document.querySelector("[template-container]")
const courseTemplateone = document.querySelector("[template-containerone]")
const userCardContainer = document.querySelector("[all-courses]")
const userCardContainerone = document.querySelector("[courses-names]")
const searchInput = document.querySelector("[data-search]")


const fields = ["python" , "excel" , "web" , "js" , "data" , "aws" , "draw"] ; 
let courses = []
let currcourse = "python" ; 
let filter = "" ; 

function setFocusToTextBox(goto){
  var textbox = document.getElementById(goto);
  textbox.focus();
  textbox.scrollIntoView();
}



let searchbtn = document.getElementById("search-button") ; 
  searchbtn.addEventListener("click" , (e) => {
    let value = searchInput.value.toLowerCase() ; 
    filter = value ; 
    work(currcourse ,filter) ; 
    setFocusToTextBox("headline") ; 
    
  })
  


function partitioninto(currcourses , filter = ""){

  
  let howmany = 4 ; 
  let width = screen.width; 
  if(width<=1300) howmany = 3 ; 
  if(width<768) howmany = 2 ;
  if(width<600) howmany = 1 ; 

  let partition = document.createElement("div");
  partition.classList.add("carousel-item");
  partition.classList.add("active");
  
  let nb = 0 ; 
    currcourses.forEach(course => {
      if(filter==="" || course.header.toLowerCase().includes(filter)===true){
        if(nb<howmany){
          partition.append(course.element) ; 
        }
        else{
            nb = 0 ; 
            userCardContainer.append(partition) ; 

            partition = document.createElement("div");
            partition.classList.add("carousel-item");
            partition.append(course.element) ; 
            
        }
        nb++ ; 
      }
      
    })    
    if(nb>0) userCardContainer.append(partition) ; 
    
  

}

async function change_to(field){


  
  
  courses = [] ; 
  const res = await fetch(`${field}.json`) ; 
  const data = await res.json() ; 
  userCardContainer.innerHTML = "" ; 
  userCardContainerone.innerHTML = "" ; 
    
    const templatecourseone = courseTemplateone.content.cloneNode(true).children[0]
    templatecourseone.querySelector("[header-text-container]").textContent = data.head.content ; 
    templatecourseone.querySelector("[par-text-container]").textContent = data.desc.content ; 
    templatecourseone.querySelector("[explore-python-container]").textContent = data.btn.content ; 
    userCardContainerone.append(templatecourseone) ; 


      courses = data.coursees.map(course => {
      
          const templatecourse = courseTemplate.content.cloneNode(true).children[0]
          
          templatecourse.querySelector("[course-image]").src = course.img
          templatecourse.querySelector("[course-header]").textContent = course.header
          templatecourse.querySelector("[course-paragraph]").textContent = course.description
          templatecourse.querySelector("[course-note]").textContent = course.rating
          templatecourse.querySelector("[course-students]").textContent = course.students
          templatecourse.querySelector("[price-div]").textContent = course.price
          
          return {header:course.header , description:course.description ,element:templatecourse}
  
      })

  
}



async function work(field , filter = "") {
  
  await change_to(field) ;
  partitioninto(courses , filter) ; 

}



fields.forEach(field =>{
  const clik = document.getElementById(field) ; 
  clik.addEventListener("click" , () => {
    
    currcourse = field ; 
    work(currcourse) ; 
    
  })
})

window.addEventListener("resize", function(){
  
 work(currcourse , filter) ; 

});

work(currcourse , filter) ; 