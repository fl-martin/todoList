(()=>{"use strict";const e=[],t=[];let n=0;const d=d=>{t.push((t=>{const d=n;return n++,{getIndex:()=>d,getName:()=>t,changeName:e=>t=e,projectToDos:()=>e.filter((e=>e.getProject()==d))}})(d))},o=e=>{document.getElementById(e).style.display="flex"},c=e=>{document.getElementById(e).style.display="none"},l=()=>{document.getElementById("name").value="",document.getElementById("date").value="",document.getElementById("description").value="",document.getElementById("priority").value="",document.getElementById("projectID").value=""},m=t=>{const n=document.createElement("div"),d=document.createElement("div"),o=document.createElement("div"),c=document.createElement("div"),l=document.createElement("div"),m=document.createElement("div"),r=document.createElement("div"),u=document.createElement("button"),p=document.createElement("button"),s=document.createElement("button");return d.textContent=t.getName(),o.textContent=t.getDate(),c.textContent=t.getDescription(),l.textContent=t.getPriority(),m.textContent=t.getProjectID(),r.textContent=t.getCheckState(),c.style.display="none",s.style.display="none",n.append(d,o,c,l,m,r,u,p,s),n.classList.add("defaultDisplay"),u.addEventListener("click",(e=>{a(e.target.parentNode),i(e.target.parentNode)})),p.addEventListener("click",(()=>{var d;d=t.getIndex(),e[d]="",n.parentNode.removeChild(n)})),n},a=e=>{e.classList.toggle("defaultDisplay"),e.classList.toggle("detailDisplay")},i=e=>{e.classList.contains("defaultDisplay")?(e.childNodes[2].style.display="none",e.childNodes[8].style.display="none"):(e.childNodes[2].style.display="block",e.childNodes[8].style.display="block")};(()=>{const n=document.createElement("header"),a=document.createElement("main"),i=document.createElement("nav"),r=document.createElement("h1"),u=document.createElement("button"),p=document.createElement("div"),s=document.createElement("button"),E=document.createElement("footer");u.id="newProject",s.id="addNew",i.append(r,u),p.appendChild(s),a.append(i,p),document.getElementById("content").append(n,a,E,(()=>{const t=document.createElement("form"),n=document.createElement("input"),d=document.createElement("input"),o=document.createElement("input"),a=document.createElement("div"),i=document.createElement("input"),r=document.createElement("label"),u=document.createElement("input"),p=document.createElement("label"),s=document.createElement("input"),E=document.createElement("label"),g=document.createElement("select"),y=document.createElement("button"),v=document.createElement("button");return i.type="radio",u.type="radio",s.type="radio",i.name="priority",u.name="priority",s.name="priority",i.value="low",u.value="low",s.value="high",r.htmlFor="low",r.textContent="Low",p.htmlFor="mid",p.textContent="Mid",E.htmlFor="high",E.textContent="High",a.append(i,r,u,p,s,E),t.append(n,d,o,a,g,y,v),t.id="form",n.id="name",d.id="date",o.id="description",a.id="priority",i.id="lowPriority",u.id="midPriority",s.id="highPriority",g.id="projectID",y.id="addToDo",v.id="closeForm",y.type="button",v.type="button",y.addEventListener("click",(()=>{(()=>{const t=document.getElementById("name").value,n=document.getElementById("date").value,d=document.getElementById("description").value,o=document.getElementById("form").elements.priority.value,c=document.getElementById("projectID").value,l=e.length;e.push(((e,t,n,d,o,c)=>{let l=!1;return{getName:()=>e,changeName:t=>e=t,getDate:()=>t,changeDate:e=>t=e,getDescription:()=>n,changeDescription:t=>e=t,getPriority:()=>d,getProjectID:()=>o,changeProjectID:e=>o=e,changePriority:e=>d=e,getCheckState:()=>l,check:()=>l=!l,getIndex:()=>c}})(t,n,d,o,c,l)),document.getElementById("content").appendChild(m(e[e.length-1]))})(),c("form"),l()})),v.addEventListener("click",(()=>{c("form"),l()})),t})(),(()=>{const e=document.createElement("div"),t=document.createElement("div"),n=document.createElement("input"),o=document.createElement("button"),l=document.createElement("button");return e.append(t,n,o,l),e.id="projectForm",o.addEventListener("click",(()=>{d(n.value),c("projectForm"),n.value=""})),l.addEventListener("click",c.bind(void 0,"projectForm")),e})()),u.addEventListener("click",o.bind(void 0,"projectForm")),s.addEventListener("click",(()=>{(()=>{document.getElementById("projectID").options.length=t.length;for(let e=0;e<t.length;e++)document.getElementById("projectID").options[e].textContent=t[e].getName()})(),o("form")}))})(),d("myList")})();