import{$ as k,$b as ke,A as R,Aa as x,Ad as Fe,Ba as M,Bd as Y,C as d,F as ne,Ga as ue,H as g,I as A,Ia as fe,Ja as _e,K as v,Ka as ge,Kb as be,La as N,Ma as S,N as w,Na as h,O as b,Ob as Ce,Pb as p,Ra as Q,Sa as W,T as ae,Ta as u,U as oe,Ua as f,Z as O,_ as C,aa as y,ab as H,ac as ye,ad as Me,ba as se,bb as F,bd as Z,ca as de,da as ce,ea as a,ec as De,ed as L,f as c,fd as U,gc as xe,hd as q,jb as _,jc as G,ka as le,ma as P,n as j,na as he,pa as V,pb as ve,q as X,qa as pe,r as ee,s as l,sa as me,ta as D,u as te,v as re,w as T,wa as z,wb as we,y as ie,yd as Se,zd as E}from"./chunk-RFUKYTJG.js";var Ee=["*"],Oe=["content"],Pe=[[["mat-drawer"]],[["mat-drawer-content"]],"*"],Ve=["mat-drawer","mat-drawer-content","*"];function ze(i,$){if(i&1){let e=ue();x(0,"div",1),_e("click",function(){ae(e);let r=N();return oe(r._onBackdropClicked())}),M()}if(i&2){let e=N();D("mat-drawer-shown",e._isShowingBackdrop())}}function Ne(i,$){i&1&&(x(0,"mat-drawer-content"),h(1,2),M())}var Qe={transformDrawer:Me("transform",[U("open, open-instant",L({transform:"none",visibility:"visible"})),U("void",L({"box-shadow":"none",visibility:"hidden"})),q("void => open-instant",Z("0ms")),q("void <=> open, open-instant => void",Z("400ms cubic-bezier(0.25, 0.8, 0.25, 1)"))])};var We=new A("MAT_DRAWER_DEFAULT_AUTOSIZE",{providedIn:"root",factory:He}),Ie=new A("MAT_DRAWER_CONTAINER");function He(){return!1}var K=(()=>{class i extends E{constructor(e,t,r,o,s){super(r,o,s),this._changeDetectorRef=e,this._container=t}ngAfterContentInit(){this._container._contentMarginChanges.subscribe(()=>{this._changeDetectorRef.markForCheck()})}static{this.\u0275fac=function(t){return new(t||i)(a(_),a(ne(()=>Ze)),a(y),a(Se),a(k))}}static{this.\u0275cmp=w({type:i,selectors:[["mat-drawer-content"]],hostAttrs:[1,"mat-drawer-content"],hostVars:4,hostBindings:function(t,r){t&2&&me("margin-left",r._container._contentMargins.left,"px")("margin-right",r._container._contentMargins.right,"px")},standalone:!0,features:[H([{provide:E,useExisting:i}]),le,F],ngContentSelectors:Ee,decls:1,vars:0,template:function(t,r){t&1&&(S(),h(0))},encapsulation:2,changeDetection:0})}}return i})(),Ge=(()=>{class i{get position(){return this._position}set position(e){e=e==="end"?"end":"start",e!==this._position&&(this._isAttached&&this._updatePositionInParent(e),this._position=e,this.onPositionChanged.emit())}get mode(){return this._mode}set mode(e){this._mode=e,this._updateFocusTrapState(),this._modeChanged.next()}get disableClose(){return this._disableClose}set disableClose(e){this._disableClose=p(e)}get autoFocus(){let e=this._autoFocus;return e??(this.mode==="side"?"dialog":"first-tabbable")}set autoFocus(e){(e==="true"||e==="false"||e==null)&&(e=p(e)),this._autoFocus=e}get opened(){return this._opened}set opened(e){this.toggle(p(e))}constructor(e,t,r,o,s,I,B,Te){this._elementRef=e,this._focusTrapFactory=t,this._focusMonitor=r,this._platform=o,this._ngZone=s,this._interactivityChecker=I,this._doc=B,this._container=Te,this._focusTrap=null,this._elementFocusedBeforeDrawerWasOpened=null,this._enableAnimations=!1,this._position="start",this._mode="over",this._disableClose=!1,this._opened=!1,this._animationStarted=new c,this._animationEnd=new c,this._animationState="void",this.openedChange=new C(!0),this._openedStream=this.openedChange.pipe(l(n=>n),j(()=>{})),this.openedStart=this._animationStarted.pipe(l(n=>n.fromState!==n.toState&&n.toState.indexOf("open")===0),T(void 0)),this._closedStream=this.openedChange.pipe(l(n=>!n),j(()=>{})),this.closedStart=this._animationStarted.pipe(l(n=>n.fromState!==n.toState&&n.toState==="void"),T(void 0)),this._destroyed=new c,this.onPositionChanged=new C,this._modeChanged=new c,this._injector=v(O),this._changeDetectorRef=v(_),this.openedChange.pipe(d(this._destroyed)).subscribe(n=>{n?(this._doc&&(this._elementFocusedBeforeDrawerWasOpened=this._doc.activeElement),this._takeFocus()):this._isFocusWithinDrawer()&&this._restoreFocus(this._openedVia||"program")}),this._ngZone.runOutsideAngular(()=>{X(this._elementRef.nativeElement,"keydown").pipe(l(n=>n.keyCode===27&&!this.disableClose&&!Ce(n)),d(this._destroyed)).subscribe(n=>this._ngZone.run(()=>{this.close(),n.stopPropagation(),n.preventDefault()}))}),this._animationEnd.pipe(ie((n,m)=>n.fromState===m.fromState&&n.toState===m.toState)).subscribe(n=>{let{fromState:m,toState:J}=n;(J.indexOf("open")===0&&m==="void"||J==="void"&&m.indexOf("open")===0)&&this.openedChange.emit(this._opened)})}_forceFocus(e,t){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let r=()=>{e.removeEventListener("blur",r),e.removeEventListener("mousedown",r),e.removeAttribute("tabindex")};e.addEventListener("blur",r),e.addEventListener("mousedown",r)})),e.focus(t)}_focusByCssSelector(e,t){let r=this._elementRef.nativeElement.querySelector(e);r&&this._forceFocus(r,t)}_takeFocus(){if(!this._focusTrap)return;let e=this._elementRef.nativeElement;switch(this.autoFocus){case!1:case"dialog":return;case!0:case"first-tabbable":V(()=>{!this._focusTrap.focusInitialElement()&&typeof e.focus=="function"&&e.focus()},{injector:this._injector});break;case"first-heading":this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');break;default:this._focusByCssSelector(this.autoFocus);break}}_restoreFocus(e){this.autoFocus!=="dialog"&&(this._elementFocusedBeforeDrawerWasOpened?this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened,e):this._elementRef.nativeElement.blur(),this._elementFocusedBeforeDrawerWasOpened=null)}_isFocusWithinDrawer(){let e=this._doc.activeElement;return!!e&&this._elementRef.nativeElement.contains(e)}ngAfterViewInit(){this._isAttached=!0,this._position==="end"&&this._updatePositionInParent("end"),this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._updateFocusTrapState())}ngAfterContentChecked(){this._platform.isBrowser&&(this._enableAnimations=!0)}ngOnDestroy(){this._focusTrap?.destroy(),this._anchor?.remove(),this._anchor=null,this._animationStarted.complete(),this._animationEnd.complete(),this._modeChanged.complete(),this._destroyed.next(),this._destroyed.complete()}open(e){return this.toggle(!0,e)}close(){return this.toggle(!1)}_closeViaBackdropClick(){return this._setOpen(!1,!0,"mouse")}toggle(e=!this.opened,t){e&&t&&(this._openedVia=t);let r=this._setOpen(e,!e&&this._isFocusWithinDrawer(),this._openedVia||"program");return e||(this._openedVia=null),r}_setOpen(e,t,r){return this._opened=e,e?this._animationState=this._enableAnimations?"open":"open-instant":(this._animationState="void",t&&this._restoreFocus(r)),this._changeDetectorRef.markForCheck(),this._updateFocusTrapState(),new Promise(o=>{this.openedChange.pipe(re(1)).subscribe(s=>o(s?"open":"close"))})}_getWidth(){return this._elementRef.nativeElement&&this._elementRef.nativeElement.offsetWidth||0}_updateFocusTrapState(){this._focusTrap&&(this._focusTrap.enabled=!!this._container?.hasBackdrop&&this.opened)}_updatePositionInParent(e){if(!this._platform.isBrowser)return;let t=this._elementRef.nativeElement,r=t.parentNode;e==="end"?(this._anchor||(this._anchor=this._doc.createComment("mat-drawer-anchor"),r.insertBefore(this._anchor,t)),r.appendChild(t)):this._anchor&&this._anchor.parentNode.insertBefore(t,this._anchor)}static{this.\u0275fac=function(t){return new(t||i)(a(y),a(ye),a(De),a(be),a(k),a(ke),a(ve,8),a(Ie,8))}}static{this.\u0275cmp=w({type:i,selectors:[["mat-drawer"]],viewQuery:function(t,r){if(t&1&&W(Oe,5),t&2){let o;u(o=f())&&(r._content=o.first)}},hostAttrs:["tabIndex","-1",1,"mat-drawer"],hostVars:12,hostBindings:function(t,r){t&1&&ge("@transform.start",function(s){return r._animationStarted.next(s)})("@transform.done",function(s){return r._animationEnd.next(s)}),t&2&&(fe("@transform",r._animationState),pe("align",null),D("mat-drawer-end",r.position==="end")("mat-drawer-over",r.mode==="over")("mat-drawer-push",r.mode==="push")("mat-drawer-side",r.mode==="side")("mat-drawer-opened",r.opened))},inputs:{position:"position",mode:"mode",disableClose:"disableClose",autoFocus:"autoFocus",opened:"opened"},outputs:{openedChange:"openedChange",_openedStream:"opened",openedStart:"openedStart",_closedStream:"closed",closedStart:"closedStart",onPositionChanged:"positionChanged"},exportAs:["matDrawer"],standalone:!0,features:[F],ngContentSelectors:Ee,decls:3,vars:0,consts:[["content",""],["cdkScrollable","",1,"mat-drawer-inner-container"]],template:function(t,r){t&1&&(S(),x(0,"div",1,0),h(2),M())},dependencies:[E],encapsulation:2,data:{animation:[Qe.transformDrawer]},changeDetection:0})}}return i})(),Ze=(()=>{class i{get start(){return this._start}get end(){return this._end}get autosize(){return this._autosize}set autosize(e){this._autosize=p(e)}get hasBackdrop(){return this._drawerHasBackdrop(this._start)||this._drawerHasBackdrop(this._end)}set hasBackdrop(e){this._backdropOverride=e==null?null:p(e)}get scrollable(){return this._userContent||this._content}constructor(e,t,r,o,s,I=!1,B){this._dir=e,this._element=t,this._ngZone=r,this._changeDetectorRef=o,this._animationMode=B,this._drawers=new se,this.backdropClick=new C,this._destroyed=new c,this._doCheckSubject=new c,this._contentMargins={left:null,right:null},this._contentMarginChanges=new c,this._injector=v(O),e&&e.change.pipe(d(this._destroyed)).subscribe(()=>{this._validateDrawers(),this.updateContentMargins()}),s.change().pipe(d(this._destroyed)).subscribe(()=>this.updateContentMargins()),this._autosize=I}ngAfterContentInit(){this._allDrawers.changes.pipe(R(this._allDrawers),d(this._destroyed)).subscribe(e=>{this._drawers.reset(e.filter(t=>!t._container||t._container===this)),this._drawers.notifyOnChanges()}),this._drawers.changes.pipe(R(null)).subscribe(()=>{this._validateDrawers(),this._drawers.forEach(e=>{this._watchDrawerToggle(e),this._watchDrawerPosition(e),this._watchDrawerMode(e)}),(!this._drawers.length||this._isDrawerOpen(this._start)||this._isDrawerOpen(this._end))&&this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),this._ngZone.runOutsideAngular(()=>{this._doCheckSubject.pipe(te(10),d(this._destroyed)).subscribe(()=>this.updateContentMargins())})}ngOnDestroy(){this._contentMarginChanges.complete(),this._doCheckSubject.complete(),this._drawers.destroy(),this._destroyed.next(),this._destroyed.complete()}open(){this._drawers.forEach(e=>e.open())}close(){this._drawers.forEach(e=>e.close())}updateContentMargins(){let e=0,t=0;if(this._left&&this._left.opened){if(this._left.mode=="side")e+=this._left._getWidth();else if(this._left.mode=="push"){let r=this._left._getWidth();e+=r,t-=r}}if(this._right&&this._right.opened){if(this._right.mode=="side")t+=this._right._getWidth();else if(this._right.mode=="push"){let r=this._right._getWidth();t+=r,e-=r}}e=e||null,t=t||null,(e!==this._contentMargins.left||t!==this._contentMargins.right)&&(this._contentMargins={left:e,right:t},this._ngZone.run(()=>this._contentMarginChanges.next(this._contentMargins)))}ngDoCheck(){this._autosize&&this._isPushed()&&this._ngZone.runOutsideAngular(()=>this._doCheckSubject.next())}_watchDrawerToggle(e){e._animationStarted.pipe(l(t=>t.fromState!==t.toState),d(this._drawers.changes)).subscribe(t=>{t.toState!=="open-instant"&&this._animationMode!=="NoopAnimations"&&this._element.nativeElement.classList.add("mat-drawer-transition"),this.updateContentMargins(),this._changeDetectorRef.markForCheck()}),e.mode!=="side"&&e.openedChange.pipe(d(this._drawers.changes)).subscribe(()=>this._setContainerClass(e.opened))}_watchDrawerPosition(e){e&&e.onPositionChanged.pipe(d(this._drawers.changes)).subscribe(()=>{V(()=>{this._validateDrawers()},{injector:this._injector,phase:he.Read})})}_watchDrawerMode(e){e&&e._modeChanged.pipe(d(ee(this._drawers.changes,this._destroyed))).subscribe(()=>{this.updateContentMargins(),this._changeDetectorRef.markForCheck()})}_setContainerClass(e){let t=this._element.nativeElement.classList,r="mat-drawer-container-has-open";e?t.add(r):t.remove(r)}_validateDrawers(){this._start=this._end=null,this._drawers.forEach(e=>{e.position=="end"?(this._end!=null,this._end=e):(this._start!=null,this._start=e)}),this._right=this._left=null,this._dir&&this._dir.value==="rtl"?(this._left=this._end,this._right=this._start):(this._left=this._start,this._right=this._end)}_isPushed(){return this._isDrawerOpen(this._start)&&this._start.mode!="over"||this._isDrawerOpen(this._end)&&this._end.mode!="over"}_onBackdropClicked(){this.backdropClick.emit(),this._closeModalDrawersViaBackdrop()}_closeModalDrawersViaBackdrop(){[this._start,this._end].filter(e=>e&&!e.disableClose&&this._drawerHasBackdrop(e)).forEach(e=>e._closeViaBackdropClick())}_isShowingBackdrop(){return this._isDrawerOpen(this._start)&&this._drawerHasBackdrop(this._start)||this._isDrawerOpen(this._end)&&this._drawerHasBackdrop(this._end)}_isDrawerOpen(e){return e!=null&&e.opened}_drawerHasBackdrop(e){return this._backdropOverride==null?!!e&&e.mode!=="side":this._backdropOverride}static{this.\u0275fac=function(t){return new(t||i)(a(xe,8),a(y),a(k),a(_),a(Fe),a(We),a(de,8))}}static{this.\u0275cmp=w({type:i,selectors:[["mat-drawer-container"]],contentQueries:function(t,r,o){if(t&1&&(Q(o,K,5),Q(o,Ge,5)),t&2){let s;u(s=f())&&(r._content=s.first),u(s=f())&&(r._allDrawers=s)}},viewQuery:function(t,r){if(t&1&&W(K,5),t&2){let o;u(o=f())&&(r._userContent=o.first)}},hostAttrs:[1,"mat-drawer-container"],hostVars:2,hostBindings:function(t,r){t&2&&D("mat-drawer-container-explicit-backdrop",r._backdropOverride)},inputs:{autosize:"autosize",hasBackdrop:"hasBackdrop"},outputs:{backdropClick:"backdropClick"},exportAs:["matDrawerContainer"],standalone:!0,features:[H([{provide:Ie,useExisting:i}]),F],ngContentSelectors:Ve,decls:4,vars:2,consts:[[1,"mat-drawer-backdrop",3,"mat-drawer-shown"],[1,"mat-drawer-backdrop",3,"click"]],template:function(t,r){t&1&&(S(Pe),P(0,ze,1,2,"div",0),h(1),h(2,1),P(3,Ne,2,0,"mat-drawer-content")),t&2&&(z(r.hasBackdrop?0:-1),ce(3),z(r._content?-1:3))},dependencies:[K],styles:['.mat-drawer-container{position:relative;z-index:1;color:var(--mat-sidenav-content-text-color, var(--mat-app-on-background));background-color:var(--mat-sidenav-content-background-color, var(--mat-app-background));box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible;background-color:var(--mat-sidenav-scrim-color)}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}.cdk-high-contrast-active .mat-drawer-backdrop{opacity:.5}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;color:var(--mat-sidenav-container-text-color, var(--mat-app-on-surface-variant));box-shadow:var(--mat-sidenav-container-elevation-shadow);background-color:var(--mat-sidenav-container-background-color, var(--mat-app-surface));border-top-right-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));border-bottom-right-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));width:var(--mat-sidenav-container-width);display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}.cdk-high-contrast-active .mat-drawer,.cdk-high-contrast-active [dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}.cdk-high-contrast-active [dir=rtl] .mat-drawer,.cdk-high-contrast-active .mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0);border-top-left-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));border-bottom-left-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));border-top-right-radius:0;border-bottom-right-radius:0}[dir=rtl] .mat-drawer{border-top-left-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));border-bottom-left-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));border-top-right-radius:0;border-bottom-right-radius:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{border-top-right-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));border-bottom-right-radius:var(--mat-sidenav-container-shape, var(--mat-app-corner-large));border-top-left-radius:0;border-bottom-left-radius:0;left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer[style*="visibility: hidden"]{display:none}.mat-drawer-side{box-shadow:none;border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid}.mat-drawer-side.mat-drawer-end{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side{border-left-color:var(--mat-sidenav-container-divider-color);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side.mat-drawer-end{border-right-color:var(--mat-sidenav-container-divider-color);border-right-width:1px;border-right-style:solid;border-left:none}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}'],encapsulation:2,changeDetection:0})}}return i})();var Be=(()=>{class i{static{this.\u0275fac=function(t){return new(t||i)}}static{this.\u0275mod=b({type:i})}static{this.\u0275inj=g({imports:[G,Y,Y,G]})}}return i})();var je=class i{static \u0275fac=function(e){return new(e||i)};static \u0275mod=b({type:i});static \u0275inj=g({imports:[we,Be]})};export{K as a,Ge as b,Ze as c,Be as d,je as e};
