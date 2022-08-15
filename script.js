const courseTemplate = document.querySelector("[template-container]")
const userCardContainer = document.querySelector("[courses-names]")
const searchInput = document.querySelector("[data-search]")

let courses = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  console.log(value)
  courses.forEach(course => {
    const isVisible =
      course.header.toLowerCase().includes(value) ||
      course.description.toLowerCase().includes(value)
    course.element.classList.toggle("hide", !isVisible)
  })
})

fetch("db.json")
  .then(res => res.json())
  .then(data => {
    courses = data.coursees.map(course => {
      const templatecourse = courseTemplate.content.cloneNode(true).children[0]
      templatecourse.querySelector("[course-image]").src = course.img
      templatecourse.querySelector("[course-header]").textContent = course.header
      templatecourse.querySelector("[course-paragraph]").textContent = course.description
      templatecourse.querySelector("[course-note]").textContent = course.rating
      templatecourse.querySelector("[course-students]").textContent = course.students
      templatecourse.querySelector("[price-div]").textContent = course.price
      userCardContainer.append(templatecourse)
      return {header:course.header , description:course.description ,element:templatecourse}
    })
    console.log(courses)
  })