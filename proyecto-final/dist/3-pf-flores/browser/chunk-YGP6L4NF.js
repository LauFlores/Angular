import{a as P}from"./chunk-ZKIY4GMV.js";import{a as Se,b as xe,c as Me,d as we,e as Ee,f as Ie,g as De,h as ye,i as Le,j as Fe,k as ke,m as Te,n as Oe,p as N,r as A,s as Ne,u as Pe}from"./chunk-6FPKCUIG.js";import{a as k,b as ue,f as T,h as O,l as Ae}from"./chunk-LEYBBSTR.js";import{a as F}from"./chunk-LZDUOOG4.js";import{Aa as r,Ba as o,Ca as v,Da as x,Ea as M,Eb as te,G as U,Ga as y,Hb as ie,Id as Ce,J as z,Ja as _,La as u,Lc as re,N as D,Pc as ne,Qc as se,Sa as V,Sc as le,T as h,Ta as $,Tc as ce,Td as fe,U as b,Ua as j,Uc as me,Ud as _e,Vd as ve,Wc as de,Wd as ge,Xa as G,Xd as he,Ya as n,Yd as be,Za as q,Zc as pe,_a as g,a as w,b as E,cb as Q,da as l,db as J,ea as d,eb as K,fb as W,l as C,ma as m,n as I,ra as p,rb as X,sb as Y,sc as ae,t as f,vb as Z,wa as S,yb as ee,yc as L,zc as oe}from"./chunk-RFUKYTJG.js";function Qe(i,t){i&1&&(r(0,"mat-error"),n(1,"Nombre es requerido"),o())}function Je(i,t){i&1&&(r(0,"mat-error"),n(1,"Descripcion es requerido"),o())}function Ke(i,t){if(i&1&&(r(0,"mat-option",10),n(1),o()),i&2){let e=t.$implicit;p("value",e.id),l(),g(" ",e.name," ")}}function We(i,t){i&1&&(r(0,"mat-error"),n(1,"Curso es requerido"),o())}var R=class i{constructor(t,e,a,s,c){this.fb=t;this.dialogRef=e;this.courseService=a;this.snackBar=s;this.data=c;this.classForm=this.fb.group({title:[c?.title,null],description:[c?.description,null],courseId:[c?.courseId,null]})}classForm;courses=[];save(){this.classForm.invalid?this.classForm.markAllAsTouched():this.dialogRef.close(this.classForm.value)}close(){this.dialogRef.close()}ngOnInit(){this.loadCourses()}loadCourses(){this.courseService.getActiveCourses().subscribe({next:t=>{this.courses=t.sort((e,a)=>e.name.localeCompare(a.name))},error:t=>{console.error(t)}})}static \u0275fac=function(e){return new(e||i)(d(de),d(fe),d(P),d(F),d(_e))};static \u0275cmp=D({type:i,selectors:[["app-class-form"]],decls:25,vars:7,consts:[["mat-dialog-title",""],["mat-dialog-content","",1,"main"],[3,"formGroup"],["matInput","","formControlName","title"],["rows","5","matInput","","formControlName","description"],["formControlName","courseId"],[3,"value",4,"ngFor","ngForOf"],["mat-dialog-actions","",1,"actions"],["mat-button","",1,"cancel",3,"click"],["mat-button","",1,"save",3,"click","disabled"],[3,"value"]],template:function(e,a){if(e&1&&(r(0,"h1",0),n(1),o(),r(2,"div",1)(3,"form",2)(4,"mat-form-field")(5,"mat-label"),n(6,"Nombre"),o(),v(7,"input",3),m(8,Qe,2,0,"mat-error"),o(),r(9,"mat-form-field")(10,"mat-label"),n(11,"Descripcion"),o(),v(12,"textarea",4),m(13,Je,2,0,"mat-error"),o(),r(14,"mat-form-field")(15,"mat-label"),n(16,"Curso"),o(),r(17,"mat-select",5),m(18,Ke,2,2,"mat-option",6),o(),m(19,We,2,0,"mat-error"),o()()(),r(20,"div",7)(21,"button",8),_("click",function(){return a.close()}),n(22,"Cancelar"),o(),r(23,"button",9),_("click",function(){return a.save()}),n(24,"Guardar"),o()()),e&2){let s,c,H;l(),q(a.data?a.data.title:"Nuevo Curso"),l(2),p("formGroup",a.classForm),l(5),S((s=a.classForm.get("title"))!=null&&s.invalid?8:-1),l(5),S((c=a.classForm.get("description"))!=null&&c.invalid?13:-1),l(5),p("ngForOf",a.courses),l(),S((H=a.classForm.get("courseId"))!=null&&H.invalid?19:-1),l(4),p("disabled",!a.classForm.valid)}},dependencies:[X,L,T,k,ue,ge,be,he,O,le,re,ne,se,ce,me,Oe,ae],styles:["form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1rem}input[_ngcontent-%COMP%]{display:block}.actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:2rem}.cancel[_ngcontent-%COMP%]{color:#c91212;background-color:#c9121220}.save[_ngcontent-%COMP%]{color:#007a5a;background-color:#007a5a20}div[_ngcontent-%COMP%]{background-color:#181e1e}h1[_ngcontent-%COMP%]{background-color:#004f4e;color:#00bcd4}"]})};var B=class i{constructor(t){this.httpClient=t}apiUrl=pe.API_URL;getActiveClasses(t){return this.httpClient.get(`${this.apiUrl}/classes`).pipe(I(e=>e.filter(a=>a.isActive)),f(e=>(console.error("Error al obtener las clases activas:",e),C(()=>new Error("No se pudieron obtener las clases activas")))))}getInactiveClasses(t){return this.httpClient.get(`${this.apiUrl}/classes`).pipe(I(e=>e.filter(a=>!a.isActive)),f(e=>(console.error("Error al obtener las clases inactivas:",e),C(()=>new Error("No se pudieron obtener las clases inactivas")))))}getClassById(t){return this.httpClient.get(`${this.apiUrl}/classes/${t}`).pipe(f(e=>(console.error("Error al obtener la clase:",e),C(()=>new Error("Clase no encontrada")))))}createClass(t){let e=E(w({},t),{isActive:!0,id:Math.random().toString(36).slice(2),createdAt:new Date,updatedAt:new Date});return this.httpClient.post(`${this.apiUrl}/classes`,e).pipe(f(a=>(console.error("Error al crear la clase:",a),C(()=>new Error("No se pudo crear la clase")))))}deleteClass(t){return this.httpClient.patch(`${this.apiUrl}/classes/${t}`,{isActive:!1}).pipe(f(e=>(console.error("Error al eliminar la clase:",e),C(()=>new Error("No se pudo eliminar la clase")))))}updateClass(t,e){return this.httpClient.patch(`${this.apiUrl}/classes/${t}`,e).pipe(f(a=>(console.error("Error al actualizar la clase:",a),C(()=>new Error("No se pudo actualizar la clase")))))}activateClass(t){return this.httpClient.patch(`${this.apiUrl}/classes/${t}`,{isActive:!0}).pipe(f(e=>(console.error("Error al activar la clase:",e),C(()=>new Error("No se pudo activar la clase")))))}getClassesByCourseId(t){return this.httpClient.get(`${this.apiUrl}/classes`).pipe(I(e=>e.filter(a=>a.courseId===t)),f(e=>(console.error("Error al obtener las clases del curso:",e),C(()=>new Error("No se pudieron obtener las clases del curso")))))}static \u0275fac=function(e){return new(e||i)(z(ee))};static \u0275prov=U({token:i,factory:i.\u0275fac,providedIn:"root"})};var Ye=()=>[10,25,100],Ze=i=>[i];function et(i,t){i&1&&v(0,"mat-spinner",1)}function tt(i,t){i&1&&(r(0,"th",20),n(1," T\xEDtulo "),o())}function it(i,t){if(i&1&&(r(0,"td",21),n(1),o()),i&2){let e=t.$implicit;l(),g(" ",e.title," ")}}function at(i,t){i&1&&(r(0,"th",20),n(1," Descripci\xF3n "),o())}function ot(i,t){if(i&1&&(r(0,"td",21),n(1),o()),i&2){let e=t.$implicit;l(),g(" ",e.description," ")}}function rt(i,t){i&1&&(r(0,"th",20),n(1," Curso "),o())}function nt(i,t){if(i&1&&(r(0,"td",21),n(1),o()),i&2){let e=t.$implicit;l(),g(" ",e.courseName," ")}}function st(i,t){i&1&&(r(0,"th",22),n(1," Actualizado "),o())}function lt(i,t){if(i&1&&(r(0,"td",21),n(1),K(2,"date"),o()),i&2){let e=t.$implicit;l(),g(" ",W(2,1,e.updatedAt)," ")}}function ct(i,t){i&1&&(r(0,"th",22),n(1," Acciones "),o())}function mt(i,t){if(i&1){let e=y();r(0,"button",27),_("click",function(){h(e);let s=u().$implicit,c=u(2);return b(c.deleteClass(s))}),r(1,"mat-icon"),n(2,"delete"),o()()}}function dt(i,t){if(i&1){let e=y();r(0,"td",21)(1,"div",23)(2,"button",24)(3,"mat-icon"),n(4,"visibility"),o()(),r(5,"button",25),_("click",function(){let s=h(e).$implicit,c=u(2);return b(c.openDialog(s))}),r(6,"mat-icon"),n(7,"edit"),o()(),m(8,mt,3,0,"button",26),o()()}if(i&2){let e=t.$implicit,a=u(2);l(2),p("routerLink",J(2,Ze,e.id)),l(6),p("ngIf",!a.showInactive)}}function pt(i,t){i&1&&v(0,"tr",28)}function ut(i,t){i&1&&v(0,"tr",29)}function Ct(i,t){if(i&1&&(r(0,"tr",30)(1,"td",31),n(2),o()()),i&2){u();let e=G(10);l(2),g(' No hay datos que coincidan con el filtro "',e.value,'" ')}}function ft(i,t){if(i&1){let e=y();r(0,"div",2)(1,"button",3),_("click",function(){h(e);let s=u();return b(s.openDialog(null))}),n(2," Agregar Clase "),o(),r(3,"mat-slide-toggle",4),_("change",function(s){h(e);let c=u();return b(c.toggleInactive(s))}),r(4,"span"),n(5,"Ver clases inactivas"),o()()(),r(6,"mat-form-field")(7,"mat-label"),n(8,"Buscar"),o(),r(9,"input",5,0),_("keyup",function(s){h(e);let c=u();return b(c.applyFilter(s))}),o()(),r(11,"div",6)(12,"table",7),x(13,8),m(14,tt,2,0,"th",9)(15,it,2,1,"td",10),M(),x(16,11),m(17,at,2,0,"th",9)(18,ot,2,1,"td",10),M(),x(19,12),m(20,rt,2,0,"th",9)(21,nt,2,1,"td",10),M(),x(22,13),m(23,st,2,0,"th",14)(24,lt,3,3,"td",10),M(),x(25,15),m(26,ct,2,0,"th",14)(27,dt,9,4,"td",10),M(),m(28,pt,1,0,"tr",16)(29,ut,1,0,"tr",17)(30,Ct,3,1,"tr",18),o(),v(31,"mat-paginator",19),o()}if(i&2){let e=u();l(12),p("dataSource",e.dataSource),l(16),p("matHeaderRowDef",e.displayedColumns),l(),p("matRowDefColumns",e.displayedColumns),l(2),p("pageSizeOptions",Q(4,Ye))}}var Be=class i{constructor(t,e,a,s,c){this.route=t;this.classesService=e;this.courseService=a;this.dialog=s;this.snackBar=c}displayedColumns=["title","description","courseName","updatedAt","actions"];dataSource=new Te;isLoading=!1;showInactive=!1;courses=[];paginator;sort;courseID;ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}ngOnInit(){this.route.params.subscribe(t=>{this.courseID=t.id,this.loadCourses(this.courseID)})}loadCourses(t){this.courseService.getActiveCourses().subscribe({next:e=>{this.courses=e,this.loadClasses()},error:e=>{console.error(e)}})}loadClasses(){this.isLoading=!0,this.showInactive?this.classesService.getInactiveClasses(this.courseID).subscribe({next:t=>{this.mapCoursesNames(t),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort,this.isLoading=!1},error:t=>{this.snackBar.open("Error al cargar las clases","Cerrar",{duration:3e3}),console.error("Error al cargar las clases inactivas:",t),this.isLoading=!1}}):this.classesService.getActiveClasses(this.courseID).subscribe({next:t=>{this.mapCoursesNames(t),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort,this.isLoading=!1},error:t=>{this.snackBar.open("Error al cargar las clases","Cerrar",{duration:3e3}),console.error("Error al cargar las clases activas:",t),this.isLoading=!1}})}applyFilter(t){let e=t.target.value;this.dataSource.filter=e.trim().toLowerCase(),this.dataSource.paginator&&this.dataSource.paginator.firstPage()}openDialog(t){this.dialog.open(R,{data:t||null,width:"500px",disableClose:!1}).afterClosed().subscribe({next:a=>{a&&(t?(this.updateClass(t.id,a),this.snackBar.open("Clase actualizada","Cerrar",{duration:3e3})):(this.createClass(a),this.snackBar.open("Clase creada","Cerrar",{duration:3e3})))}})}updateClass(t,e){this.isLoading=!0,this.classesService.updateClass(t,e).subscribe({next:a=>{this.mapCoursesNames(a),this.loadCourses()},complete:()=>{this.isLoading=!1}})}createClass(t){this.isLoading=!0,this.classesService.createClass(t).subscribe({next:e=>{this.mapCoursesNames(e),this.loadCourses()},complete:()=>{this.isLoading=!1}})}deleteClass(t){this.isLoading=!0,this.classesService.deleteClass(t.id).subscribe({next:e=>{this.mapCoursesNames(e),this.loadCourses(),this.snackBar.open("Clase eliminada","Cerrar",{duration:3e3})},complete:()=>{this.isLoading=!1}})}toggleInactive(t){this.showInactive=t.checked,this.loadCourses()}mapCoursesNames(t){let e=new Map;this.courses.forEach(a=>{e.set(a.id,a.name)}),this.dataSource.data=t.map(a=>{let s=a.courseId,c=e.get(s)||"Sin Curso";return E(w({},a),{courseName:c})})}static \u0275fac=function(e){return new(e||i)(d(te),d(B),d(P),d(ve),d(F))};static \u0275cmp=D({type:i,selectors:[["app-class-list"]],viewQuery:function(e,a){if(e&1&&(V(N,5),V(A,5)),e&2){let s;$(s=j())&&(a.paginator=s.first),$(s=j())&&(a.sort=s.first)}},decls:5,vars:1,consts:[["input",""],[1,"spinner"],[1,"controls"],["mat-raised-button","",1,"demo-button",3,"click"],["disabled","true","labelPosition","before",3,"change"],["matInput","","placeholder","",3,"keyup"],[1,"mat-elevation-z8"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","title"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","description"],["matColumnDef","courseName"],["matColumnDef","updatedAt"],["mat-header-cell","",4,"matHeaderCellDef"],["matColumnDef","actions"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["class","mat-row",4,"matNoDataRow"],["showFirstLastButtons","","aria-label","Select page of classes",3,"pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],[1,"actions"],["mat-icon-button","","aria-label","View button",1,"view-icon",3,"routerLink"],["mat-icon-button","","aria-label","Edit button",1,"edit-icon",3,"click"],["mat-icon-button","","class","delete-icon","aria-label","Delete button",3,"click",4,"ngIf"],["mat-icon-button","","aria-label","Delete button",1,"delete-icon",3,"click"],["mat-header-row",""],["mat-row",""],[1,"mat-row"],["colspan","3",1,"mat-cell"]],template:function(e,a){e&1&&(r(0,"section")(1,"h1"),n(2,"Lista de Clases"),o(),m(3,et,1,0,"mat-spinner",1)(4,ft,32,5),o()),e&2&&(l(3),S(a.isLoading?3:4))},dependencies:[Y,ie,Ae,L,oe,Pe,T,k,Se,Me,De,we,xe,ye,Ee,Ie,Le,Fe,ke,Ce,N,A,Ne,O,Z],styles:[".mat-mdc-form-field[_ngcontent-%COMP%]{font-size:14px;width:100%}.delete-icon[_ngcontent-%COMP%]{color:#c12}.edit-icon[_ngcontent-%COMP%]{color:#fc0}.view-icon[_ngcontent-%COMP%]{color:#09f}.restore-icon[_ngcontent-%COMP%]{color:#25c717}.spinner[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh}.controls[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}@media screen and (max-width: 500px){.controls[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:none}}section[_ngcontent-%COMP%]{margin:1rem;padding:1rem}.mat-mdc-form-field[_ngcontent-%COMP%]{overflow:hidden}"]})};export{B as a,Be as b};
