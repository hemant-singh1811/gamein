var contest_btn=document.getElementById('contest_btn')
var prize_btn=document.getElementById("prize_btn")
var eligibilty_btn=document.getElementById("eligibilty_btn")
var schedule_btn=document.getElementById("schedule_btn")
var rules_btn=document.getElementById("rules_btn")
var content_box=document.getElementById("content_box")
var eligibility=document.getElementById("eligibility")
var prize=document.getElementById("prize")
var rules=document.getElementById("rules") 
var schedule=document.getElementById('schedule')


var current_open=content_box

contest_btn.onclick=function(){
    if(current_open!=content_box){
    console.log('you click the btn');
    content_box.style.display='flex' 
    current_open.style.display='none'
    current_open=content_box;
    }
}

eligibilty_btn.onclick=function(){
    if(current_open!=eligibility){
    console.log('you click the btn');
    eligibility.style.display='flex'
    current_open.style.display='none'
    current_open=eligibility;
    }
}

prize_btn.onclick=function(){
    if(current_open!=prize){
    console.log('you click the btn');
    prize.style.display='flex'
    current_open.style.display='none'
    current_open=prize;
    }
}

schedule_btn.onclick=function(){
    if(current_open!=schedule){
    console.log('you click the btn');
    schedule.style.display='flex' 
    current_open.style.display='none'
    current_open=schedule;
    }
}

rules_btn.onclick=function(){
    if(current_open!=rules){
    console.log('you click the btn');
    rules.style.display='flex'
    current_open.style.display='none'
    current_open=rules;
    }
}

prize_btn.onclick=function(){
    if(current_open!=prize){
    console.log('you click the btn');
    prize.style.display='flex'
    current_open.style.display='none'
    current_open=prize;
    }
}

