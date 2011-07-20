
(function(){function Translit()
{this.enabled=true;}
Translit.prototype.UrlTranslit=function(str,allow_slashes)
{var slash="",x=0;if(allow_slashes)slash="\\/";var LettersFrom="������������������������";var LettersTo="abvgdeziklmnoprstufyejxe";var Consonant="���������������������";var Vowel="���������";var BiLetters={"�":"zh","�":"ts","�":"ch","�":"sh","�":"sch","�":"ju","�":"ja"};str=str.replace(/[_\s\.,?!\[\](){}]+/g,"_");str=str.replace(/-{2,}/g,"--");str=str.replace(/_\-+_/g,"--");str=str.toLowerCase();str=str.replace(new RegExp("(�|�)(["+Vowel+"])","g"),"j$2");str=str.replace(/(�|�)/g,"");var _str="";for(x=0;x<str.length;x++){if((index=LettersFrom.indexOf(str.charAt(x)))>-1){_str+=LettersTo.charAt(index);}else{_str+=str.charAt(x);}}
str=_str;_str="";for(x=0;x<str.length;x++){if(BiLetters[str.charAt(x)]){_str+=BiLetters[str.charAt(x)];}else{_str+=str.charAt(x);}}
str=_str;str=str.replace(/j{2,}/g,"j");str=str.replace(new RegExp("[^"+slash+"0-9a-z_\\-]+","g"),"");return str;};Translit.prototype.Supertag=function(str,allow_slashes)
{var slash="";if(allow_slashes)slash="\\/";str=this.UrlTranslit(str,allow_slashes);str=str.replace(new RegExp("[^"+slash+"0-9a-zA-Z\\-]+","g"),"");str=str.replace(/[\-_]+/g,"-");str=str.replace(/-+$/g,"");return str;};Translit.prototype.BiDiTranslit=function(str,direction_decode,allow_slashes)
{var Tran={"�":"A","�":"B","�":"V","�":"G","�":"D","�":"E","�":"JO","�":"ZH","�":"Z","�":"I","�":"JJ","�":"K","�":"L","�":"M","�":"N","�":"O","�":"P","�":"R","�":"S","�":"T","�":"U","�":"F","�":"KH","�":"C","�":"CH","�":"SH","�":"SHH","�":"_~","�":"Y","�":"_'","�":"EH","�":"JU","�":"JA","�":"a","�":"b","�":"v","�":"g","�":"d","�":"e","�":"jo","�":"zh","�":"z","�":"i","�":"jj","�":"k","�":"l","�":"m","�":"n","�":"o","�":"p","�":"r","�":"s","�":"t","�":"u","�":"f","�":"kh","�":"c","�":"ch","�":"sh","�":"shh","�":"~","�":"y","�":"'","�":"eh","�":"ju","�":"ja"," ":"__","_":"__"};var DeTran={"SHH":"�","CH":"�","SH":"�","EH":"�","JU":"�","_'":"�","_~":"�","JO":"�","ZH":"�","JJ":"�","KH":"�","JA":"�","A":"�","B":"�","V":"�","G":"�","D":"�","E":"�","Z":"�","I":"�","K":"�","L":"�","M":"�","N":"�","O":"�","P":"�","R":"�","S":"�","T":"�","U":"�","F":"�","C":"�","Y":"�","shh":"�","jo":"�","zh":"�","jj":"�","kh":"�","ch":"�","sh":"�","ju":"�","ja":"�","__":" ","eh":"�","a":"�","b":"�","v":"�","g":"�","d":"�","e":"�","z":"�","i":"�","k":"�","l":"�","m":"�","n":"�","o":"�","p":"�","r":"�","s":"�","t":"�","u":"�","f":"�","c":"�","~":"�","y":"�","'":"�"};var result="",k=0,i=0;if(!direction_decode)
{str=str.replace(/[^\/\- _0-9a-z�-��-߸�]/gi,"");if(!allow_slashes)str=str.replace(/[^\/]/i,"");var is_rus=new RegExp("[�-��-߸� ]","i");var lang_eng=true;var _lang_eng=true;var temp;for(i=0;i<str.length;i++)
{_lang_eng=lang_eng;temp=String(str.charAt(i));if(temp.replace(is_rus,"")==temp){lang_eng=true;}else
{lang_eng=false;temp=Tran[temp];}
if(lang_eng!=_lang_eng)temp="+"+temp;result+=temp;}}
else
{var pgs=str.split("/");var DeTranRegex=new Array();for(k in DeTran)
DeTranRegex[k]=new RegExp(k,"g");for(var j=0;j<pgs.length;j++)
{var strings=pgs[j].split("+");for(i=1;i<strings.length;i+=2){for(k in DeTran){strings[i]=strings[i].replace(DeTranRegex[k],DeTran[k]);}}
pgs[j]=strings.join("");}
result=pgs.join(allow_slashes?"/":":");}
return result.replace(/\/+$/,"");};String.prototype.translit=function(){return(new Translit).UrlTranslit(this,1).replace('_',' ');};})();(function($){$.extend($.fn,{livequery:function(type,fn,fn2){var self=this,q;if($.isFunction(type))
fn2=fn,fn=type,type=undefined;$.each($.livequery.queries,function(i,query){if(self.selector==query.selector&&self.context==query.context&&type==query.type&&(!fn||fn.$lqguid==query.fn.$lqguid)&&(!fn2||fn2.$lqguid==query.fn2.$lqguid))
return(q=query)&&false;});q=q||new $.livequery(this.selector,this.context,type,fn,fn2);q.stopped=false;$.livequery.run(q.id);return this;},expire:function(type,fn,fn2){var self=this;if($.isFunction(type))
fn2=fn,fn=type,type=undefined;$.each($.livequery.queries,function(i,query){if(self.selector==query.selector&&self.context==query.context&&(!type||type==query.type)&&(!fn||fn.$lqguid==query.fn.$lqguid)&&(!fn2||fn2.$lqguid==query.fn2.$lqguid)&&!this.stopped)
$.livequery.stop(query.id);});return this;}});$.livequery=function(selector,context,type,fn,fn2){this.selector=selector;this.context=context||document;this.type=type;this.fn=fn;this.fn2=fn2;this.elements=[];this.stopped=false;this.id=$.livequery.queries.push(this)-1;fn.$lqguid=fn.$lqguid||$.livequery.guid++;if(fn2)fn2.$lqguid=fn2.$lqguid||$.livequery.guid++;return this;};$.livequery.prototype={stop:function(){var query=this;if(this.type)
this.elements.unbind(this.type,this.fn);else if(this.fn2)
this.elements.each(function(i,el){query.fn2.apply(el);});this.elements=[];this.stopped=true;},run:function(){if(this.stopped)return;var query=this;var oEls=this.elements,els=$(this.selector,this.context),nEls=els.not(oEls);this.elements=els;if(this.type){nEls.bind(this.type,this.fn);if(oEls.length>0)
$.each(oEls,function(i,el){if($.inArray(el,els)<0)
$.event.remove(el,query.type,query.fn);});}
else{nEls.each(function(){query.fn.apply(this);});if(this.fn2&&oEls.length>0)
$.each(oEls,function(i,el){if($.inArray(el,els)<0)
query.fn2.apply(el);});}}};$.extend($.livequery,{guid:0,queries:[],queue:[],running:false,timeout:null,bypassed:false,bypass:function(fn){var oldBypassed=jQuery.livequery.bypassed;jQuery.livequery.bypassed=true;var r=fn();jQuery.livequery.bypassed=oldBypassed;return r;},checkQueue:function(){if($.livequery.running&&$.livequery.queue.length){var length=$.livequery.queue.length;while(length--)
$.livequery.queries[$.livequery.queue.shift()].run();}},pause:function(){$.livequery.running=false;},play:function(){$.livequery.running=true;$.livequery.run();},registerPlugin:function(){$.each(arguments,function(i,n){if(!$.fn[n])return;var old=$.fn[n];$.fn[n]=function(){var r=old.apply(this,arguments);$.livequery.run();return r;}});},run:function(id){if(jQuery.livequery.bypassed)return;if(id!=undefined){if($.inArray(id,$.livequery.queue)<0)
$.livequery.queue.push(id);}
else
$.each($.livequery.queries,function(id){if($.inArray(id,$.livequery.queue)<0)
$.livequery.queue.push(id);});if($.livequery.timeout)clearTimeout($.livequery.timeout);$.livequery.timeout=setTimeout($.livequery.checkQueue,20);},stop:function(id){if(id!=undefined)
$.livequery.queries[id].stop();else
$.each($.livequery.queries,function(id){$.livequery.queries[id].stop();});}});$.livequery.registerPlugin('append','prepend','after','before','wrap','attr','removeAttr','addClass','removeClass','toggleClass','empty','remove','html');$(function(){$.livequery.play();});var init=$.prototype.init;$.prototype.init=function(a,c){var r=init.apply(this,arguments);if(a&&a.selector)
r.context=a.context,r.selector=a.selector;if(typeof a=='string')
r.context=c||document,r.selector=a;return r;};$.prototype.init.prototype=$.prototype;})(jQuery);(function($){samo.bron_info=function(){$.remoteScript('get',getParams('BRONINIT'),{},init_bron_form);calc_error=window.undefined;bron_error=window.undefined;paymentgate_error=window.undefined;$('#print').livequery('click',function(){window.print();});$('#paymentgate').livequery('click',function(){samo.xhr=window.undefined;var params={callbackuri:document.location.href,CLAIM:$(this).attr('samo:claim')};$.remoteScript('post',samo.rootURL+$.param({samo_action:'PAYMENTGATE'}),params,function(){if(typeof paymentgate_error!='undefined'){alert(paymentgate_error);paymentgate_error=window.undefined;}});});$('#contract_print').livequery('click',function(){var d=window.open('about:blank');setTimeout(function(){if(d){d.document.title='������� �� ����������� �������������� ������������';d.document.body.innerHTML=$('#contract').html();d.print();}},200);});$('#bron').bind('click',function(){var $contract=$('#CONRACTAGREE');if($contract.length&&!$contract.is(':checked')){$contract.parent().addClass('error').get(0).scrollIntoView(true);return false;}else{$contract.parent().removeClass('error');}
$.event.trigger('ServTypeMustBron');if(checkTouristFields()){if(checkFreights()&&checkServices()){if($('#PERSONINFO').length&&!checkPersonInfo()){return false;}
if(!$('#fcaptcha').val().length){$('#fcaptcha').parents('fieldset:first').addClass('error').get(0).scrollIntoView(false);return false;}else{$('#fcaptcha').parents('fieldset:first').removeClass('error');}
var params=collectData(true);var self=this;params.note=($('#NOTECLAIM').length)?$('#NOTECLAIM').val().substring(0,200):'';params.PRICE=$('#CLAIMPRICE').text();params.are_you_human=$('#fcaptcha').val();if($contract.length){params.contract=1;}
self.disabled=true;$.remoteScript('post',getParams('BRON'),params,function(){if(typeof bron_error!='undefined'){alert(bron_error);bron_error=window.undefined;}else{if(typeof samo.BRON_TRACK_LINK!='undefined'){var _pageTracker=(typeof pageTracker!='undefined')?pageTracker:((typeof _gaq!='undefined'&&typeof _gaq._getAsyncTracker=='function')?_gaq._getAsyncTracker():window.undefined);if(typeof _pageTracker!='undefined'){_pageTracker._trackPageview(samo.BRON_TRACK_LINK);}}}});}}
return true;});$('#freights select:first').livequery('change',function(){$.remoteScript('get',getParams('TOFREIGHTINC')+'&TOFREIGHTINC='+$(this).val()+'&BUSINESS='+$('#freights_class').val()+'&BACKFREIGHTINC='+$('select:last',$('#FREIGHTSINFO')).val(),{},function(){});});$('#FREIGHTSINFO select, #ASERVICES input').livequery('change',function(){$.event.trigger('PriceChanged');});function checkAge(human,age){switch(human){case'INF':return(age>=0&&age<2);break;case'CHD':return(age>=2&&age<18);break;default:return(age>=2&&age<=99);break;}
return false;}
function init_bron_form(){$('#recaptcha').livequery('click',function(){var $cap=$('#icaptcha'),$src=$cap.attr('src').replace(/_=\d+/,'');$cap.attr('src',$src+'_='+Number(new Date()));});$('#bron_info').css('display','block');$('.numeric').numeric();$('#ASERVICES fieldset.required').bind('ServTypeMustBron',function(){if(!$(':checked',$(this)).length){if(!$(this).is('.error')){$('legend',$(this)).append('<span>'+samo.LANG.REQUIRED_SERVICE_TYPE+'</span>');$(this).addClass('error');}
this.scrollIntoView(false);}else{$(this).removeClass('error').find('legend span').remove();}});$('#freights_class').bind('change',function(){$.remoteScript('get',getFreighsParams(),{},function(){});});$('#CLAIMPRICE').bind('PriceChanged',function(){$(this).addClass('not-actual');$('#CLAIMPRICE_NOTICE').css('display','block');$('#bron').attr('disabled',true);});$('#calc').bind('click',function(){$.event.trigger('ServTypeMustBron');if(checkFreights()&&checkServices()){var params=collectData(false);var self=this;self.disabled=true;$.remoteScript('post',getParams('CALC'),params,function(){self.disabled=false;if(typeof calc_error!='undefined'){alert(calc_error);calc_error=window.undefined;}else{if(typeof price=='object'){$('#CLAIMPRICE').html(price.PriceStr+' '+price.Currency_Alias).removeClass('not-actual').get(0).scrollIntoView(true);$('#CLAIMPRICE_NOTICE').css('display','none');$('#bron').removeAttr('disabled');price=window.undefined;return true;}}
return false;});}});$('input.date').mask(Date.mask);$('input.rus').bind('blur',function(){var val=$.trim($(this).val());if(val.length){var translit_to=$('input.'+$(this).attr('translit_to'),$(this).parent().parent());$(this).val(val.toUpperCase());if(!translit_to.val().length){translit_to.val(val.translit());}}});$('input.translit').bind('blur',function(){var val=$.trim($(this).val());if(val.length){$(this).val(val.translit().toUpperCase());}});$('.firstlname,.lastlname').bind('blur',function(){$(this).val($.trim($(this).val()).translit());});$('select.status').bind('change',function(){if(this.value=='MR'||this.value=='MRS'){var male=(this.value=='MRS')?0:1;$(this).parent().parent().find('input[id^=SEX][@value='+male+']').attr('checked',true);}});$('input[id^=SEX]').bind('click',function(){var currHuman=$(this).parent().parent().parent().parent().find('select.status').val();if((currHuman=='MR'||currHuman=='MRS')){if(this.value==1){$(this).parent().parent().parent().parent().find('select.status option[@value=MR]').attr('selected',true);}else{$(this).parent().parent().parent().parent().find('select.status option[@value=MRS]').attr('selected',true);}}});$('#addinfant_cb').bind('click',function(){$.event.trigger('PriceChanged');var status=(this.checked)?'block':'none';$('#infant_add').css('display',status);if(!this.checked){$.event.trigger('FreightDelPlace');}});$('#ASERVICES input[@value='+$(this).get(0).value+']').bind('click',function(){if(this.checked!=$('.addinfant').get(0).checked){$('input.addinfant_cb').attr('checked',this.checked).triggerHandler('click');}
if(this.checked){$('input.addinfant_cb').attr('checked',true).triggerHandler('click');}});$('#INFANT_FREIGHT_PLACE').bind('click',function(){if(this.checked){$.event.trigger('FreightAddPlace');}else{$.event.trigger('FreightDelPlace');}}).bind('FreightDelPlace',function(){if(this.checked){this.checked=false;}});$('td.fr_peoplecount').livequery('FreightAddPlace',function(){$(this).html(parseInt($(this).attr('samo:PeopleCount'))+1);$.event.trigger('PriceChanged');}).livequery('FreightDelPlace',function(){$(this).html($(this).attr('samo:PeopleCount'));$.event.trigger('PriceChanged');});$('select#visa').bind('change',function(){$.event.trigger('PriceChanged');});$('input[name^=PASSPORT_EXPIRE]').livequery('blur',function(){var given=$('input[name^=PASSPORT_GIVEN_DATE]',$(this).parent().parent());if(!given.val()){var date=Date.fromString($(this).val(),'dd.mm.yyyy');if(date.getFullYear()>1900){date.addYears(-5);given.val(date.asString('dd.mm.yyyy'));}}});$('input[name^=PASSPORT_GIVEN_DATE]').livequery('blur',function(){var expire=$('input[name^=PASSPORT_EXPIRE]',$(this).parent().parent());if(!expire.val()){var date=Date.fromString($(this).val(),'dd.mm.yyyy');if(date.getFullYear()>1900){date.addYears(5);expire.val(date.asString('dd.mm.yyyy'));}}});}
function checkPersonInfo(){var is_ok=true;var patterns={email:/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,url:/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,phone:/^\d+$/}
$('#PERSONINFO input').each(function(){if(is_ok){$(this).removeClass('error');if($(this).val()){try{var name=this.name.replace('person[','').replace(']','');var pattern=$(this).attr('samo:pattern')||patterns[name]||null;if(pattern&&!pattern.test(this.value)){is_ok=false;}}catch(e){}}else{if($(this).is('.required')){is_ok=false;}}
if(!is_ok){$(this).addClass('error');}}});return is_ok;}
function checkServices(){return($('#ASERVICES .error').length===0);}
function error_tourist(message,field){alert(message);$(field).addClass('error').get(0).focus();return false;}
function checkTouristFields(){var checkout=$('#tour_info').attr('samo:checkout');var passport_expire=$('#tour_info').attr('samo:passport_expire');var $tourists=$('.tourists-tabs .tourist');if(!$('#addinfant_cb').attr('checked')){$tourists=$tourists.not($('.infant'));}
$(".tourists-tabs .error").removeClass('error');var is_ok=true;$tourists.each(function(){if(!is_ok)return false;$('.required',$(this)).not('label').each(function(){if(!$(this).val().length){is_ok=error_tourist(samo.LANG.REQUIRED_FIELD_EMPTY,this);return false;}});return is_ok;}).each(function(){if(!is_ok)return false;var pvalid=$('input[name^=PASSPORT_EXPIRE]:first',$(this));if(pvalid){if($(pvalid).is('.required')&&$.controlValue(pvalid.get(0))<=parseInt(passport_expire)){is_ok=error_tourist(samo.LANG.PASSPORT_EXPIRED,pvalid);}}
return is_ok;}).each(function(){if(!is_ok)return false;var human=$('.status',$(this)).val();var bdf=$('input[name^=BIRTHDAY]:first',$(this));var age=Date.fromString(bdf.val()).getAge(Date.fromString(checkout,'yyyymmdd'));if(!checkAge(human,age)){is_ok=error_tourist(samo.LANG.INVALID_HUMAN_STATUS,bdf);}
return is_ok;});return is_ok;}
function getParams(action){var result={},claim=$.getParameter('CLAIM',true),key=$.getParameter('KEY',true);if(claim){result.CLAIM=claim;result.TOWNFROMINC=$.getParameter('TOWNFROMINC',true);result.STATEINC=$.getParameter('STATEINC',true);}else if(key){result.KEY=key;}else{return false;}
result.samo_action=action;result.rev=samo.rev;if(arguments[1]){$.extend(result,arguments[1]);}
return samo.rootURL+$.param(result);}
function collectData(is_bron){var orders={},people={},opeople={},gc=0;var ODELIMETER=(is_bron)?'@@#@@':'|';var TRAILDELIMETER=(is_bron)?'':'|';var add_infant=Number($('#addinfant_cb').attr('checked'))||0;var $tour_info=$('#tour_info'),checkin=$tour_info.attr('samo:checkin'),checkout=$tour_info.attr('samo:checkout'),peoplecount=parseInt($tour_info.attr('samo:peoplecount'));var peoples=peoplecount+add_infant;var inf_id=(peoples-1);var add_inf_inc=$('#addinfant_cb').val();$('#ASERVICES .checklistbox input:checked').each(function(){if(this.value!=add_inf_inc){gc++;orders['S'+this.value+gc]=('S|'+gc+'|'+this.value+'|||'+$(this).attr('samo:dates')+'|'+peoples+'||'+add_infant);for(var x=0;x<peoples;x++){opeople['S'+this.value+x]=(gc+'|'+x+'|'+x);}}});if(add_infant){gc++;orders['S'+add_inf_inc]=('S|'+gc+'|'+add_inf_inc+'|||'+checkin+'|'+checkout+'|1||0');opeople['S'+add_inf_inc]=(gc+'|'+inf_id+'|0');}
$('#HOTELSINFO tbody tr').each(function(){gc++;orders[$(this).attr('samo:key')]=$(this).attr('samo:val').replace('gc',gc)+add_infant;for(var x=0;x<peoples;x++){opeople['H'+$(this).attr('samo:key')+x]=(gc+'|'+x+'|0');}});$('#INSURESINFO tbody tr').each(function(i){gc++;orders[$(this).attr('samo:key')]=$(this).attr('samo:val').replace('gc',gc)+'|'+peoples+'||'+add_infant;for(var x=0;x<peoples;x++){opeople['I'+$(this).attr('samo:key')+x+i]=(gc+'|'+x+'|'+x);}});var $tourists=$(".tourists-tabs .tourist");if(!add_infant){$tourists=$tourists.not($('.ainfant'));}
var insures={};$tourists.each(function(i){$('.ainsure input:checked',$(this)).each(function(){gc++;var inc=$(this).val();if(parseInt(inc)){if(!insures[inc]){insures[inc]={str:'I|'+gc+'|'+inc+'|||'+$(this).attr('samo:dates'),count:1,c:gc};opeople['I'+i+inc]=(gc+'|'+i+'|'+i);}else{opeople['I'+i+inc]=(insures[inc].c+'|'+i+'|'+i);insures[inc].count++;}}});});for(inc in insures){var insure=insures[inc];orders['I'+inc]=insure.str+'|'+insure.count+'||'+add_infant;}
var vises={};$tourists.each(function(i){$('select.visa',$(this)).each(function(){gc++;var inc=$(this).val();if(parseInt(inc)){if(!vises[inc]){vises[inc]={str:'V|'+gc+'|'+inc+'|||'+checkin+'|'+checkout,count:1,c:gc};opeople['V'+i+inc]=(gc+'|'+i+'|'+i);}else{opeople['V'+i+inc]=(vises[inc].c+'|'+i+'|'+i);vises[inc].count++;}}});});for(inc in vises){var visa=vises[inc];orders['V'+inc]=visa.str+'|'+visa.count+'||'+add_infant;}
$('#FREIGHTSINFO tbody tr').each(function(i){gc++;var freight=$('select option:selected',$(this));var dbeg=freight.attr('samo:dbeg');var dend=freight.attr('samo:dend');var adultClass=freight.attr('samo:adult');if(add_infant&&!$('.INFANT_FREIGHT_PLACE').attr('checked')){if(peoplecount==1){orders['F'+freight.val()+i]='F|'+gc+'|'+freight.val()+'|'+freight.attr('samo:adultinf')+'|'+dbeg+'|'+dend+'|1||'+add_infant;opeople['Fai_a'+i]=(gc+'|0|0');opeople['Fai_i'+i]=(gc+'|'+inf_id+'|0');}else{orders['F'+freight.val()+i+'inf']='F|'+gc+'|'+freight.val()+'|'+freight.attr('samo:adultinf')+'|'+dbeg+'|'+dend+'|1||'+add_infant;opeople['Fai_a'+i]=(gc+'|0|0');opeople['Fai_i'+i]=(gc+'|'+inf_id+'|0');gc++;orders['F'+freight.val()+i+'ad']='F|'+gc+'|'+freight.val()+'|'+adultClass+'|'+dbeg+'|'+dend+'|'+(peoplecount-1)+'||'+add_infant;for(var x=1;x<peoplecount;x++){opeople['Fad'+x+i]=(gc+'|'+x+'|'+x);}}}else{orders['F'+freight.val()]='F|'+gc+'|'+freight.val()+'|'+adultClass+'|'+dbeg+'|'+dend+'|'+peoples+'||'+add_infant;for(var l=0;l<peoples;l++){opeople['F'+l+i]=(gc+'|'+l+'|'+l);}}});function valid_date(field,is_bron){var value=$.controlValue(field.get(0));value=parseInt(value);if(!is_bron){return value||'';}else{if(value>20600000||value<19010000){return(field.is('.required'))?error_tourist(samo.LANG.INCORRECT_DATE,field):'';}}
return value;}
var is_ok=true;$tourists.each(function(i){var ppl=[];if(is_ok){ppl.push(i);ppl.push($('[name^=STATUS]',$(this)).val());ppl.push($('[name^=SEX]:checked',$(this)).val());if($('[name^=FIRSTNAME]',$(this)).length){var name=$('[name^=LASTNAME]',$(this)).val()+samo.FIO_DELIMETER+$('[name^=FIRSTNAME]',$(this)).val();name=name.toUpperCase().substr(0,64);ppl.push(name);if($('[name^=FIRSTLNAME]',$(this)).length){name=$('[name^=LASTLNAME]',$(this)).val()+samo.FIO_DELIMETER+$('[name^=FIRSTLNAME]',$(this)).val();ppl.push(name.toUpperCase().substr(0,64));}else{ppl.push(name);}}else{var name=$('[name^=LASTLNAME]',$(this)).val()+samo.FIO_DELIMETER+$('[name^=FIRSTLNAME]',$(this)).val();name=name.toUpperCase().substr(0,64);ppl.push(name);ppl.push(name);}
var date=valid_date($('[name^=BIRTHDAY]',$(this)),is_bron);is_ok=(date!==false);if(is_ok){ppl.push(date);ppl.push($('[name^=HOMELAND]',$(this)).val()||-2147483647);ppl.push($('[name^=PASSPORT_SERIAL]',$(this)).val().substr(0,8));ppl.push($('[name^=PASSPORT_NUMBER]',$(this)).val().substr(0,16));var date=valid_date($('[name^=PASSPORT_EXPIRE]',$(this)),is_bron);is_ok=(false!==date);if(is_ok){ppl.push(date);ppl.push($('[name^=CITIZENSHIP]',$(this)).val()||-2147483647);var date=valid_date($('[name^=PASSPORT_GIVEN_DATE]',$(this)),is_bron);is_ok=(date!==false);if(is_ok){ppl.push(date);ppl.push($('[name^=PASSPORT_GIVEN_ORG]',$(this)).val());var $field=$('[name^=ADDRESS]',$(this));ppl.push($field.length?$field.val().substr(0,128):'');$field=$('[name^=PHONES]',$(this));ppl.push($field.length?$field.val().substr(0,80):'');$field=$('[name^=EMAIL]',$(this));ppl.push($field.length?$field.val().substr(0,64):'');people[i]=ppl.join('|');}}}}});var $return={},o=[],op=[],p=[];for(order in orders){o.push(orders[order]);}
orders=o.join(ODELIMETER)+TRAILDELIMETER;for(oppl in opeople){op.push(opeople[oppl]);}
opeople=op.join(ODELIMETER)+TRAILDELIMETER;for(ppl in people){p.push(people[ppl]);}
people=p.join(ODELIMETER)+TRAILDELIMETER;var person='';if(is_bron){var bayer=[];$('input,select',$('#PERSONINFO')).each(function(){if(this.name.substring(0,6)=='person'){var field=$(this);var value=(this.name=='person[pgiven]')?valid_date(field,is_bron):this.value;if(value!=false){field.removeClass('error');bayer.push(value);}else{field.addClass('error');is_ok=false;}}});person=bayer.join('|');}
if(!is_ok){return false;}
return{orders:orders,opeople:opeople,people:people,add_infant:add_infant,PERSON:person};}
function getFreighsParams(){return getParams('FREIGHTSCLASS')+'&FRCLASS='+$('#freights_class').val();}
function checkFreights(){if($('#freights table tbody tr').length!==$('#freights table tbody select').length){$('#bron').attr('disabled',true);alert(samo.LANG.NO_FREIGHTS);return false;}
return true;}
$('input.date').livequery('blur',function(e){if($(this).val().length){var tmp=Date.fromString($(this).val());if(tmp){var year=tmp.getFullYear();if(year<1901||year>2038){e.preventDefault();var self=$(this);setTimeout(function(){self.addClass('error').select().get(0).focus();},13);return false;}else{$(this).removeClass('error');}
tmp=tmp.asString();}
if(tmp&&tmp!=$(this).val()){$(this).val(tmp);if(typeof $(this).dpSetSelected=='function'){$(this).dpSetSelected(tmp);}}}});}
$(document).ready(samo.bron_info);samo.jQuery=jQuery;})(jQuery);