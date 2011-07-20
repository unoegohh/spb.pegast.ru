
(function($){$.fn.addOptions=function(){var add=function(el,v,t,sO){var option=document.createElement("option");option.value=v,option.text=t;var o=el.options;var oL=o.length;if(!el.cache){el.cache={};for(var i=0;i<oL;i++){el.cache[o[i].value]=i;}}
if(typeof el.cache[v]=="undefined"){el.cache[v]=oL;}
el.options[el.cache[v]]=option;if(sO){option.selected=true;}};if(arguments.length==0){return this;}
var items,v,t;if(typeof(arguments[0])=="object"){items=arguments[0];}
this.each(function(){if(this.nodeName.toLowerCase()!="select")return;$(this).find('option').remove().end().get(0).cache=null;for(var item in items){var sel=items[item].selected||false;add(this,item,items[item].title,sel);}});return this;};})(jQuery);(function($){$.fn.extend({renderCalendar:function(s)
{s=$.extend({month:null,year:null,showHeader:$.dpConst.SHOW_HEADER_SHORT,dpController:null,hoverClass:'dp-hover'},s);if(s.showHeader!=$.dpConst.SHOW_HEADER_NONE){var headRow='<tr>';for(var i=Date.firstDayOfWeek;i<Date.firstDayOfWeek+7;i++){var weekday=i%7;var day=Date.dayNames[weekday];headRow+='<th title="'+day+'" class="'+(weekday==0||weekday==6?'weekend':'weekday')+'">'+day.substr(0,1)+'</th>';}
headRow+='</tr>';};var $calendarTable='<table class="jCalendar"><thead>'+headRow+'</thead><tbody>';var today=(new Date()).zeroTime();var month=s.month==undefined?today.getMonth():s.month;var year=s.year||today.getFullYear();var currentDate=(new Date(year,month,1)).zeroTime();var firstDayOffset=Date.firstDayOfWeek-currentDate.getDay()+1;if(firstDayOffset>1)firstDayOffset-=7;currentDate.addDays(firstDayOffset-1);var w=0;while(w++<6){$calendarTable+='<tr>';for(var i=0;i<7;i++){var thisMonth=currentDate.getMonth()==month;var className=(thisMonth?'current-month ':'other-month ')+
(currentDate.isWeekend()?'weekend ':'weekday ')+
(thisMonth&&currentDate.getTime()==today.getTime()?'today ':'');className+=(s.dpController.isValidDate(currentDate)&&currentDate.getTime()>=s.dpController.startDate.getTime())?'active ':'notactive ';$calendarTable+='<td class="'+className+'" samo:dt="'+currentDate.getTime()+'" >'+currentDate.getDate()+'</td>';currentDate.addDays(1);}
$calendarTable+='</tr>';}
$calendarTable+='</tbody></table>';$('#dp-calendar').listen('click','td.active',function(){var $this=$(this),c=s.dpController,_d=$(this).attr('samo:dt');var d=new Date();d.setTime(_d);c.setSelected(d,!$this.is('.selected')||!c.selectMultiple);var _s=c.isSelected(_d);$(c.ele).trigger('dateSelected',[d,$this,_s]);if(c.closeOnSelect){c._closeCalendar();}});return this.each(function()
{$(this).empty().append($calendarTable);});},datePicker:function(s)
{if(!$.event._dpCache)$.event._dpCache=[];s=$.extend({month:undefined,year:undefined,startDate:undefined,endDate:undefined,validDates:undefined,createButton:false,showYearNavigation:false,closeOnSelect:true,displayClose:false,selectMultiple:false,clickInput:false,innerButton:true,verticalPosition:$.dpConst.POS_TOP,horizontalPosition:$.dpConst.POS_LEFT,verticalOffset:0,horizontalOffset:-75,hoverClass:'dp-hover'},s);return this.each(function()
{var $this=$(this);if(!this._dpId){this._dpId=$.event.guid++;$.event._dpCache[this._dpId]=new DatePicker(this);}
var controller=$.event._dpCache[this._dpId];var _s=$.extend(s,{startDate:$this.attr('samo:startDate'),validDates:$this.attr('samo:validDates'),endDate:$this.attr('samo:endDate')});controller.init(_s);if(s.innerButton){$(this).mousemove(function(e){var x=e.pageX||e.x;var y=e.pageY||e.y;var el=e.target||e.srcElement;var direction=(x>coord(el,'offsetLeft')+el.offsetWidth-16)?((y<coord(el,'offsetTop')+14)?1:-1):0;if(direction!==this._direction){switch(direction){case 1:$this.addClass('date-active-btn');break;default:$this.removeClass('date-active-btn');}
this._direction=direction;}}).mouseout(function(){$this.removeClass('date-active-btn');this._direction=null;}).click(function(e){if(this._direction!=0){$this.dpDisplay();}});}
if($this.is(':text')){$this.bind('dateSelected',function(e,selectedDate,$td)
{this.value=selectedDate.asString();}).bind('change',function()
{var d=Date.fromString(this.value);if(d){controller.setSelected(d,true,true);}});if(s.clickInput){$this.bind('click',function()
{$this.dpDisplay();});}}
$this.addClass('dp-applied');if($this.val().length){$this.dpSetSelected($(this).val());}})},dpSetDisabled:function(s)
{return _w.call(this,'setDisabled',s);},dpSetValidDates:function(d)
{return _w.call(this,'setValidDates',d);},dpSetStartDate:function(d)
{return _w.call(this,'setStartDate',d);},dpSetEndDate:function(d)
{return _w.call(this,'setEndDate',d);},dpGetSelected:function()
{var c=_getController(this[0]);if(c){return c.getSelected();}
return null;},dpSetSelected:function(d,v,m)
{if(v==undefined)v=true;if(m==undefined)m=true;return _w.call(this,'setSelected',Date.fromString(d),v,m);},dpDisplay:function(e)
{return _w.call(this,'display',e);},_dpDestroy:function()
{}});var _w=function(f,a1,a2,a3)
{return this.each(function()
{var c=_getController(this);if(c){c[f](a1,a2,a3);}});};function DatePicker(ele)
{this.ele=ele;this.displayedMonth=null;this.displayedYear=null;this.startDate=null;this.endDate=null;this.showYearNavigation=null;this.closeOnSelect=null;this.displayClose=null;this.selectMultiple=null;this.verticalPosition=null;this.horizontalPosition=null;this.verticalOffset=null;this.horizontalOffset=null;this.button=null;this.selectedDates={};this.validDates='';this.startValidDate=null;};$.extend(DatePicker.prototype,{init:function(s)
{this.setStartDate(s.startDate);this.setEndDate(s.endDate);this.setValidDates(s.validDates);this.setDisplayedMonth(Number(s.month),Number(s.year));this.showYearNavigation=s.showYearNavigation;this.closeOnSelect=s.closeOnSelect;this.displayClose=s.displayClose;this.selectMultiple=s.selectMultiple;this.verticalPosition=s.verticalPosition;this.horizontalPosition=s.horizontalPosition;this.hoverClass=s.hoverClass;this.setOffset(s.verticalOffset,s.horizontalOffset);},setStartDate:function(d)
{if(d){this.startDate=Date.fromString(d).zeroTime();}
if(!this.startDate){this.startDate=(new Date()).zeroTime();}
this.setDisplayedMonth(this.displayedMonth,this.displayedYear);},setEndDate:function(d)
{if(d){this.endDate=Date.fromString(d).zeroTime();}
if(!this.endDate){this.endDate=(new Date('12/31/2089')).zeroTime();}
if(this.endDate.getTime()<this.startDate.getTime()){this.endDate.setTime(this.startDate.getTime());}
this.setDisplayedMonth(this.displayedMonth,this.displayedYear);},setValidDates:function(d){if(d){this.validDates=d;this.startValidDate=new Date();this.startValidDate.setTime(this.startDate.getTime());this.endDate=new Date();this.endDate.setTime(this.startDate.getTime());this.endDate.addDays(d.length);}},setPosition:function(v,h)
{this.verticalPosition=v;this.horizontalPosition=h;},setOffset:function(v,h)
{this.verticalOffset=parseInt(v)||0;this.horizontalOffset=parseInt(h)||0;},setDisplayedMonth:function(m,y)
{if(this.startDate==undefined||this.endDate==undefined){return;}
var s=new Date(this.startDate.getTime());s.setDate(1);var e=new Date(this.endDate.getTime());e.setDate(1);var t;if(isNaN(m)&&isNaN(y)){t=new Date().zeroTime();t.setDate(1);}else if(isNaN(m)){t=new Date(y,this.displayedMonth,1);}else if(isNaN(y)){t=new Date(this.displayedYear,m,1);}else{t=new Date(y,m,1)}
if(t.getTime()<s.getTime()){t=s;}else if(t.getTime()>e.getTime()){t=e;}
this.displayedMonth=t.getMonth();this.displayedYear=t.getFullYear();},setSelected:function(d,v,moveToMonth)
{if(this.selectMultiple==false){this.selectedDates={};}
if(moveToMonth){this.setDisplayedMonth(d.getMonth(),d.getFullYear());}
this.selectedDates[d.getTime()]=v;},isSelected:function(t)
{return this.selectedDates[t];},getSelected:function()
{var r=[];for(t in this.selectedDates){if(this.selectedDates[t]==true){r.push(new Date(Number(t)));}}
return r;},display:function(eleAlignTo)
{if($(this.ele).is('.dp-disabled'))return;eleAlignTo=eleAlignTo||this.ele;var c=this;var $ele=$(eleAlignTo);var eleOffset=$ele.offset();var _checkMouse=function(e)
{var el=e.target;var cal=$('#dp-popup')[0];while(true){if(el==cal){return true;}else if(el==document){c._closeCalendar();return false;}else{el=$(el).parent()[0];}}};this._checkMouse=_checkMouse;this._closeCalendar(true);$('body').append($('<div></div>').attr('id','dp-popup').css({'top':eleOffset.top+c.verticalOffset,'left':eleOffset.left+c.horizontalOffset}).append($('<h2></h2>'),$('<div id="dp-nav-prev"></div>').append($('<a id="dp-nav-prev-month" href="#" title="'+$.dpText.TEXT_PREV_MONTH+'">&#x2190;</a>').bind('click',function()
{return c._displayNewMonth.call(c,this,-1,0);})),$('<div id="dp-nav-next"></div>').append($('<a id="dp-nav-next-month" href="#" title="'+$.dpText.TEXT_NEXT_MONTH+'">&#x2192;</a>').bind('click',function()
{return c._displayNewMonth.call(c,this,1,0);})),$('<div></div>').attr('id','dp-calendar')).bgIframe());c._renderCalendar();$(document).bind('mousedown',this._checkMouse);},isValidDate:function(thisDate){if(!this.validDates)return true;var dateDiff=Math.round((thisDate.getTime()-this.startValidDate.getTime())/86400000);return(dateDiff>=0&&parseInt(this.validDates.substr(dateDiff,1))==1)?true:false;},_displayNewMonth:function(ele,m,y)
{if(!$(ele).is('.disabled')){this.setDisplayedMonth(this.displayedMonth+m,this.displayedYear+y);this._clearCalendar();this._renderCalendar();$(this.ele).trigger('dpMonthChanged',[this.displayedMonth,this.displayedYear]);}
ele.blur();return false;},_renderCalendar:function()
{$('#dp-popup h2').html(Date.monthNames[this.displayedMonth]+' '+this.displayedYear);$('#dp-calendar').renderCalendar({month:this.displayedMonth,year:this.displayedYear,dpController:this,hoverClass:this.hoverClass});if(this.displayedYear==this.startDate.getFullYear()&&this.displayedMonth==this.startDate.getMonth()){$('#dp-nav-prev-year').addClass('disabled');$('#dp-nav-prev-month').addClass('disabled');$('#dp-calendar td.other-month').each(function()
{var $this=$(this);if(Number($this.text())>20){$this.addClass('disabled');}});var d=this.startDate.getDate();$('#dp-calendar td.current-month').each(function()
{var $this=$(this);if(Number($this.text())<d){$this.addClass('disabled');}});}else{$('#dp-nav-prev-year').removeClass('disabled');$('#dp-nav-prev-month').removeClass('disabled');var d=this.startDate.getDate();if(d>20){var sd=new Date(this.startDate.getTime());sd.addMonths(1);if(this.displayedYear==sd.getFullYear()&&this.displayedMonth==sd.getMonth()){$('#dp-calendar td.other-month').each(function()
{var $this=$(this);if(Number($this.text())<d){$this.addClass('disabled');}});}}}
if(this.displayedYear==this.endDate.getFullYear()&&this.displayedMonth==this.endDate.getMonth()){$('#dp-nav-next-year').addClass('disabled');$('#dp-nav-next-month').addClass('disabled');$('#dp-calendar td.other-month').each(function()
{var $this=$(this);if(Number($this.text())<14){$this.addClass('disabled');}});var d=this.endDate.getDate();$('#dp-calendar td.current-month').each(function()
{var $this=$(this);if(Number($this.text())>d){$this.addClass('disabled');}});}else{$('#dp-nav-next-year').removeClass('disabled');$('#dp-nav-next-month').removeClass('disabled');var d=this.endDate.getDate();if(d<13){var ed=new Date(this.endDate.getTime());ed.addMonths(-1);if(this.displayedYear==ed.getFullYear()&&this.displayedMonth==ed.getMonth()){$('#dp-calendar td.other-month').each(function()
{var $this=$(this);if(Number($this.text())>d){$this.addClass('disabled');}});}}}},_closeCalendar:function(programatic)
{$(document).unbind('mousedown',this._checkMouse);this._clearCalendar();$('#dp-popup a').unbind();$('#dp-popup').empty().remove();if(!programatic){$(this.ele).trigger('dpClosed',[this.getSelected()]);}},_clearCalendar:function()
{$('#dp-calendar').empty();}});$.dpConst={SHOW_HEADER_NONE:0,SHOW_HEADER_SHORT:1,SHOW_HEADER_LONG:2,POS_TOP:0,POS_BOTTOM:1,POS_LEFT:0,POS_RIGHT:1};$.dpText={TEXT_PREV_YEAR:'Previous year',TEXT_PREV_MONTH:'Previous month',TEXT_NEXT_YEAR:'Next year',TEXT_NEXT_MONTH:'Next month',TEXT_CLOSE:'Close',TEXT_CHOOSE_DATE:'Choose date'};$.dpVersion='$Id: fast.js 4810 2010-09-16 10:17:20Z MiRacLe $';function _getController(ele)
{if(ele._dpId)return $.event._dpCache[ele._dpId];return false;};if($.fn.bgIframe==undefined){$.fn.bgIframe=function(){return this;};};$(window).bind('unload',function(){var els=$.event._dpCache||[];for(var i in els){$(els[i].ele)._dpDestroy();}});function coord(el,prop){var c=el[prop],b=document.body;while((el=el.offsetParent)&&(el!=b)){if(!$.browser.msie||(el.currentStyle.position!='relative'))
c+=el[prop];}
return c;}})(jQuery);(function($){$.fn.listen=function(name,selector,handler){if(name=='click'){this.each(function(){$(this).bind(name,function(e){if($(e.target).is(selector)){handler.apply(e.target);}});});}
return this;};})(jQuery);(function($){$.fn.SpinButton=function(cfg){return this.each(function(){this.spinCfg={min:cfg&&!isNaN(parseFloat(cfg.min))?Number(cfg.min):(($(this).attr('min'))?Number($(this).attr('min')):null),max:cfg&&!isNaN(parseFloat(cfg.max))?Number(cfg.max):(($(this).attr('max'))?Number($(this).attr('max')):null),step:cfg&&cfg.step?Number(cfg.step):1,page:cfg&&cfg.page?Number(cfg.page):10,upClass:cfg&&cfg.upClass?cfg.upClass:'up',downClass:cfg&&cfg.downClass?cfg.downClass:'down',reset:cfg&&cfg.reset?cfg.reset:this.value,delay:cfg&&cfg.delay?Number(cfg.delay):500,interval:cfg&&cfg.interval?Number(cfg.interval):100,_btn_width:16,_btn_height:14,_direction:null,_delay:null,_repeat:null};this.adjustValue=function(i){var v=(isNaN(this.value)?this.spinCfg.reset:Number(this.value))+Number(i);if(this.spinCfg.min!==null)v=Math.max(v,this.spinCfg.min);if(this.spinCfg.max!==null)v=Math.min(v,this.spinCfg.max);this.value=v;};$(this).addClass(cfg&&cfg.spinClass?cfg.spinClass:'spin-button').mousemove(function(e){var x=e.pageX||e.x;var y=e.pageY||e.y;var el=e.target||e.srcElement;var direction=(x>coord(el,'offsetLeft')+el.offsetWidth-this.spinCfg._btn_width)?((y<coord(el,'offsetTop')+this.spinCfg._btn_height)?1:-1):0;if(direction!==this.spinCfg._direction){switch(direction){case 1:$(this).removeClass(this.spinCfg.downClass).addClass(this.spinCfg.upClass);break;case-1:$(this).removeClass(this.spinCfg.upClass).addClass(this.spinCfg.downClass);break;default:$(this).removeClass(this.spinCfg.upClass).removeClass(this.spinCfg.downClass);}
this.spinCfg._direction=direction;}}).mouseout(function(){$(this).removeClass(this.spinCfg.upClass).removeClass(this.spinCfg.downClass);this.spinCfg._direction=null;}).mousedown(function(e){if(this.spinCfg._direction!=0){var self=this;var adjust=function(){self.adjustValue(self.spinCfg._direction*self.spinCfg.step);};adjust();self.spinCfg._delay=window.setTimeout(function(){adjust();self.spinCfg._repeat=window.setInterval(adjust,self.spinCfg.interval);},self.spinCfg.delay);}}).mouseup(function(e){window.clearInterval(this.spinCfg._repeat);window.clearTimeout(this.spinCfg._delay);}).dblclick(function(e){if($.browser.msie)
this.adjustValue(this.spinCfg._direction*this.spinCfg.step);}).keydown(function(e){switch(e.keyCode){case 38:this.adjustValue(this.spinCfg.step);break;case 40:this.adjustValue(-this.spinCfg.step);break;case 33:this.adjustValue(this.spinCfg.page);break;case 34:this.adjustValue(-this.spinCfg.page);break;}}).bind("mousewheel",function(e){if(e.wheelDelta>=120)
this.adjustValue(this.spinCfg.step);else if(e.wheelDelta<=-120)
this.adjustValue(-this.spinCfg.step);e.preventDefault();}).change(function(e){this.adjustValue(0);});if(this.addEventListener){this.addEventListener('DOMMouseScroll',function(e){if(e.detail>0)
this.adjustValue(-this.spinCfg.step);else if(e.detail<0)
this.adjustValue(this.spinCfg.step);e.preventDefault();},false);}});function coord(el,prop){var c=el[prop],b=document.body;while((el=el.offsetParent)&&(el!=b)){if(!$.browser.msie||(el.currentStyle.position!='relative'))
c+=el[prop];}
return c;}};})(jQuery);jQuery(document).ready(function(){function INIT_PARAMS(){var params={samo_action:'FASTINIT'};$('input[@type=text],select,div.checklistbox').each(function(){var name=this.name||$(this).attr('name');var value=$.controlValue(this,true);if(name&&value&&value!==0){params[name]=value;}});params.rev=samo.rev;params=$.extend({},samo.search_params_defaults,params);return params;}
$.remoteScript('get',samo.rootURL,INIT_PARAMS(),function(){var $module_container=$('#agency_search'),_controls=$('select,input',$module_container);$('#TOWNFROMINC,#STATEINC,.#TOURINC',$module_container).bind('change',function(){var name=this.name||$(this).attr('name');if(name!='TOURINC'){$('#TOURINC option[@value=0]',$module_container).attr('selected',true);}
if(name!='STATEINC'||$.controlValue(name,false,$module_container)){$.remoteScript('get',getParams(name),{});}});$('input.date',$module_container).datePicker().mask(Date.mask);$('input.price',$module_container).numeric().SpinButton({step:100,min:0});$('#load',$module_container).click(function(){top.location.href=getPriceURL();});$('#CURRENCY').bind('change',function(){var $currency_to=$(this).val();$('#PRICE_MAX',$module_container).each(function(){if($(this).val()){var exrate=($(this).attr('samo:CURRENCY')!=$currency_to)?samo.CROSS_RATES[$(this).attr('samo:CURRENCY')][$currency_to]:1;var newValue=Math.ceil(parseInt($(this).attr('samo:u_value'))*exrate);$(this).val(newValue).attr('_pv_',newValue).triggerHandler('blur');}});});$('#PRICE_MAX',$module_container).bind('blur',function(){var currency=$('#CURRENCY option:selected',$module_container).val(),value=$(this).val();$(this).attr('samo:u_value',value).attr('samo:CURRENCY',currency);})
function getParams(action){var useGET=arguments[1]||false;var result={};result.samo_action=action+'FAST';_controls.each(function(){var name=this.name||$(this).attr('name');var value=$.controlValue(this,useGET);if(name&&value&&value!=0){result[name]=value;}});var STATIC_ACTIONS=['TOWNFROMINC','STATEINC','TOURINC'];if($.inArray(action,STATIC_ACTIONS)!=-1){var _result=result;result={};result.samo_action=action+'FAST';$(STATIC_ACTIONS).each(function(){if('undefined'!=typeof _result[this]){result[this]=_result[this];}});}
samo.xhr.Reset();var server=samo.servers[result.TOWNFROMINC+'_'+result.STATEINC]||samo.servers[result.TOWNFROMINC];samo.xhr.loadPolicyURL=server+$.param({samo_action:'policy',agency:samo.partner});result.ver=samo.rev;return server+$.param(result);}
function getPriceURL(){var result={DOLOAD:1};$('select,input',$module_container).each(function(){var name=this.name||$(this).attr('name');var value=$.controlValue(this);if(name&&value&&value!==0){if(name=='CHECKIN_BEG'){result.CHECKIN_END=value;}
result[name]=value;}});var TS=samo.SEARCH_TOUR_URL+(samo.SEARCH_TOUR_URL.indexOf('?')==-1?'?':'&');return TS+$.param(result);}});});