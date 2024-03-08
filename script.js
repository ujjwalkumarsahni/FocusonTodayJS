const checkboxList = document.querySelectorAll('.custome-checkbox');
const inputfiald = document.querySelectorAll('.goal-input');
const progressbar = document.querySelector('.progress-bar');
const progresslable = document.querySelector('.porgrass-lable')
const progressvalue = document.querySelector('.progress-value');

const allquats = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going',
    'Whoa! You just completed all the goals, time for chill :D'
]

const allgoals = JSON.parse(localStorage.getItem('allgoals')) || {
    first:{
        name: '',
        completed: false
    },
    second:{
        name: '',
        completed: false
    },
    third:{
        name: '',
        completed: false
    },
};
let completedgoalcount = Object.values(allgoals).filter((goal) => goal.completed).length
progressvalue.style.width = `${completedgoalcount / 3 * 100}%`
progressvalue.firstElementChild.innerText = `${completedgoalcount}/3 Completed`

progresslable.innerText = allquats[completedgoalcount]

checkboxList.forEach((ckeckbox) => {
    ckeckbox.addEventListener('click', (e) => {
        const allinputfilled = [...inputfiald].every( (i) =>{
            return i.value
        })
        if(allinputfilled){
            ckeckbox.parentElement.classList.toggle('completed')
            const inputid = ckeckbox.nextElementSibling.id 
            allgoals[inputid].completed = !allgoals[inputid].completed
            completedgoalcount = Object.values(allgoals).filter((goal) => goal.completed).length
            progressvalue.style.width = `${completedgoalcount / 3 * 100}%`
            progressvalue.firstElementChild.innerText = `${completedgoalcount}/3 Completed`
            progresslable.innerText = allquats[completedgoalcount]
            localStorage.setItem('allgoals', JSON.stringify(allgoals))
        }
        else{
            progressbar.classList.add('show-error')
        }
    })
})


inputfiald.forEach((input) =>{
    console.log(allgoals[input.id])
    input.value = allgoals[input.id].name

    if(allgoals[input.id].completed){
        input.parentElement.classList.add('completed')
    }

    input.addEventListener('focus', () =>{
        progressbar.classList.remove('show-error')

    })
    
    input.addEventListener('input',(e)=>{
        if(allgoals[input.id].completed){
           e.target.value  = allgoals[input.id].name
           return
        }
        allgoals[input.id].name = input.value
        localStorage.setItem('allgoals', JSON.stringify(allgoals))
    } )
})