var tournament = document.getElementById('tournament')
var search_inpt=document.getElementById('search_inpt')
var search_ul=document.getElementById('ul')


search_inpt.addEventListener('input',(e)=>{
    // book_results.innerHTML="";
    var search_tour=search_inpt.value;
    console.log(search_tour); 
    if(search_tour!="" && search_tour!=""){
    $.ajax('/search_tour', { 
      type: "get",
      data: {
        search_tour:search_tour
      }
    }).done(async function (res) {
       console.log(res);
        search_ul.innerHTML="";
        res.forEach(el => {
            let li=document.createElement('li');
            let a=document.createElement('a')
            a.className='search-tour'
            a.innerText = el.Event_Name;
            a.classList = "search-tour"
            // Set the href property. 
            a.target = "_blank";
            a.href = '/tournament/' + el.Event_Id;
            
            li.className="selected"
            li.appendChild(a);
            search_ul.appendChild(li);
        });

    })
     }
     else
     { 
        search_ul.innerHTML="";
     }
    })

var counter = 1;

setInterval(function () {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    //   console.log('this is running');
    if (counter > 4) {
        counter = 1;
    }
}, 4000);

window.addEventListener("load", gettournament);

function gettournament() {
    console.log('get tournament is fired');
    $.ajax('/tournament', {
        type: "get",
        data:{
            tourname:true
        }
    })
        .done(function (res) {
            console.log('/gettournament response is came');
            console.log(res); 
            res.forEach(el => {
                var Event_date_time=el.Event_L_Reg_Date; 
                if(Event_date_time==undefined || Event_date_time==null)  return;
             
              var current_date_time = new Date(); 
              var event_time=new Date(Event_date_time);
            //  event_time=event_time.toDateString();
                if(current_date_time>event_time){ 
                return;
              } 
                let div = document.createElement('div')
                div.className = "tournament_div"
                let a = document.createElement('a')
                // Set the title.
                a.innerText = el.Event_Name;
                a.classList = "tournament_link"
                // Set the href property. 
                a.target = "_blank";
                a.href = '/tournament/' + el.Event_Id;
                div.appendChild(a)
                // Append the anchor element to the body.
                tournament.append(div)
            });
        })


}