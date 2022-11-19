const temp=()=>{
    let element=document.getElementById('content')
    let content="";
    var fr=new FileReader();
    fr.onload=function(){
        element.innerHTML=`<div id='element'><b>Message</b><br></br><div>${fr.result[i].message}</div></div>`
        let json=JSON.parse(fr.result);
        for(let i=0;i<json.length;i++){
            content+=`<div id='element'><b>Message</b><br></br><div>${json[i].message}</div></div>`
        }
    }
        
    fr.readAsText(this.files[0]);
    
    element.innerHTML=content;
}
temp();